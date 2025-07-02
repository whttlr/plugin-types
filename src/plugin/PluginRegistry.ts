// Plugin Registry Types
// Type definitions for plugin registry entries and manifest structure
// Corresponds to the JSON schemas in the plugin-registry

import { Permission } from '../permissions';

// Enums and union types
export type PluginCategory = 'monitoring' | 'control' | 'visualization' | 'utility' | 'automation' | 'management';
export type PluginPlacement = 'dashboard' | 'standalone' | 'modal' | 'sidebar';
export type PluginScreen = 'main' | 'controls' | 'settings' | 'new';
export type RepositoryType = 'git' | 'svn' | 'hg';

// Plugin Manifest (matches plugin-schema.json)
export interface PluginRegistryManifest {
  /** Unique plugin identifier (lowercase, numbers, hyphens only) */
  id: string;

  /** Human-readable plugin name */
  name: string;

  /** Semantic version (major.minor.patch) */
  version: string;

  /** Brief description of plugin functionality */
  description: string;

  /** Plugin author or organization */
  author: string;

  /** Software license identifier */
  license?: string;

  /** Plugin homepage URL */
  homepage?: string;

  /** Repository information */
  repository?: {
    type: RepositoryType;
    url: string;
  };

  /** Search keywords for the plugin */
  keywords?: string[];

  /** Primary plugin category */
  category?: PluginCategory;

  /** Where the plugin will be displayed in the UI */
  placement: PluginPlacement;

  /** Which screen the plugin appears on */
  screen?: PluginScreen;

  /** Plugin size configuration */
  size?: {
    width?: number | 'auto';
    height?: number | 'auto';
  };

  /** Display priority (1 = highest) */
  priority?: number;

  /** Whether plugin starts automatically */
  autoStart?: boolean;

  /** Required permissions for plugin operation */
  permissions?: Permission[];

  /** Menu title for standalone plugins */
  menuTitle?: string;

  /** Icon name for menu (Ant Design icons) */
  menuIcon?: string;

  /** Custom route path for standalone plugins */
  routePath?: string;

  /** Application version compatibility */
  compatibility?: {
    minAppVersion: string;
    maxAppVersion?: string;
  };

  /** NPM-style dependency declarations */
  dependencies?: Record<string, string>;

  /** Screenshot URLs for plugin gallery */
  screenshots?: string[];

  /** URL to changelog document */
  changelog?: string;
}

// Plugin Registry Entry (matches registry-schema.json plugins array items)
export interface PluginRegistryEntry {
  /** Unique plugin identifier */
  id: string;

  /** Plugin display name */
  name: string;

  /** Brief plugin description */
  description: string;

  /** Plugin author */
  author: string;

  /** Current plugin version */
  version: string;

  /** Direct download URL for plugin package */
  downloadUrl: string;

  /** URL to plugin manifest file */
  manifestUrl: string;

  /** Plugin category */
  category: PluginCategory;

  /** Search tags */
  tags?: string[];

  /** Minimum required application version */
  minAppVersion?: string;

  /** Maximum supported application version */
  maxAppVersion?: string;

  /** Last update timestamp (ISO 8601 format) */
  lastUpdated?: string;

  /** Download count */
  downloads?: number;

  /** Average user rating */
  rating?: number;

  /** Whether plugin is featured */
  featured?: boolean;
}

// Plugin Registry Structure (matches registry-schema.json)
export interface PluginRegistry {
  /** Registry schema version */
  version: string;

  /** List of available plugins */
  plugins: PluginRegistryEntry[];

  /** Available plugin categories */
  categories: PluginCategory[];

  /** Registry last update timestamp (ISO 8601 format) */
  lastUpdated?: string;

  /** Registry statistics */
  metadata?: {
    totalPlugins?: number;
    totalDownloads?: number;
    activePlugins?: number;
  };
}

// Validation utilities and constants
export const VALID_PLUGIN_CATEGORIES: PluginCategory[] = [
  'monitoring', 'control', 'visualization', 'utility', 'automation', 'management'
];

export const VALID_PLUGIN_PLACEMENTS: PluginPlacement[] = [
  'dashboard', 'standalone', 'modal', 'sidebar'
];

export const VALID_PLUGIN_SCREENS: PluginScreen[] = [
  'main', 'controls', 'settings', 'new'
];

export const VALID_REPOSITORY_TYPES: RepositoryType[] = [
  'git', 'svn', 'hg'
];

// Plugin ID validation pattern
export const PLUGIN_ID_PATTERN = /^[a-z0-9-]+$/;

// Version validation pattern (semantic versioning)
export const VERSION_PATTERN = /^\d+\.\d+\.\d+$/;

// URL validation pattern
export const URL_PATTERN = /^https?:\/\//;

// ISO 8601 timestamp pattern
export const ISO_TIMESTAMP_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

// Route path validation pattern (for standalone plugins)
export const ROUTE_PATH_PATTERN = /^\/[a-z0-9-/]*$/;