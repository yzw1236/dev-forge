import type { Metadata } from "next";
import { generateToolMetadata } from "../../lib/seo";
import ImageToBase64 from "./ImageToBase64";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('image2base64', locale);
}

export default function ImageToBase64Page() {
  return <ImageToBase64 />;
}
