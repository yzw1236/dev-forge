import { NextRequest, NextResponse } from 'next/server'

type ResolverKey = 'google' | 'cloudflare' | 'adguard' | 'alidns'

type ResolverConfig = {
  baseUrl: string
  extraParams?: Record<string, string>
}

const RESOLVERS: Record<ResolverKey, ResolverConfig> = {
  // Native JSON API
  google: { baseUrl: 'https://dns.google/resolve' },
  // Supports JSON via Accept header or ct param
  cloudflare: { baseUrl: 'https://cloudflare-dns.com/dns-query', extraParams: { ct: 'application/dns-json' } },
  // AdGuard JSON endpoint
  adguard: { baseUrl: 'https://dns.adguard-dns.com/resolve' },
  // AliDNS JSON endpoint
  alidns: { baseUrl: 'https://dns.alidns.com/resolve' },
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name')?.trim()
  const type = (searchParams.get('type') || 'A').trim()
  const resolversParam = searchParams.get('resolvers') || 'google,cloudflare,adguard,alidns'

  if (!name) {
    return NextResponse.json({ error: 'Missing parameter: name' }, { status: 400 })
  }

  const resolverKeys = resolversParam
    .split(',')
    .map(r => r.trim().toLowerCase())
    .filter((r): r is ResolverKey => r in RESOLVERS)

  if (resolverKeys.length === 0) {
    return NextResponse.json({ error: 'No valid resolvers specified' }, { status: 400 })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 12_000)

  try {
    const results = Object.fromEntries(
      await Promise.all(
        resolverKeys.map(async (key) => {
          const cfg = RESOLVERS[key]
          const params = new URLSearchParams({ name, type })
          if (cfg.extraParams) {
            for (const [k, v] of Object.entries(cfg.extraParams)) params.set(k, v)
          }
          const url = `${cfg.baseUrl}?${params.toString()}`
          try {
            const res = await fetch(url, {
              headers: { 'accept': 'application/dns-json' },
              signal: controller.signal,
              cache: 'no-store',
            })

            const contentType = (res.headers.get('content-type') || '').toLowerCase()
            // Try to parse as JSON regardless of reported content-type, since many DoH endpoints use 'application/dns-json'
            const bodyText = await res.text()
            try {
              const data = JSON.parse(bodyText)
              return [key, { ok: true, status: data.Status ?? data.StatusCode ?? 0, data }]
            } catch (_) {
              // Not JSON, return snippet
              return [key, { ok: false, error: bodyText?.slice(0, 200) || `Non-JSON response (${contentType})` }]
            }
          } catch (error: any) {
            return [key, { ok: false, error: error?.message || 'Request failed' }]
          }
        })
      )
    )

    return NextResponse.json({ name, type, results }, { status: 200 })
  } finally {
    clearTimeout(timeout)
  }
}


