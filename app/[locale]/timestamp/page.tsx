import type { Metadata } from "next";
import { generateToolMetadata } from "../../lib/seo";
import TimestampConverter from "./TimestampConverter";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('timestamp', locale);
}

export default function TimestampPagePage() {
  return <TimestampConverter />;
}
