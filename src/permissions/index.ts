// Plugin Permission Types
// Type definitions for the plugin permission system

export type Permission = 
  | 'machine.read'      // Read machine status and configuration
  | 'machine.write'     // Send commands to machine
  | 'machine.control'   // Full machine control (includes read/write)
  | 'status.read'       // Read system status information
  | 'files.read'        // Read file system and project files
  | 'files.write'       // Write/modify files
  | 'config.read'       // Read application configuration
  | 'config.write'      // Modify application configuration
  | 'network.access';   // Make external network requests

export interface PermissionRequest {
  permission: Permission;
  reason: string;
  required: boolean;
}

export interface PermissionGrant {
  permission: Permission;
  granted: boolean;
  grantedAt: Date;
  grantedBy: 'user' | 'system';
}

// Valid permissions array for validation
export const VALID_PERMISSIONS: Permission[] = [
  'machine.read',
  'machine.write', 
  'machine.control',
  'status.read',
  'files.read',
  'files.write',
  'config.read',
  'config.write',
  'network.access'
];