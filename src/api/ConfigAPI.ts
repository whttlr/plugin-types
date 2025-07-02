// Configuration API Interface
// Plugin interface for accessing application configuration

import { CompleteConfig } from '../config';

export interface ConfigAPI {
  /**
   * Get a configuration value by path (e.g., 'machine.jogSettings.defaultSpeed')
   * @param path - Dot-notation path to the configuration value
   * @returns The configuration value or null if not found
   */
  get: <T>(path: string) => T | null;

  /**
   * Get an entire configuration section
   * @param section - The configuration section name
   * @returns The configuration section or null if not found
   */
  getSection: (section: keyof CompleteConfig) => any | null;

  /**
   * Get a configuration value with a fallback
   * @param path - Dot-notation path to the configuration value
   * @param fallback - Fallback value if not found
   * @returns The configuration value or fallback
   */
  getWithFallback: <T>(path: string, fallback: T) => T;

  /**
   * Check if configuration is loaded
   * @returns True if configuration is loaded
   */
  isLoaded: () => boolean;

  /**
   * Reload configuration from disk
   * @returns Promise that resolves when configuration is reloaded
   */
  reload: () => Promise<void>;
}