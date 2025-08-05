import type { Metadata } from "next";
import { generateToolMetadata } from "../../lib/seo";
import HashCalculator from "./HashCalculator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('hash', locale);
}

export default function HashCalculatorPage() {
  return <HashCalculator />;
}
