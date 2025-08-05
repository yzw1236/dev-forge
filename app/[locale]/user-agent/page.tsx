import type { Metadata } from "next";
import { generateToolMetadata } from "../../lib/seo";
import UserAgentParser from "./UserAgentParser";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('user-agent', locale);
}

export default function UserAgentParserPage() {
  return <UserAgentParser />;
}
