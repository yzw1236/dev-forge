import type { Metadata } from "next";
import Base64Tool from "./Base64Tool";
import { generateToolMetadata } from "../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('base64', locale);
}

export default function Base64Page() {
  return <Base64Tool />;
} 