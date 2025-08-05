import type { Metadata } from "next";
import { generateToolMetadata } from "../../lib/seo";
import UuidGenerator from "./UuidGenerator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('uuid', locale);
}

export default function UUIDGeneratorPage() {
  return <UuidGenerator />;
}
