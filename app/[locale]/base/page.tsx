import type { Metadata } from "next";
import { generateToolMetadata } from "../../lib/seo";
import BaseConverter from "./BaseConverter";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('base', locale);
}

export default function BaseConverterPage() {
  return <BaseConverter />;
}
