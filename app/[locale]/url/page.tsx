import type { Metadata } from "next";
import { generateToolMetadata } from "../../lib/seo";
import UrlTool from "./UrlTool";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('url', locale);
}

export default function URLToolPage() {
  return <UrlTool />;
}
