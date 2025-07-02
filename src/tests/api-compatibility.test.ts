// API Compatibility tests for plugin-types
// Tests API signature consistency between electron app expectations and plugin registry types

import { PluginAPI, ConfigAPI } from '../api';
import { CompleteConfig } from '../config';
import { PluginRecord, PluginStateRecord } from '../database';
import { PluginRegistryManifest } from '../plugin/PluginRegistry';
import { Permission, VALID_PERMISSIONS } from '../permissions';

// Mock electron app API structure for comparison
interface ElectronAppPluginAPI {
  config: {
    get: <T>(path: string) => T | null;
    getSection: (section: keyof CompleteConfig) => any | null;
    getWithFallback: <T>(path: string, fallback: T) => T;
    isLoaded: () => boolean;
    reload: () => Promise<void>;
  };
}

// API compatibility test functions
function testAPISignatureCompatibility(): { compatible: boolean; errors: string[] } {
  const errors: string[] = [];

  try {
    // Test that ConfigAPI is compatible with electron app expectations
    const mockConfigAPI: ConfigAPI = {
      get: <T>(path: string): T | null => null,
      getSection: (section: keyof CompleteConfig) => null,
      getWithFallback: <T>(path: string, fallback: T): T => fallback,
      isLoaded: (): boolean => true,
      reload: async (): Promise<void> => {}
    };

    // Test that PluginAPI structure matches expectations
    const mockPluginAPI: PluginAPI = {
      config: mockConfigAPI
    };

    // Verify it can be assigned to electron app structure
    const electronAPI: ElectronAppPluginAPI = mockPluginAPI;
    
    console.log('✅ Plugin API signatures are compatible');

  } catch (error) {
    errors.push(`API signature mismatch: ${error}`);
  }

  return {
    compatible: errors.length === 0,
    errors
  };
}

function testPermissionConsistency(): { consistent: boolean; errors: string[] } {
  const errors: string[] = [];

  // Test that all permissions are valid
  const expectedPermissions: Permission[] = [
    'machine.read',
    'machine.write', 
    'machine.control',
    'status.read',
    'files.read',
    'files.write',
    'config.read',
    'config.write',
    'network.access'
  ];

  // Check that VALID_PERMISSIONS contains all expected permissions
  for (const permission of expectedPermissions) {
    if (!VALID_PERMISSIONS.includes(permission)) {
      errors.push(`Missing permission in VALID_PERMISSIONS: ${permission}`);
    }
  }

  // Check for any unexpected permissions
  for (const permission of VALID_PERMISSIONS) {
    if (!expectedPermissions.includes(permission)) {
      errors.push(`Unexpected permission in VALID_PERMISSIONS: ${permission}`);
    }
  }

  return {
    consistent: errors.length === 0,
    errors
  };
}

function testTypeStructureCompatibility(): { compatible: boolean; errors: string[] } {
  const errors: string[] = [];

  try {
    // Test PluginRecord structure
    const mockPluginRecord: PluginRecord = {
      id: "test-plugin",
      pluginId: "test-plugin",
      name: "Test Plugin",
      version: "1.0.0",
      description: "Test plugin description",
      type: "utility",
      source: "registry",
      status: "active",
      installedAt: new Date(),
      updatedAt: new Date(),
      updateAvailable: false
    };

    // Test PluginStateRecord structure
    const mockPluginState: PluginStateRecord = {
      id: "test-state",
      pluginId: "test-plugin",
      enabled: true,
      placement: "dashboard",
      screen: "main",
      priority: 50,
      autoStart: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Test PluginRegistryManifest structure
    const mockManifest: PluginRegistryManifest = {
      id: "test-plugin",
      name: "Test Plugin",
      version: "1.0.0",
      description: "Test plugin for compatibility testing",
      author: "Test Author",
      placement: "dashboard",
      permissions: ["machine.read"]
    };

    console.log('✅ Type structures are compatible');

  } catch (error) {
    errors.push(`Type structure incompatibility: ${error}`);
  }

  return {
    compatible: errors.length === 0,
    errors
  };
}

function testBreakingChanges(): { hasBreakingChanges: boolean; changes: string[] } {
  const changes: string[] = [];

  // Test for potential breaking changes
  // This would typically compare against a previous version or baseline

  // Example checks:
  // 1. Required fields haven't been removed
  const requiredFields = ['id', 'name', 'version', 'description', 'author', 'placement'];
  
  // 2. Permission types haven't been removed
  const criticalPermissions = ['machine.read', 'config.read'];
  for (const permission of criticalPermissions) {
    if (!VALID_PERMISSIONS.includes(permission as Permission)) {
      changes.push(`Critical permission removed: ${permission}`);
    }
  }

  // 3. API methods haven't been removed
  try {
    const mockAPI: PluginAPI = {
      config: {
        get: <T>(path: string): T | null => null,
        getSection: (section: keyof CompleteConfig) => null,
        getWithFallback: <T>(path: string, fallback: T): T => fallback,
        isLoaded: (): boolean => true,
        reload: async (): Promise<void> => {}
      }
    };
    
    if (!mockAPI.config) {
      changes.push('ConfigAPI removed from PluginAPI');
    }
    
    // Test that required config methods exist
    const requiredConfigMethods = ['get', 'getSection', 'getWithFallback', 'isLoaded', 'reload'];
    for (const method of requiredConfigMethods) {
      if (!(method in mockAPI.config)) {
        changes.push(`Required config method removed: ${method}`);
      }
    }
  } catch (error) {
    changes.push(`API structure change: ${error}`);
  }

  return {
    hasBreakingChanges: changes.length > 0,
    changes
  };
}

// Schema validation test
function testSchemaConsistency(): { consistent: boolean; errors: string[] } {
  const errors: string[] = [];

  // Test that types can handle expected data structures
  try {
    // Test minimal valid manifest
    const minimalManifest: PluginRegistryManifest = {
      id: "minimal-test",
      name: "Minimal Test",
      version: "1.0.0", 
      description: "Minimal plugin for testing",
      author: "Test",
      placement: "dashboard"
    };

    // Test full manifest with all optional fields
    const fullManifest: PluginRegistryManifest = {
      id: "full-test",
      name: "Full Test Plugin",
      version: "2.1.0",
      description: "Full featured plugin for comprehensive testing with all optional fields populated",
      author: "Test Team",
      license: "MIT",
      homepage: "https://example.com",
      repository: {
        type: "git",
        url: "https://github.com/test/plugin.git"
      },
      keywords: ["test", "example"],
      category: "utility",
      placement: "standalone",
      screen: "main",
      size: {
        width: 800,
        height: 600
      },
      priority: 10,
      autoStart: true,
      permissions: ["machine.read", "config.read"],
      menuTitle: "Test Plugin",
      menuIcon: "TestOutlined",
      routePath: "/test-plugin",
      compatibility: {
        minAppVersion: "1.0.0",
        maxAppVersion: "2.0.0"
      },
      dependencies: {
        "react": "^18.0.0",
        "antd": "^5.0.0"
      },
      screenshots: [
        "https://example.com/screenshot1.png",
        "https://example.com/screenshot2.png"
      ],
      changelog: "https://example.com/changelog.md"
    };

    console.log('✅ Schema consistency validated');

  } catch (error) {
    errors.push(`Schema consistency error: ${error}`);
  }

  return {
    consistent: errors.length === 0,
    errors
  };
}

// Main test runner
console.log('🧪 Running API Compatibility Tests\n');

let totalTests = 0;
let passedTests = 0;
let totalErrors = 0;

// Test 1: API Signature Compatibility
totalTests++;
console.log('📋 Testing API signature compatibility...');
const apiTest = testAPISignatureCompatibility();
if (apiTest.compatible) {
  console.log('   ✅ API signatures compatible');
  passedTests++;
} else {
  console.log('   ❌ API signature issues:');
  apiTest.errors.forEach(error => {
    console.log(`      - ${error}`);
    totalErrors++;
  });
}

// Test 2: Permission Consistency
totalTests++;
console.log('\n📋 Testing permission consistency...');
const permissionTest = testPermissionConsistency();
if (permissionTest.consistent) {
  console.log('   ✅ Permissions consistent');
  passedTests++;
} else {
  console.log('   ❌ Permission inconsistencies:');
  permissionTest.errors.forEach(error => {
    console.log(`      - ${error}`);
    totalErrors++;
  });
}

// Test 3: Type Structure Compatibility
totalTests++;
console.log('\n📋 Testing type structure compatibility...');
const structureTest = testTypeStructureCompatibility();
if (structureTest.compatible) {
  console.log('   ✅ Type structures compatible');
  passedTests++;
} else {
  console.log('   ❌ Type structure issues:');
  structureTest.errors.forEach(error => {
    console.log(`      - ${error}`);
    totalErrors++;
  });
}

// Test 4: Breaking Changes
totalTests++;
console.log('\n📋 Testing for breaking changes...');
const breakingTest = testBreakingChanges();
if (!breakingTest.hasBreakingChanges) {
  console.log('   ✅ No breaking changes detected');
  passedTests++;
} else {
  console.log('   ⚠️  Breaking changes detected:');
  breakingTest.changes.forEach(change => {
    console.log(`      - ${change}`);
    totalErrors++;
  });
}

// Test 5: Schema Consistency
totalTests++;
console.log('\n📋 Testing schema consistency...');
const schemaTest = testSchemaConsistency();
if (schemaTest.consistent) {
  console.log('   ✅ Schema consistency validated');
  passedTests++;
} else {
  console.log('   ❌ Schema consistency issues:');
  schemaTest.errors.forEach(error => {
    console.log(`      - ${error}`);
    totalErrors++;
  });
}

// Summary
console.log('\n' + '='.repeat(50));
console.log(`📊 API Compatibility Test Results:`);
console.log(`   Total tests: ${totalTests}`);
console.log(`   Passed tests: ${passedTests}`);
console.log(`   Failed tests: ${totalTests - passedTests}`);
console.log(`   Total errors: ${totalErrors}`);

if (passedTests === totalTests) {
  console.log(`\n✅ All API compatibility tests passed!`);
  console.log(`🎉 Plugin types are fully compatible with electron app and registry expectations.`);
  process.exit(0);
} else {
  console.log(`\n❌ Some API compatibility tests failed.`);
  console.log(`🔧 Please review and fix the compatibility issues above.`);
  process.exit(1);
}