const fs = require('fs');
const path = require('path');

const toolConfigs = {
  timestamp: 'TimestampConverter',
  crontab: 'CrontabTool',
  hash: 'HashCalculator',
  jwt: 'JwtDecoder',
  uuid: 'UuidGenerator',
  password: 'PasswordGenerator',
  url: 'UrlTool',
  beautifier: 'CodeBeautifier',
  color: 'ColorConverter',
  sql: 'SqlFormatter',
  image2base64: 'ImageToBase64',
  convert: 'DataConverter',
  'http-status': 'HttpStatusLookup',
  'user-agent': 'UserAgentParser'
};

function fixImports(toolName) {
  const componentName = toolConfigs[toolName];
  if (!componentName) {
    console.log(`No config found for ${toolName}, skipping...`);
    return;
  }

  const pageFile = path.join(__dirname, '../app/[locale]', toolName, 'page.tsx');
  
  if (!fs.existsSync(pageFile)) {
    console.log(`Page file not found for ${toolName}, skipping...`);
    return;
  }

  let content = fs.readFileSync(pageFile, 'utf8');
  
  // Remove any misplaced imports
  content = content.replace(/import .* from "\.\/.*";\s*\n/g, '');
  
  // Add import at the top after existing imports
  const importLine = `import ${componentName} from "./${componentName}";`;
  const lines = content.split('\n');
  
  // Find the line after the last import
  let insertIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import')) {
      insertIndex = i + 1;
    }
  }
  
  lines.splice(insertIndex, 0, importLine);
  content = lines.join('\n');
  
  fs.writeFileSync(pageFile, content);
  console.log(`Fixed imports for ${toolName}`);
}

// Fix imports for all tools
Object.keys(toolConfigs).forEach(fixImports);

console.log('Import fixes completed!'); 