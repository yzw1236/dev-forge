const fs = require('fs');
const path = require('path');

const tools = [
  'timestamp',
  'crontab',
  'hash',
  'jwt',
  'uuid',
  'password',
  'url',
  'beautifier',
  'color',
  'base',
  'sql',
  'image2base64',
  'convert',
  'http-status',
  'user-agent'
];

const template = `import type { Metadata } from "next";
import { generateToolMetadata } from "../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateToolMetadata('TOOL_NAME', locale);
}

export default function TOOL_PAGE() {
  return <TOOL_COMPONENT />;
}
`;

function addSEOToTool(toolName) {
  const toolDir = path.join(__dirname, '../app/[locale]', toolName);
  const pageFile = path.join(toolDir, 'page.tsx');
  
  if (!fs.existsSync(pageFile)) {
    console.log(`Page file not found for ${toolName}, skipping...`);
    return;
  }

  // Read the current page content
  let content = fs.readFileSync(pageFile, 'utf8');
  
  // Check if SEO is already added
  if (content.includes('generateToolMetadata')) {
    console.log(`SEO already added to ${toolName}, skipping...`);
    return;
  }

  // Extract the component name from the current file
  const componentMatch = content.match(/export default function (\w+)/);
  if (!componentMatch) {
    console.log(`Could not find component name in ${toolName}, skipping...`);
    return;
  }
  
  const componentName = componentMatch[1];
  
  // Create the new page content
  const newContent = template
    .replace(/TOOL_NAME/g, toolName)
    .replace(/TOOL_PAGE/g, `${componentName}Page`)
    .replace(/TOOL_COMPONENT/g, componentName);

  // Write the new content
  fs.writeFileSync(pageFile, newContent);
  console.log(`Added SEO to ${toolName}`);
}

// Add SEO to all tools
tools.forEach(addSEOToTool);

console.log('SEO setup completed!'); 