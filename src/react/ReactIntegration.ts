/**
 * React Integration Types
 * Type definitions for React hooks and context providers
 */

import { Observable } from 'rxjs';
import { PluginContext, SharedState, PluginEvent, ToolDefinition } from '../core';

/**
 * Plugin provider props
 */
export interface PluginProviderProps {
  children: React.ReactNode;
}

/**
 * Plugin context value for React context
 */
export interface PluginContextValue {
  pluginContext: PluginContext | null;
}

/**
 * Hook types for plugin state access
 */
export type UsePluginStateSelector<T> = (
  context: PluginContext,
  pluginId: string,
  selector: (state: any) => T
) => T;

export type UseSharedState = (context: PluginContext) => SharedState;

export type UseUpdateSharedState = (
  context: PluginContext
) => (update: Partial<SharedState>) => void;

/**
 * Hook types for plugin events
 */
export type UsePluginEvent = (
  context: PluginContext,
  eventType: string,
  handler: (event: PluginEvent) => void
) => void;

export type UseEmitEvent = (
  context: PluginContext
) => (type: string, payload?: any) => void;

export type UseLastEvent = (
  context: PluginContext,
  eventType: string
) => PluginEvent | null;

export type UseEventHistory = (
  context: PluginContext,
  eventType: string,
  limit?: number
) => PluginEvent[];

/**
 * Hook types for service operations
 */
export type UseServiceOperation = (
  context: PluginContext,
  serviceId: string,
  operation: string
) => (input: any) => Observable<any>;

/**
 * Hook types for commands
 */
export type UsePluginCommand = (
  context: PluginContext,
  commandId: string
) => (...args: any[]) => Observable<any>;

/**
 * Machine settings hook types
 */
export interface MachineSettings {
  name: string;
  model: string;
  workingArea: { x: number; y: number; z: number };
  limits: {
    maxFeedRate: number;
    maxSpindleSpeed: number;
    maxAcceleration: { x: number; y: number; z: number };
  };
  coordinateSystem: string;
  unitOfMeasurement: 'metric' | 'imperial';
}

export type UseMachineSettings = () => MachineSettings | undefined;

export type UseMachineType = () => string | undefined;

export type UseWorkArea = () => { x: number; y: number; z: number } | undefined;

export type UseMaxFeedRate = () => number | undefined;

export type UseUnits = () => 'metric' | 'imperial' | undefined;

/**
 * Connection status hook types
 */
export interface ConnectionStatus {
  isConnected: boolean;
  port: string | null;
  baudRate: number;
}

export type UseConnectionStatus = () => ConnectionStatus | undefined;

export type UseIsConnected = () => boolean;

/**
 * Tool and G-code hook types
 */
export type UseCurrentTool = () => ToolDefinition | undefined;

export type UseCurrentGCode = () => string | null;

export type UseSetCurrentGCode = () => (gcode: string) => void;

/**
 * Convenience hook that returns all common app state
 */
export interface CommonAppState {
  machineSettings?: MachineSettings;
  connectionStatus?: ConnectionStatus;
  isConnected: boolean;
  currentGCode: string | null;
  currentTool?: ToolDefinition;
  machineType?: string;
  workArea?: { x: number; y: number; z: number };
  maxFeedRate?: number;
  units?: 'metric' | 'imperial';
}

export type UseCommonAppState = () => CommonAppState;
