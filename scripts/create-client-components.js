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
  'sql',
  'image2base64',
  'convert',
  'http-status',
  'user-agent'
];

const componentTemplate = `"use client";

import { useState } from "react";

export default function TOOL_COMPONENT() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TOOL_TITLE
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
            TOOL_DESCRIPTION
          </p>
        </header>
        
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 md:p-8">
          <div className="text-center text-slate-500 dark:text-slate-400">
            <p>Tool implementation coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

const toolConfigs = {
  timestamp: {
    component: 'TimestampConverter',
    title: 'Timestamp Converter',
    description: 'Convert between Unix timestamps and human-readable dates'
  },
  crontab: {
    component: 'CrontabTool',
    title: 'Crontab Tool',
    description: 'Generate, validate, and understand cron expressions'
  },
  hash: {
    component: 'HashCalculator',
    title: 'Hash Calculator',
    description: 'Generate MD5, SHA1, SHA256, SHA512 hashes'
  },
  jwt: {
    component: 'JwtDecoder',
    title: 'JWT Decoder',
    description: 'Decode and verify JSON Web Tokens'
  },
  uuid: {
    component: 'UuidGenerator',
    title: 'UUID Generator',
    description: 'Generate random UUIDs for your projects'
  },
  password: {
    component: 'PasswordGenerator',
    title: 'Password Generator',
    description: 'Create strong, secure passwords'
  },
  url: {
    component: 'UrlTool',
    title: 'URL Tool',
    description: 'Encode and decode URLs'
  },
  beautifier: {
    component: 'CodeBeautifier',
    title: 'Code Beautifier',
    description: 'Format and beautify code'
  },
  color: {
    component: 'ColorConverter',
    title: 'Color Converter',
    description: 'Convert between color formats'
  },
  sql: {
    component: 'SqlFormatter',
    title: 'SQL Formatter',
    description: 'Format and beautify SQL queries'
  },
  image2base64: {
    component: 'ImageToBase64',
    title: 'Image to Base64',
    description: 'Convert images to Base64 strings'
  },
  convert: {
    component: 'DataConverter',
    title: 'Data Converter',
    description: 'Convert between data formats'
  },
  'http-status': {
    component: 'HttpStatusLookup',
    title: 'HTTP Status Lookup',
    description: 'Find HTTP status code information'
  },
  'user-agent': {
    component: 'UserAgentParser',
    title: 'User-Agent Parser',
    description: 'Parse and analyze User-Agent strings'
  }
};

function createComponent(toolName) {
  const config = toolConfigs[toolName];
  if (!config) {
    console.log(`No config found for ${toolName}, skipping...`);
    return;
  }

  const toolDir = path.join(__dirname, '../app/[locale]', toolName);
  const componentFile = path.join(toolDir, `${config.component}.tsx`);
  
  if (fs.existsSync(componentFile)) {
    console.log(`Component already exists for ${toolName}, skipping...`);
    return;
  }

  const content = componentTemplate
    .replace(/TOOL_COMPONENT/g, config.component)
    .replace(/TOOL_TITLE/g, config.title)
    .replace(/TOOL_DESCRIPTION/g, config.description);

  fs.writeFileSync(componentFile, content);
  console.log(`Created component for ${toolName}`);
}

// Create components for all tools
tools.forEach(createComponent);

console.log('Client components creation completed!'); 