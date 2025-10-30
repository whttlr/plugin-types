/**
 * Core Plugin System Types
 * Defines the foundational types for the RxJS-powered plugin architecture
 */

import { Observable } from 'rxjs';

/**
 * JSON Schema definition for service validation
 */
export interface JSONSchema {
  $schema?: string;
  type: string;
  properties?: Record<string, any>;
  required?: string[];
  [key: string]: any;
}

/**
 * Service operation definition
 * Defines a single operation that a service can perform
 */
export interface ServiceOperation {
  description: string;
  input: string; // Schema name for input validation
  output: string; // Schema name for output validation
  async?: boolean;
  timeout?: number;
  errors?: string[];
}

/**
 * Service manifest - defines the contract for a service
 * Services are discovered by capabilities rather than IDs
 */
export interface ServiceManifest {
  id: string;
  version: string;
  name: string;
  capabilities: string[]; // e.g., ['parse', 'validate', 'optimize']
  operations: Record<string, ServiceOperation>;
  requirements?: {
    memory?: string;
    permissions?: string[];
  };
  priority?: number; // Higher priority services are preferred
}

/**
 * Service definition with implementation
 * Combines manifest with actual operation handlers
 */
export interface ServiceDefinition {
  id: string;
  manifest: ServiceManifest;
  operations: Record<string, (input: any) => Promise<any> | any>;
  health?: () => Promise<HealthStatus>;
}

/**
 * Health check status for services
 */
export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: Record<string, {
    status: 'pass' | 'warn' | 'fail';
    message?: string;
    duration: number;
  }>;
  metrics?: {
    requestsPerSecond: number;
    averageLatency: number;
    errorRate: number;
  };
}

/**
 * Standard error response format
 * All service errors follow this structure
 */
export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
    service: string;
    timestamp: string;
    traceId: string;
    suggestion?: string;
  };
}

/**
 * Simple logger interface for plugins
 */
export interface Logger {
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
}

/**
 * Plugin event structure
 */
export interface PluginEvent {
  type: string;
  payload?: any;
  timestamp: Date;
  source?: string;
}

/**
 * Inter-plugin message structure
 */
export interface PluginMessage {
  to: string; // Plugin ID or '*' for broadcast
  from: string;
  type: string;
  payload: any;
}

/**
 * Tool definition
 */
export interface ToolDefinition {
  name: string;
  diameter: number;
  length: number;
  flutes: number;
  material: 'HSS' | 'Carbide' | 'Cobalt' | 'Diamond';
  type: 'flat' | 'ballnose' | 'vbit' | 'drill';
}

/**
 * Shared state structure
 * Synced with application settings and available to all plugins
 */
export interface SharedState {
  currentFile: any | null;
  currentGCode: string | null;
  currentTool?: ToolDefinition;
  settings: {
    machine: {
      name: string;
      model: string;
      workingArea: {
        x: number;
        y: number;
        z: number;
      };
      limits: {
        maxFeedRate: number;
        maxSpindleSpeed: number;
        maxAcceleration: { x: number; y: number; z: number };
      };
      coordinateSystem: string;
      unitOfMeasurement: 'metric' | 'imperial';
    };
    connection: {
      isConnected: boolean;
      port: string | null;
      baudRate: number;
    };
    piApi?: {
      enabled: boolean;
      ip: string;
      port: number;
      serialPort: string;
    };
  };
  machineSettings?: any;
  isConnected?: boolean;
  [key: string]: any;
}

/**
 * Service Registry interface
 * Manages service registration, discovery, and execution
 */
export interface ServiceRegistry {
  addSchema(schemaId: string, schema: JSONSchema): void;
  register(service: ServiceDefinition): Promise<void>;
  discover(capability: string): Promise<ServiceDefinition[]>;
  execute(serviceId: string, operation: string, input: any): Promise<any>;
  getService(serviceId: string): ServiceDefinition | undefined;
  getAllServices(): ServiceDefinition[];
}

/**
 * Event Bus interface
 * RxJS-powered event system for plugin communication
 */
export interface EventBus {
  events$: Observable<PluginEvent>;
  emit(event: PluginEvent): void;
  on(eventType: string): Observable<PluginEvent>;
  emitSimple(type: string, payload?: any, source?: string): void;
}

/**
 * Hook Manager interface
 * Manages lifecycle hooks for operations
 */
export interface HookManager {
  register(hookName: string, handler: (data: any) => Promise<any>): void;
  execute(hookName: string, data: any): Promise<any>;
  remove(hookName: string, handler: (data: any) => Promise<any>): void;
  getHookNames(): string[];
}

/**
 * Plugin State Manager interface
 * Manages shared and plugin-specific state with RxJS
 */
export interface PluginStateManager {
  sharedState$: Observable<SharedState>;
  messages$: Observable<PluginMessage>;
  getSharedState(): SharedState;
  updateSharedState(update: Partial<SharedState>): void;
  get(path: string): any; // Path-based access (e.g., 'settings.machine.name')
  set(path: string, value: any): void;
  forPlugin(pluginId: string): {
    shared: Observable<SharedState>;
    private: Observable<any>;
    messages: Observable<PluginMessage>;
    getState(): any;
    update(state: any): void;
    sendMessage(to: string, type: string, payload: any): void;
  };
}

/**
 * Command Registry interface
 * Manages executable commands from plugins
 */
export interface CommandRegistry {
  register(commandId: string, handler: (...args: any[]) => Promise<any>): void;
  execute(commandId: string, ...args: any[]): Promise<any>;
  unregister(commandId: string): void;
  has(commandId: string): boolean;
  getCommandIds(): string[];
}

/**
 * Plugin Context - what service plugins receive during activation
 * This is the complete API surface for TypeScript/JS plugin modules
 */
export interface PluginContext {
  services: ServiceRegistry;
  events: EventBus;
  hooks: HookManager;
  state: PluginStateManager;
  commands: CommandRegistry;
  logger: Logger;
}

/**
 * Service Plugin interface (TypeScript/JS modules)
 * These are plugins loaded directly as JavaScript modules
 */
export interface Plugin {
  id: string;
  name: string;
  version: string;
  manifest?: ServiceManifest;
  activate(context: PluginContext): Promise<void> | void;
  deactivate?(): Promise<void> | void;
}

/**
 * Pipeline stage definition
 */
export interface PipelineStage {
  id: string;
  service: string;
  operation: string;
  input: string; // Can use $ to reference previous outputs
  output: string;
  condition?: string;
  hooks?: {
    before?: string[];
    after?: string[];
  };
}

/**
 * Pipeline definition
 */
export interface Pipeline {
  id: string;
  name: string;
  stages: PipelineStage[];
  output: Record<string, any>;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: Array<{
    line: number;
    message: string;
    code?: string;
  }>;
  warnings: Array<{
    line: number;
    message: string;
    code?: string;
  }>;
}
