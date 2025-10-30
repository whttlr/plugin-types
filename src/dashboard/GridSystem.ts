/**
 * Dashboard Grid System Types
 * 12-column responsive grid configuration
 */

/**
 * Responsive breakpoints
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Breakpoint sizes (pixels)
 */
export const BREAKPOINTS = {
  xs: 0,      // Mobile (<576px)
  sm: 576,    // Small tablets (≥576px)
  md: 768,    // Tablets (≥768px)
  lg: 992,    // Desktop (≥992px)
  xl: 1200,   // Large desktop (≥1200px)
} as const;

/**
 * Responsive column configuration
 * Maps breakpoints to column counts (1-12)
 */
export interface ResponsiveColumns {
  xs?: number;    // Mobile
  sm?: number;    // Small tablets
  md?: number;    // Tablets
  lg?: number;    // Desktop
  xl?: number;    // Large desktop
}

/**
 * Card size configuration
 */
export interface CardSize {
  /**
   * Number of columns to span (1-12)
   * Takes precedence over width when specified
   */
  cols?: number;

  /**
   * CSS width value
   * Examples: '33%', '400px', 'auto'
   */
  width?: string;

  /**
   * CSS height value or 'auto' for content-based
   * Examples: '300px', '50vh', 'auto'
   */
  height?: string | 'auto';
}

/**
 * Complete grid configuration for a card
 */
export interface CardGridConfig extends CardSize {
  /**
   * Responsive column configuration
   * Overrides cols at different breakpoints
   */
  responsive?: ResponsiveColumns;

  /**
   * Display priority (supports decimals)
   * Lower numbers render first (like z-index)
   * Examples: 1, 50, 100.5, 250.25
   */
  priority?: number;
}

/**
 * Priority range recommendations
 */
export const PRIORITY_RANGES = {
  SYSTEM: { min: 0, max: 99, description: 'System/Critical (alerts, notifications)' },
  BUILTIN: { min: 100, max: 499, description: 'Built-in components' },
  EXTENSION: { min: 500, max: 999, description: 'Extension components' },
  LOW: { min: 1000, max: Infinity, description: 'Low priority (debug, admin)' },
} as const;

/**
 * Default priority values
 */
export const DEFAULT_PRIORITIES = {
  CRITICAL: 10,
  HIGH: 50,
  BUILTIN_PRIMARY: 100,
  BUILTIN_SECONDARY: 200,
  BUILTIN_TERTIARY: 300,
  EXTENSION_PRIMARY: 500,
  EXTENSION_SECONDARY: 700,
  LOW: 1000,
} as const;

/**
 * Grid gap sizes
 */
export type GridGap = 'none' | 'sm' | 'base' | 'lg' | 'xl';

/**
 * Dashboard grid configuration
 */
export interface DashboardGridConfig {
  /**
   * Number of columns in the grid
   * Default: 12
   */
  columns?: number;

  /**
   * Gap between cards
   * Default: 'lg'
   */
  gap?: GridGap;

  /**
   * Grid padding
   * Default: 'base'
   */
  padding?: GridGap;

  /**
   * Maximum width for the grid container
   */
  maxWidth?: string;
}

/**
 * Helper function to validate priority
 */
export function isValidPriority(priority: number): boolean {
  return typeof priority === 'number' && !isNaN(priority) && isFinite(priority);
}

/**
 * Helper function to validate columns
 */
export function isValidColumns(cols: number): boolean {
  return Number.isInteger(cols) && cols >= 1 && cols <= 12;
}

/**
 * Helper function to get priority range
 */
export function getPriorityRange(priority: number): keyof typeof PRIORITY_RANGES | 'UNKNOWN' {
  if (priority >= PRIORITY_RANGES.SYSTEM.min && priority < PRIORITY_RANGES.SYSTEM.max) {
    return 'SYSTEM';
  }
  if (priority >= PRIORITY_RANGES.BUILTIN.min && priority < PRIORITY_RANGES.BUILTIN.max) {
    return 'BUILTIN';
  }
  if (priority >= PRIORITY_RANGES.EXTENSION.min && priority < PRIORITY_RANGES.EXTENSION.max) {
    return 'EXTENSION';
  }
  if (priority >= PRIORITY_RANGES.LOW.min) {
    return 'LOW';
  }
  return 'UNKNOWN';
}
