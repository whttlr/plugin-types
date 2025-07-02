# @whttlr/plugin-types

TypeScript type definitions for Whttlr application plugins.

## Installation

```bash
npm install @whttlr/plugin-types
```

## Usage

```typescript
import { PluginAPI, CompleteConfig, PluginRecord } from '@whttlr/plugin-types';

// Use in your plugin development
export interface MyPlugin {
  api: PluginAPI;
}

export const MyPluginComponent: React.FC<{ api: PluginAPI }> = ({ api }) => {
  const machineConfig = api.config.getSection('machine');
  // Your plugin code here
};
```

## Available Types

### Core API Types
- `PluginAPI` - Main plugin API interface
- `ConfigAPI` - Configuration access interface

### Configuration Types
- `CompleteConfig` - Full application configuration
- `MachineConfig` - Machine-specific configuration
- `StateConfig` - Application state configuration
- `UIConfig` - User interface configuration
- `APIConfig` - API configuration
- `DefaultsConfig` - Default values configuration

### Database Types
- `PluginRecord` - Plugin database record
- `PluginStateRecord` - Plugin state database record
- `CommandRecord` - Command history record
- `AppStateRecord` - Application state record

### Plugin Manifest Types
- `PluginManifest` - Plugin manifest interface
- `Permission` - Plugin permission types

## Development

This package is automatically synchronized with the main Whttlr electron application to ensure type compatibility.

### Building

```bash
npm run build
```

### Syncing Types

```bash
npm run sync
```

## License

MIT