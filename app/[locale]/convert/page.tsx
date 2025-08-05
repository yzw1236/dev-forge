import type { Metadata } from "next";
import { generateToolMetadata } from "../../lib/seo";
import DataConverter from "./DataConverter";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('convert', locale);
}

export default function DataConvertToolPage() {
  return <DataConverter />;
}
