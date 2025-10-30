/**
 * Plugin API Interface
 * This is the API exposed to file-based plugins (iframe execution)
 */

import { PluginEvent } from '../core';

/**
 * Plugin API for file-based plugins
 * Injected into iframe via postMessage bridge
 */
export interface PluginAPI {
  /**
   * Get plugin metadata
   */
  getMetadata(): {
    id: string;
    name: string;
    version: string;
    mainView: 'dashboard' | 'standalone' | 'sidebar' | 'modal';
    [key: string]: any;
  };

  /**
   * State access interface
   */
  state: {
    /**
     * Get a value from shared state by path
     * @example api.state.get('settings.machine.name')
     */
    get(path: string): Promise<any>;

    /**
     * Plugin-specific state management
     */
    forPlugin(): {
      /**
       * Get plugin's private state
       */
      getState(): Promise<any>;

      /**
       * Update plugin's private state
       */
      update(state: any): Promise<void>;
    };
  };

  /**
   * Event system interface
   */
  events: {
    /**
     * Subscribe to events
     * @returns Subscription object with unsubscribe method
     */
    on(eventType: string, handler: (event: PluginEvent) => void): Promise<{
      unsubscribe: () => Promise<void>;
    }>;

    /**
     * Emit an event
     */
    emit(type: string, payload?: any): Promise<void>;
  };

  /**
   * Service execution interface (if permitted)
   * Only available if plugin has 'services' permission
   */
  services?: {
    /**
     * Execute a service operation
     */
    execute(serviceId: string, operation: string, input: any): Promise<any>;

    /**
     * Discover services by capability
     */
    discover(capability: string): Promise<any[]>;

    /**
     * Register a service (advanced permission required)
     */
    register?(serviceId: string, manifest: any, operations: any): Promise<void>;
  };

  /**
   * Logger interface
   */
  logger: {
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
    debug(message: string, ...args: any[]): void;
  };
}

/**
 * File-based plugin interface
 * Structure that plugins must implement
 */
export interface FileBasedPlugin {
  /**
   * Called when plugin is loaded
   */
  onLoad(api: PluginAPI): Promise<void> | void;

  /**
   * Render the plugin UI
   */
  renderUI(api: PluginAPI): Promise<void> | void;

  /**
   * Called when plugin is unloaded
   */
  onUnload(): Promise<void> | void;

  /**
   * API reference stored by plugin
   */
  api: PluginAPI | null;

  /**
   * Subscriptions array for cleanup
   */
  subscriptions?: Array<{ unsubscribe: () => Promise<void> }>;
}
