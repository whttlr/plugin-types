/**
 * Dashboard Card Template Types
 * Defines reusable card patterns for dashboard plugins
 */

/**
 * Available card template names
 */
export type CardTemplateName =
  | 'StatusCard'        // Connection status, info display
  | 'DataDisplayCard'   // Metrics, statistics, charts
  | 'UploadCard'        // File upload interface
  | 'ListCard'          // History, lists with badges
  | 'ActionCard'        // Buttons and form controls
  | 'MediaPlayerCard';  // Audio/video playback

/**
 * Metric display for DataDisplayCard
 */
export interface MetricData {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  change?: string;
  icon?: string;
}

/**
 * Chart configuration for DataDisplayCard
 */
export interface ChartData {
  type: 'line' | 'bar' | 'pie' | 'area';
  data: any[];
  xAxis?: string;
  yAxis?: string;
  options?: Record<string, any>;
}

/**
 * StatusCard template data
 * Displays connection status, machine info, position
 */
export interface StatusCardData {
  title: string;
  subtitle?: string;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  statusLabel?: string;
  info?: Array<{
    label: string;
    value: string | number;
    monospace?: boolean;
  }>;
  actions?: Array<{
    label: string;
    variant?: 'default' | 'destructive' | 'outline';
    event: string;
    data?: any;
  }>;
}

/**
 * DataDisplayCard template data
 * Displays metrics, statistics, and charts
 */
export interface DataDisplayCardData {
  title: string;
  subtitle?: string;
  description?: string;
  metrics?: MetricData[];
  chart?: ChartData;
  footer?: {
    text?: string;
    actions?: Array<{
      label: string;
      event: string;
      data?: any;
    }>;
  };
}

/**
 * UploadCard template data
 * File upload and management interface
 */
export interface UploadCardData {
  title: string;
  description?: string;
  accept?: string;              // File types (e.g., '.pdf,.doc')
  maxSize?: number;             // Max file size in bytes
  multiple?: boolean;           // Allow multiple files
  uploadEndpoint?: string;      // API endpoint
  icon?: string;                // Icon to display
  dragDropText?: string;        // Text shown in drag-drop area
}

/**
 * List item for ListCard
 */
export interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  badge?: {
    text: string;
    variant: 'success' | 'danger' | 'warning' | 'secondary';
    icon?: string;
  };
  metadata?: Array<{
    icon?: string;
    text: string;
  }>;
  progress?: number;            // 0-100
  onClick?: {
    event: string;
    data?: any;
  };
}

/**
 * ListCard template data
 * Displays lists with badges, history, etc.
 */
export interface ListCardData {
  title: string;
  subtitle?: string;
  items: ListItem[];
  emptyState?: {
    icon?: string;
    title: string;
    description?: string;
  };
  footer?: {
    text?: string;
    actions?: Array<{
      label: string;
      event: string;
      variant?: 'default' | 'outline';
    }>;
  };
}

/**
 * Action button for ActionCard
 */
export interface ActionButton {
  label: string;
  type: 'primary' | 'secondary' | 'danger' | 'outline';
  icon?: string;
  event: string;              // Event to emit on click
  data?: any;                 // Event payload
  disabled?: boolean;
}

/**
 * ActionCard template data
 * Buttons and form controls for user actions
 */
export interface ActionCardData {
  title: string;
  description?: string;
  actions: ActionButton[];
  layout?: 'vertical' | 'horizontal' | 'grid';
}

/**
 * MediaPlayerCard template data
 * Audio/video playback interface
 */
export interface MediaPlayerCardData {
  title: string;
  src: string;                  // Media URL
  type: 'audio' | 'video';
  autoplay?: boolean;
  controls?: boolean;
  poster?: string;              // Video poster image
  playlist?: Array<{
    title: string;
    src: string;
    artist?: string;
    duration?: string;
  }>;
}

/**
 * Union type of all card template data
 */
export type CardTemplateData =
  | StatusCardData
  | DataDisplayCardData
  | UploadCardData
  | ListCardData
  | ActionCardData
  | MediaPlayerCardData;
