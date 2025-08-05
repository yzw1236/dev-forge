import type { Metadata } from "next";
import { generateToolMetadata } from "../../lib/seo";
import ColorConverter from "./ColorConverter";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('color', locale);
}

export default function ColorConverterPage() {
  return <ColorConverter />;
}
