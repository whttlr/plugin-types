// Defaults Configuration Types
// Type definitions for default values configuration

export interface DefaultsConfig {
  machine: {
    units: 'metric' | 'imperial';
    workCoordinateSystem: string;
    feedRate: number;
    spindleSpeed: number;
    jogSpeed: number;
    jogIncrement: number;
  };
  ui: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    showGrid: boolean;
    showCoordinates: boolean;
    autoConnect: boolean;
  };
  files: {
    defaultDirectory: string;
    supportedFormats: string[];
    maxFileSize: number;
    autoBackup: boolean;
    backupInterval: number;
  };
  networking: {
    timeout: number;
    retries: number;
    checkInterval: number;
  };
  plugins: {
    autoLoad: boolean;
    autoUpdate: boolean;
    updateCheckInterval: number;
    allowBeta: boolean;
  };
}