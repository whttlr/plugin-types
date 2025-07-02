// Main Plugin API Interface
// Central interface that plugins receive for interacting with the application

import { ConfigAPI } from './ConfigAPI';

export interface PluginAPI {
  /**
   * Configuration access interface
   */
  config: ConfigAPI;

  /**
   * Machine control interface (future extension)
   */
  machine?: MachineAPI;

  /**
   * Event system interface (future extension)
   */
  events?: EventAPI;

  /**
   * Storage interface (future extension)
   */
  storage?: StorageAPI;

  /**
   * UI manipulation interface (future extension)
   */
  ui?: UIAPI;
}

// Future API interfaces (placeholder definitions)
export interface MachineAPI {
  // Machine control methods will be defined when implemented
  [key: string]: any;
}

export interface EventAPI {
  // Event system methods will be defined when implemented
  [key: string]: any;
}

export interface StorageAPI {
  // Storage methods will be defined when implemented
  [key: string]: any;
}

export interface UIAPI {
  // UI methods will be defined when implemented
  [key: string]: any;
}