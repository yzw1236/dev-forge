#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of tool pages that need i18n updates
const toolPages = [
  'jwt',
  'http-status', 
  'user-agent',
  'color',
  'crontab',
  'url',
  'beautifier',
  'base',
  'convert',
  'sql'
];

// Template for updating tool pages
function updateToolPage(toolName) {
  const filePath = `app/[locale]/${toolName}/page.tsx`;
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add imports if not present
  if (!content.includes("useTranslations")) {
    content = content.replace(
      /"use client";\s*\n/,
      `"use client";\n\nimport { useTranslations } from 'next-intl';\nimport Breadcrumbs from '../../components/Breadcrumbs';\n\n`
    );
  }

  // Add useTranslations hook
  if (!content.includes("const t = useTranslations();")) {
    content = content.replace(
      /export default function (\w+)\(\) {/,
      `export default function $1() {\n  const t = useTranslations();`
    );
  }

  // Add Breadcrumbs component
  if (!content.includes("<Breadcrumbs />")) {
    content = content.replace(
      /<div className="p-4 md:p-8">\s*<div className="max-w-[^"]* mx-auto">/,
      `<div className="p-4 md:p-8">\n      <div className="max-w-4xl mx-auto">\n        <Breadcrumbs />`
    );
  }

  // Update header titles and descriptions
  const titleKey = `tools.${toolName.replace('-', '')}.title`;
  const descKey = `tools.${toolName.replace('-', '')}.description`;
  
  // Replace hardcoded titles with translation keys
  content = content.replace(
    /<h1[^>]*>([^<]+)<\/h1>/g,
    `<h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">\n            {t('${titleKey}')}\n          </h1>`
  );

  // Replace hardcoded descriptions with translation keys
  content = content.replace(
    /<p[^>]*>([^<]+)<\/p>/g,
    `<p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">\n            {t('${descKey}')}\n          </p>`
  );

  // Update common button texts
  content = content.replace(/Generate/g, "{t('common.generate')}");
  content = content.replace(/Clear/g, "{t('common.clear')}");
  content = content.replace(/Copy/g, "{t('common.copy')}");
  content = content.replace(/Convert/g, "{t('common.convert')}");
  content = content.replace(/Calculate/g, "{t('common.calculate')}");
  content = content.replace(/Format/g, "{t('common.format')}");
  content = content.replace(/Input/g, "{t('common.input')}");
  content = content.replace(/Output/g, "{t('common.output')}");

  // Update error messages
  content = content.replace(/Invalid input/g, "{t('errors.invalidInput')}");
  content = content.replace(/Something went wrong/g, "{t('errors.somethingWentWrong')}");

  // Add mt-4 to header if not present
  if (!content.includes("mt-4")) {
    content = content.replace(
      /<header className="text-center mb-8/,
      `<header className="text-center mb-8 mt-4`
    );
  }

  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated: ${filePath}`);
}

// Update all tool pages
console.log('🔄 Updating tool pages with i18n support...\n');

toolPages.forEach(toolName => {
  updateToolPage(toolName);
});

console.log('\n✅ All tool pages updated with i18n support!');
console.log('\n📝 Next steps:');
console.log('1. Add missing translation keys to messages/en.json and messages/zh.json');
console.log('2. Test the updated pages');
console.log('3. Customize any specific translations as needed');
