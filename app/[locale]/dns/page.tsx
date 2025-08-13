"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import Breadcrumbs from '../../components/Breadcrumbs';

type ResolverKey = 'google' | 'cloudflare' | 'adguard' | 'alidns'

interface DnsAnswer {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

interface ResolverResultOk {
  ok: true;
  status?: number;
  data?: {
    Answer?: DnsAnswer[];
    Authority?: DnsAnswer[];
    Additional?: DnsAnswer[];
    Question?: Array<{ name: string; type: number }>
  };
}

interface ResolverResultErr {
  ok: false;
  error: string;
}

type ResolverResult = ResolverResultOk | ResolverResultErr

const RESOLVER_DISPLAY: Record<ResolverKey, string> = {
  google: 'Google',
  cloudflare: 'Cloudflare',
  adguard: 'AdGuard',
  alidns: 'AliDNS',
}

const RECORD_TYPES = ['A','AAAA','CNAME','MX','TXT','NS','SOA','PTR'] as const

export default function DnsResolverPage() {
  const t = useTranslations();
  const [domain, setDomain] = useState("")
  const [recordType, setRecordType] = useState<typeof RECORD_TYPES[number]>("A")
  const [selectedResolvers, setSelectedResolvers] = useState<ResolverKey[]>(['google','cloudflare','adguard','alidns'])
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<Record<ResolverKey, ResolverResult> | null>(null)

  function toggleResolver(key: ResolverKey) {
    setSelectedResolvers(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
  }

  async function handleResolve() {
    if (!domain.trim()) return
    setIsLoading(true)
    setResults(null)
    try {
      const params = new URLSearchParams({ name: domain.trim(), type: recordType, resolvers: selectedResolvers.join(',') })
      const res = await fetch(`/api/dns?${params.toString()}`, { cache: 'no-store' })
      const data = await res.json()
      setResults(data.results || null)
    } catch (e: any) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  function handleClear() {
    setDomain("")
    setResults(null)
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs />

        <header className="text-center mb-6 md:mb-8 mt-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
            {t('tools.dnsResolver.title')}
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
            {t('tools.dnsResolver.description')}
          </p>
        </header>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('tools.dnsResolver.fields.domain')}
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                spellCheck={false}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('tools.dnsResolver.fields.recordType')}
              </label>
              <select
                value={recordType}
                onChange={(e) => setRecordType(e.target.value as any)}
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
              >
                {RECORD_TYPES.map(rt => (
                  <option key={rt} value={rt}>{rt}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={handleResolve}
                disabled={isLoading || !domain.trim() || selectedResolvers.length === 0}
                className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 disabled:opacity-50 text-white font-medium rounded-lg px-4 py-2 md:px-6 md:py-3 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm md:text-base"
              >
                {isLoading ? t('common.loading') : t('common.resolve')}
              </button>
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-all duration-200 text-sm"
              >
                {t('common.clear')}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t('tools.dnsResolver.fields.resolvers')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {(Object.keys(RESOLVER_DISPLAY) as ResolverKey[]).map(key => (
                <label key={key} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedResolvers.includes(key)}
                    onChange={() => toggleResolver(key)}
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{RESOLVER_DISPLAY[key]}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {results && (
          <section aria-labelledby="dns-results-heading">
            <h2 id="dns-results-heading" className="sr-only">{t('tools.dnsResolver.results')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.keys(results) as ResolverKey[]).map((key) => {
                const r = results[key]
                return (
                  <div key={key} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-base font-semibold text-slate-800 dark:text-slate-200">{RESOLVER_DISPLAY[key]}</div>
                      {'ok' in r && r.ok ? (
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium">
                          {t('tools.dnsResolver.status')}: {r.status ?? 0}
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-medium">
                          {t('errors.networkError')}
                        </span>
                      )}
                    </div>
                    {'ok' in r && r.ok ? (
                      <div className="space-y-3">
                        <ResultTable title="Answer" answers={r.data?.Answer} emptyText={t('tools.dnsResolver.noAnswer')} />
                        {r.data?.Authority && <ResultTable title="Authority" answers={r.data?.Authority} emptyText={t('tools.dnsResolver.noAnswer')} />}
                        {r.data?.Additional && <ResultTable title="Additional" answers={r.data?.Additional} emptyText={t('tools.dnsResolver.noAnswer')} />}
                      </div>
                    ) : (
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {(r as ResolverResultErr).error}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

function ResultTable({ title, answers, emptyText }: { title: string; answers?: DnsAnswer[]; emptyText: string }) {
  return (
    <div>
      <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{title}</div>
      {answers && answers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="text-left px-3 py-2 border-b border-slate-200 dark:border-slate-700">Name</th>
                <th className="text-left px-3 py-2 border-b border-slate-200 dark:border-slate-700">Type</th>
                <th className="text-left px-3 py-2 border-b border-slate-200 dark:border-slate-700">TTL</th>
                <th className="text-left px-3 py-2 border-b border-slate-200 dark:border-slate-700">Data</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((a, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800">
                  <td className="px-3 py-2 align-top whitespace-nowrap">{a.name}</td>
                  <td className="px-3 py-2 align-top">{a.type}</td>
                  <td className="px-3 py-2 align-top">{a.TTL}</td>
                  <td className="px-3 py-2 align-top break-all">{a.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-sm text-slate-500 dark:text-slate-400">{emptyText}</div>
      )}
    </div>
  )
}


