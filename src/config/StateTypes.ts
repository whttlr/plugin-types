// State Configuration Types
// Type definitions for application state configuration

export interface StateConfig {
  machineConnected: boolean;
  currentPosition: {
    x: number;
    y: number;
    z: number;
  };
  workOffset: {
    x: number;
    y: number;
    z: number;
  };
  machineUnits: 'metric' | 'imperial';
  coordinateSystem: string;
  feedRate: number;
  spindleSpeed: number;
  toolNumber: number;
  modalState: {
    motion: string;
    coordinate: string;
    plane: string;
    units: string;
    distance: string;
    feedRate: string;
  };
  activeStates: string[];
  alarmState: boolean;
  errorState: boolean;
  pausedState: boolean;
  runningState: boolean;
}