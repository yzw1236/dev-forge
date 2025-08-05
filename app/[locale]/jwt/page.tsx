import type { Metadata } from "next";
import { generateToolMetadata } from "../../lib/seo";
import JwtDecoder from "./JwtDecoder";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('jwt', locale);
}

export default function JWTDecoderPage() {
  return <JwtDecoder />;
}
