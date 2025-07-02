// Plugin Manifest Types
// Type definitions for plugin manifest and metadata

import { Permission } from '../permissions';

export interface PluginManifest {
  /**
   * Unique plugin identifier
   */
  id: string;

  /**
   * Human-readable plugin name
   */
  name: string;

  /**
   * Plugin version (semver)
   */
  version: string;

  /**
   * Plugin description
   */
  description: string;

  /**
   * Plugin author
   */
  author: string;

  /**
   * Plugin license (optional)
   */
  license?: string;

  /**
   * Plugin homepage URL (optional)
   */
  homepage?: string;

  /**
   * Plugin repository URL (optional)
   */
  repository?: string;

  /**
   * Plugin placement type
   */
  placement: 'dashboard' | 'standalone' | 'modal' | 'sidebar';

  /**
   * Screen where plugin should be placed (optional)
   */
  screen?: 'main' | 'new' | 'controls' | 'settings';

  /**
   * Plugin permissions required
   */
  permissions: Permission[];

  /**
   * Plugin configuration (optional)
   */
  config?: PluginConfig;

  /**
   * Plugin UI configuration (optional)
   */
  ui?: PluginUIConfig;

  /**
   * Plugin dependencies (optional)
   */
  dependencies?: PluginDependency[];

  /**
   * Plugin keywords for discovery (optional)
   */
  keywords?: string[];

  /**
   * Plugin category (optional)
   */
  category?: 'monitoring' | 'control' | 'visualization' | 'utility' | 'automation' | 'management';
}

export interface PluginConfig {
  /**
   * Default plugin settings
   */
  defaults?: Record<string, any>;

  /**
   * Plugin settings schema (JSON Schema)
   */
  schema?: Record<string, any>;

  /**
   * Whether plugin settings are user-configurable
   */
  userConfigurable?: boolean;
}

export interface PluginUIConfig {
  /**
   * Plugin dimensions
   */
  size?: {
    width?: number | string;
    height?: number | string;
  };

  /**
   * Plugin display priority (higher = more prominent)
   */
  priority?: number;

  /**
   * Whether plugin can be resized
   */
  resizable?: boolean;

  /**
   * Minimum size constraints
   */
  minSize?: {
    width?: number;
    height?: number;
  };

  /**
   * Maximum size constraints
   */
  maxSize?: {
    width?: number;
    height?: number;
  };

  /**
   * Plugin menu configuration
   */
  menu?: {
    title?: string;
    icon?: string;
    group?: string;
  };
}

export interface PluginDependency {
  /**
   * Dependency name
   */
  name: string;

  /**
   * Version range (semver)
   */
  version: string;

  /**
   * Whether dependency is required
   */
  required?: boolean;

  /**
   * Dependency type
   */
  type?: 'plugin' | 'npm' | 'system';
}