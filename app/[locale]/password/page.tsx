import type { Metadata } from "next";
import { generateToolMetadata } from "../../lib/seo";
import PasswordGenerator from "./PasswordGenerator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('password', locale);
}

export default function PasswordGeneratorPage() {
  return <PasswordGenerator />;
}
