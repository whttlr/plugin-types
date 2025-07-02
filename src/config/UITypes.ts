// UI Configuration Types
// Type definitions for user interface configuration

import { ColorScheme, Size } from './CommonTypes';

export interface UIConfig {
  theme: 'light' | 'dark' | 'auto';
  colorScheme: ColorScheme;
  fontSize: number;
  fontFamily: string;
  language: string;
  layout: {
    sidebar: {
      position: 'left' | 'right';
      width: number;
      collapsed: boolean;
    };
    toolbar: {
      position: 'top' | 'bottom';
      height: number;
      visible: boolean;
    };
    statusBar: {
      visible: boolean;
      height: number;
    };
  };
  window: {
    defaultSize: Size;
    minSize: Size;
    maximized: boolean;
    fullscreen: boolean;
    alwaysOnTop: boolean;
    resizable: boolean;
  };
  grid: {
    visible: boolean;
    size: number;
    color: string;
    opacity: number;
  };
  coordinates: {
    visible: boolean;
    precision: number;
    units: 'metric' | 'imperial';
  };
  animations: {
    enabled: boolean;
    duration: number;
    easing: string;
  };
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    screenReader: boolean;
  };
}

export interface VisualizationConfig {
  renderer: '2d' | '3d';
  quality: 'low' | 'medium' | 'high';
  antialiasing: boolean;
  shadows: boolean;
  lighting: boolean;
  background: {
    type: 'solid' | 'gradient' | 'image';
    color: string;
    gradientColors: string[];
    imageUrl?: string;
  };
  camera: {
    type: 'orthographic' | 'perspective';
    position: {
      x: number;
      y: number;
      z: number;
    };
    target: {
      x: number;
      y: number;
      z: number;
    };
    zoom: number;
  };
  toolpath: {
    visible: boolean;
    color: string;
    width: number;
    opacity: number;
  };
  workpiece: {
    visible: boolean;
    color: string;
    opacity: number;
  };
  machine: {
    visible: boolean;
    color: string;
    opacity: number;
  };
}