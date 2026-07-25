const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, '..', 'app');

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove all use client and ToolPageSEO imports to re-add correctly
  const hasUseClient = /['"]use client['"]/.test(content);
  content = content.replace(/['"]use client['"]\s*;?\n?/g, '');
  content = content.replace(/import\s+\{\s*ToolPageSEO\s*\}\s+from\s+["']@\/components\/ToolPageSEO["']\s*;?\n?/g, '');
  
  content = content.trimStart();
  
  if (hasUseClient) {
    content = `"use client"\nimport { ToolPageSEO } from "@/components/ToolPageSEO"\n\n` + content;
  } else {
    // If no use client before, keep as server but still need SEO
    content = `import { ToolPageSEO } from "@/components/ToolPageSEO"\n\n` + content;
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${filePath}`);
}

// Fix all tool pages recursively
function walk(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) walk(full);
    else if (f.name === 'page.tsx') fixFile(full);
  }
}

walk(baseDir);
console.log("DONE - all page.tsx fixed, use client is now at top");