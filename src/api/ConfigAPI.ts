/**
 * Configuration API Interface
 * Provides access to application configuration
 *
 * @deprecated This interface is kept for backwards compatibility
 * New plugins should use PluginContext.state for settings access
 */

import { CompleteConfig } from '../config';

export interface ConfigAPI {
  /**
   * Get a specific configuration section
   */
  getSection<K extends keyof CompleteConfig>(section: K): CompleteConfig[K];

  /**
   * Get the complete configuration
   */
  getAll(): CompleteConfig;

  /**
   * Update a configuration section
   */
  updateSection<K extends keyof CompleteConfig>(
    section: K,
    updates: Partial<CompleteConfig[K]>
  ): Promise<void>;
}