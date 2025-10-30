/**
 * Plugin Manifest Types
 * Type definitions for plugin manifests and metadata
 */

import { Permission } from '../permissions';
import { ServiceManifest } from '../core';
import { CardGridConfig, CardTemplateName, CardTemplateData } from '../dashboard';

/**
 * Plugin category types
 */
export type PluginCategory =
  | 'monitoring'
  | 'control'
  | 'visualization'
  | 'utility'
  | 'automation'
  | 'management';

/**
 * Plugin view type
 * Determines where and how the plugin is displayed
 */
export type PluginMainView =
  | 'dashboard'    // Card in dashboard grid (uses card template)
  | 'standalone'   // Full-page view with dedicated route
  | 'sidebar'      // 400px slide-in panel from right
  | 'modal';       // 700px centered dialog

/**
 * File-based plugin manifest
 * Used for plugins loaded from filesystem (sandboxed iframe execution)
 */
export interface FilePluginManifest {
  /** Unique plugin identifier (lowercase, numbers, hyphens, dots) */
  id: string;

  /** Human-readable plugin name */
  name: string;

  /** Semantic version (major.minor.patch) */
  version: string;

  /** Brief description of plugin functionality */
  description: string;

  /** Plugin author or organization */
  author: string;

  /** JavaScript entry file (default: 'plugin.js') */
  entryPoint: string;

  /** Plugin API version compatibility */
  apiVersion: string;

  /** View type determines UI placement */
  mainView: PluginMainView;

  /** Required permissions for plugin operation */
  permissions: Permission[];

  /** Whether plugin is enabled by default */
  enabled: boolean;

  /** Software license identifier (optional) */
  license?: string;

  /** Plugin homepage URL (optional) */
  homepage?: string;

  /** Repository information (optional) */
  repository?: string | {
    type: 'git' | 'svn' | 'hg';
    url: string;
  };

  /** Search keywords for discovery (optional) */
  keywords?: string[];

  /** Primary plugin category (optional) */
  category?: PluginCategory;

  /** Plugin configuration (optional) */
  config?: PluginConfig;

  /** Plugin UI configuration (optional) */
  ui?: PluginUIConfig;

  /** Dashboard card configuration (for mainView: 'dashboard') */
  card?: DashboardCardConfig;

  /** NPM-style dependency declarations (optional) */
  dependencies?: Record<string, string>;

  /** Screenshot URLs for plugin gallery (optional) */
  screenshots?: string[];

  /** URL to changelog document (optional) */
  changelog?: string;
}

/**
 * Dashboard card configuration
 * Used when mainView is 'dashboard'
 */
export interface DashboardCardConfig extends CardGridConfig {
  /**
   * Card template to use
   * Optional: if not specified, renders plugin iframe
   */
  template?: CardTemplateName;

  /**
   * Data for the card template
   * Only used if template is specified
   */
  templateData?: CardTemplateData;

  /**
   * Custom card title (overrides plugin name)
   */
  title?: string;

  /**
   * Card icon
   */
  icon?: string;
}

/**
 * Service plugin interface
 * For plugins loaded as TypeScript/JavaScript modules
 */
export interface ServicePlugin {
  /** Unique plugin identifier */
  id: string;

  /** Human-readable plugin name */
  name: string;

  /** Semantic version */
  version: string;

  /** Service contract definition (optional) */
  manifest?: ServiceManifest;

  /**
   * Called when plugin is activated
   * Receives full PluginContext with all APIs
   */
  activate(context: any): Promise<void> | void;

  /**
   * Called when plugin is deactivated
   * Should cleanup all resources
   */
  deactivate?(): Promise<void> | void;
}

/**
 * Plugin configuration
 */
export interface PluginConfig {
  /** Default plugin settings */
  defaults?: Record<string, any>;

  /** Plugin settings schema (JSON Schema) */
  schema?: Record<string, any>;

  /** Whether plugin settings are user-configurable */
  userConfigurable?: boolean;
}

/**
 * Plugin UI configuration
 */
export interface PluginUIConfig {
  /** Plugin dimensions (legacy - use card.cols/width/height for dashboard) */
  size?: {
    width?: number | string;
    height?: number | string;
  };

  /**
   * Display priority (supports decimals like z-index)
   * Lower numbers render first
   * Examples: 1, 50.5, 100, 250.25
   *
   * Recommended ranges:
   * - 0-99: System/Critical
   * - 100-499: Built-in components
   * - 500-999: Extensions
   * - 1000+: Low priority
   */
  priority?: number;

  /** Whether plugin can be resized */
  resizable?: boolean;

  /** Minimum size constraints */
  minSize?: {
    width?: number;
    height?: number;
  };

  /** Maximum size constraints */
  maxSize?: {
    width?: number;
    height?: number;
  };

  /** Plugin menu configuration */
  menu?: {
    title?: string;
    icon?: string;
    group?: string;
  };
}

/**
 * Plugin dependency
 */
export interface PluginDependency {
  /** Dependency name */
  name: string;

  /** Version range (semver) */
  version: string;

  /** Whether dependency is required */
  required?: boolean;

  /** Dependency type */
  type?: 'plugin' | 'npm' | 'system';
}
