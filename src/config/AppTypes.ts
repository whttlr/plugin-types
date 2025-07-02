// Application Configuration Types
// Type definitions for application-specific configuration

export interface AppConfig {
  name: string;
  version: string;
  description: string;
  author: string;
  homepage: string;
  repository: string;
  license: string;
  environment: 'development' | 'production' | 'test';
  debug: boolean;
  autoUpdate: boolean;
  telemetry: boolean;
  errorReporting: boolean;
  crashReporting: boolean;
  analytics: boolean;
  logging: {
    level: 'error' | 'warn' | 'info' | 'debug';
    file: string;
    maxSize: number;
    maxFiles: number;
  };
  paths: {
    userData: string;
    logs: string;
    temp: string;
    plugins: string;
    config: string;
  };
  performance: {
    enableGPU: boolean;
    enableWebGL: boolean;
    maxMemoryUsage: number;
  };
}