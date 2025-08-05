import type { Metadata } from "next";
import { generateToolMetadata } from "../../lib/seo";
import SqlFormatter from "./SqlFormatter";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('sql', locale);
}

export default function SQLFormatterPage() {
  return <SqlFormatter />;
}
