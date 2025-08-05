import type { Metadata } from "next";
import { generateToolMetadata } from "../../lib/seo";
import HttpStatusLookup from "./HttpStatusLookup";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('http-status', locale);
}

export default function HTTPStatusLookupPage() {
  return <HttpStatusLookup />;
}
