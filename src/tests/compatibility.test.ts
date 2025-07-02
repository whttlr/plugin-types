// Compatibility tests for plugin-types
// Tests existing plugin manifests against shared type definitions

import {
  PluginRegistryManifest,
  VALID_PLUGIN_CATEGORIES,
  VALID_PLUGIN_PLACEMENTS,
  VALID_PLUGIN_SCREENS,
  PLUGIN_ID_PATTERN,
  VERSION_PATTERN,
  URL_PATTERN,
  ROUTE_PATH_PATTERN
} from '../plugin/PluginRegistry';
import { VALID_PERMISSIONS } from '../permissions';

// Test data from actual plugin manifests in the registry
const existingPlugins = [
  {
    "id": "quick-settings",
    "name": "Quick Settings",
    "version": "1.0.0",
    "description": "Quick Settings plugin for CNC Controls application",
    "author": "Your Name",
    "license": "MIT",
    "keywords": ["modal", "cnc", "control"],
    "category": "utility",
    "placement": "modal",
    "screen": "main",
    "priority": 50,
    "autoStart": false,
    "permissions": ["machine.read"],
    "compatibility": {
      "minAppVersion": "1.0.0",
      "maxAppVersion": "2.0.0"
    },
    "dependencies": {
      "react": "^18.0.0",
      "antd": "^5.0.0"
    },
    "size": {
      "width": "auto",
      "height": "auto"
    }
  },
  {
    "id": "gcode-snippets",
    "name": "G-Code Snippets",
    "version": "1.1.0",
    "description": "Quick access to common G-code commands and snippets with customizable library and one-click insertion",
    "author": "CNC Controls Team",
    "license": "MIT",
    "homepage": "https://github.com/whttlr/gcode-snippets-plugin",
    "repository": {
      "type": "git",
      "url": "https://github.com/whttlr/gcode-snippets-plugin.git"
    },
    "keywords": ["gcode", "snippets", "productivity", "commands"],
    "category": "utility",
    "placement": "standalone",
    "screen": "new",
    "menuTitle": "G-Code Snippets",
    "menuIcon": "CodeOutlined",
    "routePath": "/gcode-snippets",
    "size": {
      "width": "auto",
      "height": "auto"
    },
    "priority": 10,
    "autoStart": false,
    "permissions": ["files.read", "files.write", "machine.write"],
    "compatibility": {
      "minAppVersion": "1.0.0",
      "maxAppVersion": "2.0.0"
    },
    "dependencies": {
      "react": "^18.0.0",
      "antd": "^5.0.0",
      "monaco-editor": "^0.43.0"
    },
    "screenshots": [
      "https://raw.githubusercontent.com/whttlr/gcode-snippets-plugin/main/screenshots/main-view.png",
      "https://raw.githubusercontent.com/whttlr/gcode-snippets-plugin/main/screenshots/editor.png"
    ],
    "changelog": "https://raw.githubusercontent.com/whttlr/gcode-snippets-plugin/main/CHANGELOG.md"
  },
  {
    "id": "machine-monitor",
    "name": "Machine Monitor",
    "version": "1.0.0",
    "description": "Real-time machine status monitoring with comprehensive dashboard displaying position, speed, and connectivity status",
    "author": "CNC Controls Team",
    "license": "MIT",
    "homepage": "https://github.com/whttlr/machine-monitor-plugin",
    "repository": {
      "type": "git",
      "url": "https://github.com/whttlr/machine-monitor-plugin.git"
    },
    "keywords": ["monitoring", "dashboard", "real-time", "status"],
    "category": "monitoring",
    "placement": "dashboard",
    "screen": "main",
    "size": {
      "width": 400,
      "height": 300
    },
    "priority": 1,
    "autoStart": true,
    "permissions": ["machine.read", "status.read"],
    "compatibility": {
      "minAppVersion": "1.0.0",
      "maxAppVersion": "2.0.0"
    },
    "dependencies": {
      "react": "^18.0.0",
      "antd": "^5.0.0"
    },
    "screenshots": [
      "https://raw.githubusercontent.com/whttlr/machine-monitor-plugin/main/screenshots/dashboard.png"
    ],
    "changelog": "https://raw.githubusercontent.com/whttlr/machine-monitor-plugin/main/CHANGELOG.md"
  },
  {
    "id": "tool-library",
    "name": "Tool Library",
    "version": "1.0.0",
    "description": "Comprehensive tool management system for organizing CNC tool collection with specifications, usage tracking, and maintenance schedules",
    "author": "CNC Controls Team",
    "license": "MIT",
    "homepage": "https://github.com/whttlr/tool-library-plugin",
    "repository": {
      "type": "git",
      "url": "https://github.com/whttlr/tool-library-plugin.git"
    },
    "keywords": ["tools", "library", "organization", "management", "inventory"],
    "category": "management",
    "placement": "standalone",
    "screen": "new",
    "menuTitle": "Tool Library",
    "menuIcon": "ToolOutlined",
    "routePath": "/tool-library",
    "size": {
      "width": "auto",
      "height": "auto"
    },
    "priority": 20,
    "autoStart": false,
    "permissions": ["config.read", "config.write", "files.read", "files.write"],
    "compatibility": {
      "minAppVersion": "1.0.0",
      "maxAppVersion": "2.0.0"
    },
    "dependencies": {
      "react": "^18.0.0",
      "antd": "^5.0.0",
      "lodash": "^4.17.21"
    },
    "screenshots": [
      "https://raw.githubusercontent.com/whttlr/tool-library-plugin/main/screenshots/library-view.png",
      "https://raw.githubusercontent.com/whttlr/tool-library-plugin/main/screenshots/tool-details.png"
    ],
    "changelog": "https://raw.githubusercontent.com/whttlr/tool-library-plugin/main/CHANGELOG.md"
  }
];

// Type validation functions
function validatePluginManifest(plugin: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  const requiredFields = ['id', 'name', 'version', 'description', 'author', 'placement'];
  for (const field of requiredFields) {
    if (!plugin[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate ID format
  if (plugin.id && !PLUGIN_ID_PATTERN.test(plugin.id)) {
    errors.push(`Invalid ID format: ${plugin.id} (must be lowercase, numbers, hyphens only)`);
  }

  // Validate version format
  if (plugin.version && !VERSION_PATTERN.test(plugin.version)) {
    errors.push(`Invalid version format: ${plugin.version} (must be semantic version)`);
  }

  // Validate category
  if (plugin.category && !VALID_PLUGIN_CATEGORIES.includes(plugin.category)) {
    errors.push(`Invalid category: ${plugin.category}`);
  }

  // Validate placement
  if (plugin.placement && !VALID_PLUGIN_PLACEMENTS.includes(plugin.placement)) {
    errors.push(`Invalid placement: ${plugin.placement}`);
  }

  // Validate screen
  if (plugin.screen && !VALID_PLUGIN_SCREENS.includes(plugin.screen)) {
    errors.push(`Invalid screen: ${plugin.screen}`);
  }

  // Validate permissions
  if (plugin.permissions && Array.isArray(plugin.permissions)) {
    for (const permission of plugin.permissions) {
      if (!VALID_PERMISSIONS.includes(permission)) {
        errors.push(`Invalid permission: ${permission}`);
      }
    }
  }

  // Validate URLs
  if (plugin.homepage && !URL_PATTERN.test(plugin.homepage)) {
    errors.push(`Invalid homepage URL: ${plugin.homepage}`);
  }

  if (plugin.repository?.url && !URL_PATTERN.test(plugin.repository.url)) {
    errors.push(`Invalid repository URL: ${plugin.repository.url}`);
  }

  if (plugin.screenshots && Array.isArray(plugin.screenshots)) {
    for (const screenshot of plugin.screenshots) {
      if (!URL_PATTERN.test(screenshot)) {
        errors.push(`Invalid screenshot URL: ${screenshot}`);
      }
    }
  }

  if (plugin.changelog && !URL_PATTERN.test(plugin.changelog)) {
    errors.push(`Invalid changelog URL: ${plugin.changelog}`);
  }

  // Validate route path
  if (plugin.routePath && !ROUTE_PATH_PATTERN.test(plugin.routePath)) {
    errors.push(`Invalid route path: ${plugin.routePath}`);
  }

  // Type compatibility check (TypeScript compile-time validation)
  try {
    const typedPlugin: PluginRegistryManifest = plugin as PluginRegistryManifest;
    // If this compiles without error, the structure is compatible
  } catch (error) {
    errors.push(`Type compatibility error: ${error}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Test suite
console.log('🧪 Testing Plugin Compatibility with Shared Types\n');

let totalPlugins = 0;
let validPlugins = 0;
let totalErrors = 0;

for (const plugin of existingPlugins) {
  totalPlugins++;
  console.log(`📋 Testing plugin: ${plugin.id}`);
  
  const result = validatePluginManifest(plugin);
  
  if (result.valid) {
    console.log(`   ✅ Compatible with shared types`);
    validPlugins++;
  } else {
    console.log(`   ❌ Compatibility issues found:`);
    for (const error of result.errors) {
      console.log(`      - ${error}`);
      totalErrors++;
    }
  }
  console.log('');
}

// Summary
console.log('='.repeat(50));
console.log(`📊 Compatibility Test Results:`);
console.log(`   Total plugins tested: ${totalPlugins}`);
console.log(`   Compatible plugins: ${validPlugins}`);
console.log(`   Incompatible plugins: ${totalPlugins - validPlugins}`);
console.log(`   Total errors found: ${totalErrors}`);

if (validPlugins === totalPlugins) {
  console.log(`\n✅ All existing plugins are compatible with shared types!`);
  process.exit(0);
} else {
  console.log(`\n❌ Some plugins have compatibility issues that need to be addressed.`);
  process.exit(1);
}