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

function fixComponentNames(toolName) {
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
  
  // Find the component name that's being used in the JSX
  const jsxMatch = content.match(/return <(\w+) \/>;/);
  if (jsxMatch) {
    const currentComponentName = jsxMatch[1];
    if (currentComponentName !== componentName) {
      content = content.replace(new RegExp(`<${currentComponentName} />`, 'g'), `<${componentName} />`);
      console.log(`Fixed component name for ${toolName}: ${currentComponentName} -> ${componentName}`);
    } else {
      console.log(`Component name already correct for ${toolName}`);
    }
  }
  
  fs.writeFileSync(pageFile, content);
}

// Fix component names for all tools
Object.keys(toolConfigs).forEach(fixComponentNames);

console.log('Component name fixes completed!'); 