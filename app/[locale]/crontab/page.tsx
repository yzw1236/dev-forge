import type { Metadata } from "next";
import { generateToolMetadata } from "../../lib/seo";
import CrontabTool from "./CrontabTool";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('crontab', locale);
}

export default function CrontabToolPage() {
  return <CrontabTool />;
}
