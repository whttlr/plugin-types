// Common Configuration Types
// Shared type definitions used across multiple configuration domains

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface AxisLimits {
  min: number;
  max: number;
}

export interface AxisLimitsSet {
  x: AxisLimits;
  y: AxisLimits;
  z: AxisLimits;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export interface Size {
  width: number;
  height: number;
}