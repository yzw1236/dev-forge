import type { Metadata } from "next";
import { generateToolMetadata } from "../../lib/seo";
import CodeBeautifier from "./CodeBeautifier";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('beautifier', locale);
}

export default function CodeBeautifierPage() {
  return <CodeBeautifier />;
}
