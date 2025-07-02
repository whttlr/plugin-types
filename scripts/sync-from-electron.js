#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ELECTRON_APP_PATH = process.env.ELECTRON_APP_PATH || '../electron-app';
const SCRIPT_DIR = __dirname;
const SRC_DIR = path.join(SCRIPT_DIR, '..', 'src');

const SOURCE_MAPPINGS = {
  // Map target directories to source directories/files in electron app
  'config/': 'src/services/config/types/',
  'database/index.ts': 'src/services/database/types.ts',
};

function syncTypes() {
  console.log('🔄 Syncing types from electron app...');
  console.log(`📂 Electron app path: ${ELECTRON_APP_PATH}`);
  
  // Check if electron app exists
  if (!fs.existsSync(ELECTRON_APP_PATH)) {
    console.error(`❌ Electron app not found at: ${ELECTRON_APP_PATH}`);
    console.log('💡 Set ELECTRON_APP_PATH environment variable or ensure ../electron-app exists');
    process.exit(1);
  }

  let syncedFiles = 0;
  let errors = 0;

  for (const [target, source] of Object.entries(SOURCE_MAPPINGS)) {
    const sourcePath = path.join(ELECTRON_APP_PATH, source);
    const targetPath = path.join(SRC_DIR, target);
    
    console.log(`\n📋 Processing: ${target}`);
    console.log(`   Source: ${sourcePath}`);
    console.log(`   Target: ${targetPath}`);
    
    if (!fs.existsSync(sourcePath)) {
      console.log(`   ⚠️  Source not found, skipping`);
      continue;
    }

    try {
      if (fs.statSync(sourcePath).isDirectory()) {
        syncDirectory(sourcePath, targetPath);
      } else {
        syncFile(sourcePath, targetPath);
      }
      syncedFiles++;
    } catch (error) {
      console.error(`   ❌ Error syncing: ${error.message}`);
      errors++;
    }
  }
  
  console.log(`\n✅ Sync complete!`);
  console.log(`📊 Files synced: ${syncedFiles}`);
  console.log(`❌ Errors: ${errors}`);
  
  if (errors > 0) {
    process.exit(1);
  }
}

function syncDirectory(sourceDir, targetDir) {
  console.log(`   📁 Syncing directory...`);
  
  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Read source directory
  const files = fs.readdirSync(sourceDir);
  
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      syncDirectory(sourcePath, targetPath);
    } else if (file.endsWith('.ts') && !file.endsWith('.test.ts')) {
      syncTypeScriptFile(sourcePath, targetPath);
    }
  }
}

function syncFile(sourcePath, targetPath) {
  console.log(`   📄 Syncing file...`);
  
  // Ensure target directory exists
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  if (sourcePath.endsWith('.ts')) {
    syncTypeScriptFile(sourcePath, targetPath);
  } else {
    // Copy file as-is
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`   ✅ Copied: ${path.basename(targetPath)}`);
  }
}

function syncTypeScriptFile(sourcePath, targetPath) {
  try {
    const content = fs.readFileSync(sourcePath, 'utf8');
    const transformedContent = transformTypeScriptContent(content, sourcePath);
    
    fs.writeFileSync(targetPath, transformedContent);
    console.log(`   ✅ Synced: ${path.basename(targetPath)}`);
  } catch (error) {
    console.error(`   ❌ Failed to sync ${sourcePath}: ${error.message}`);
    throw error;
  }
}

function transformTypeScriptContent(content, sourcePath) {
  let transformed = content;

  // These files are already type definitions, so we mostly preserve them as-is
  // Just fix import paths and add header
  
  // Fix import paths to be relative to the package structure
  transformed = transformed.replace(/from ['"]\.\.?\/[^'"]*['"]/g, (match) => {
    // Transform relative imports to package-relative imports
    const importPath = match.match(/from ['"](.*)['"]/)[1];
    
    // If it's a relative import within the same types directory, keep it relative
    if (importPath.startsWith('./')) {
      return match; // Keep as-is
    }
    
    // If it's going up a level, convert to local import
    if (importPath.startsWith('../')) {
      // Remove ../ and convert to local import
      const localPath = importPath.replace(/^\.\.\//, './');
      return match.replace(importPath, localPath);
    }
    
    return match;
  });

  // Add header comment
  const fileName = path.basename(sourcePath);
  const header = `// This file is auto-generated from ${fileName}\n// Do not edit manually - changes will be overwritten\n\n`;
  
  return header + transformed;
}

// Handle command line execution
if (require.main === module) {
  syncTypes();
}

module.exports = { syncTypes };