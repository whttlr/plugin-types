// API Configuration Types
// Type definitions for API configuration

export interface APIConfig {
  server: {
    host: string;
    port: number;
    protocol: 'http' | 'https';
    timeout: number;
    retries: number;
    retryDelay: number;
  };
  endpoints: {
    base: string;
    machine: string;
    files: string;
    plugins: string;
    config: string;
    status: string;
  };
  authentication: {
    enabled: boolean;
    type: 'none' | 'basic' | 'bearer' | 'oauth';
    credentials?: {
      username?: string;
      password?: string;
      token?: string;
    };
  };
  rateLimit: {
    enabled: boolean;
    requestsPerMinute: number;
    burstLimit: number;
  };
  cors: {
    enabled: boolean;
    origins: string[];
    methods: string[];
    headers: string[];
  };
  logging: {
    enabled: boolean;
    level: 'error' | 'warn' | 'info' | 'debug';
    requests: boolean;
    responses: boolean;
  };
}