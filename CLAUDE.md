# Claude Context for @whttlr/plugin-types

## Project Overview
TypeScript type definitions package for Whttlr application plugins. Provides shared type interfaces between the Electron CNC control application and the plugin registry system to ensure API compatibility and enable type-safe plugin development.

## Key Commands
- `npm run build` - Build TypeScript definitions
- `npm run sync` - Sync types from electron-app
- `npm test` - Run compatibility tests
- `npm run test:compatibility` - Test type compatibility
- `npm run test:api` - Test API compatibility
- `npm run watch` - Watch mode for development
- `npm run clean` - Clean build directory

## Project Structure
**NOTE**: If any files are created, deleted, or moved, please update this architecture section to reflect the current project structure.

```
plugin-types/
├── 📁 src/                          # TypeScript type definitions
│   ├── 📁 api/                      # Plugin API interfaces
│   │   ├── ConfigAPI.ts             # Configuration access interface
│   │   ├── PluginAPI.ts             # Main plugin API interface
│   │   └── index.ts                 # API exports
│   ├── 📁 config/                   # Configuration type definitions
│   │   ├── APITypes.ts              # API configuration types
│   │   ├── AppTypes.ts              # Application configuration types
│   │   ├── CommonTypes.ts           # Shared type definitions
│   │   ├── ConfigTypes.ts           # Complete configuration interface
│   │   ├── DefaultsTypes.ts         # Default values types
│   │   ├── MachineTypes.ts          # Machine configuration types
│   │   ├── StateTypes.ts            # State configuration types
│   │   ├── UITypes.ts               # UI configuration types
│   │   └── index.ts                 # Config exports
│   ├── 📁 database/                 # Database record types
│   │   └── index.ts                 # Database type exports
│   ├── 📁 permissions/              # Permission system types
│   │   └── index.ts                 # Permission definitions
│   ├── 📁 plugin/                   # Plugin manifest and metadata
│   │   ├── PluginManifest.ts        # Plugin manifest interface
│   │   ├── PluginRegistry.ts        # Registry types and validation
│   │   └── index.ts                 # Plugin exports
│   ├── 📁 tests/                    # Type compatibility tests
│   │   ├── api-compatibility.test.ts # API interface testing
│   │   ├── compatibility.test.ts     # General compatibility tests
│   │   └── index.ts                 # Test exports
│   └── index.ts                     # Main package exports
│
├── 📁 scripts/                      # Build and sync scripts
│   └── sync-from-electron.js        # Type synchronization script
│
├── 📁 dist/                         # Compiled JavaScript output
├── package.json                     # Package configuration
├── tsconfig.json                    # TypeScript configuration
├── README.md                        # Package documentation
├── LICENSE                          # MIT license
└── PLUGIN_SYNC_AND_DEVELOPMENT_PLAN.md  # Comprehensive sync strategy
```

## Important Notes
- This is a TypeScript type definitions package (no runtime code)
- Published to npm as `@whttlr/plugin-types`
- Automatically synced with electron-app type definitions
- Used by both plugin-registry and plugin developers
- Provides type safety for plugin development

## Package Information
- **NPM Package**: https://www.npmjs.com/package/@whttlr/plugin-types
- **Version**: 1.0.1
- **Dependencies**: None (type definitions only)
- **Peer Dependencies**: TypeScript ^5.0.0

## Type Categories

### API Types
- `PluginAPI`: Main plugin API interface
- `ConfigAPI`: Configuration access methods
- Future extensions: MachineAPI, EventAPI, StorageAPI, UIAPI

### Configuration Types
- `CompleteConfig`: Full application configuration
- `MachineConfig`: Machine-specific settings
- `StateConfig`: Application state
- `UIConfig`: User interface preferences
- `APIConfig`: API endpoints and settings
- `DefaultsConfig`: Default values

### Database Types
- `PluginRecord`: Plugin database record
- `PluginStateRecord`: Plugin state and settings
- `CommandRecord`: Command history
- `AppStateRecord`: Application state

### Plugin Types
- `PluginManifest`: Plugin metadata and configuration
- `PluginRegistryManifest`: Extended manifest for registry
- `PluginRegistryEntry`: Registry catalog entry
- `PluginRegistry`: Full registry structure

### Validation Constants
- `PLUGIN_ID_PATTERN`: Regex for valid plugin IDs
- `VALID_PERMISSIONS`: Available permission strings
- `VALID_PLACEMENTS`: Plugin placement options
- `VALID_CATEGORIES`: Plugin category types

## Synchronization Process

### Automatic Sync from Electron App
The package includes a sync script that:
1. Copies type definitions from electron-app
2. Transforms imports for standalone package
3. Preserves interface definitions
4. Updates validation constants

### Manual Sync Command
```bash
# Set electron app path and run sync
ELECTRON_APP_PATH=../electron-app npm run sync
```

## Development Workflow

### For Package Maintainers
1. Run sync script when electron-app types change
2. Review changes and update version
3. Build and test compatibility
4. Publish new version to npm

### For Plugin Developers
1. Install package: `npm install @whttlr/plugin-types`
2. Import types in plugin code
3. Get full TypeScript IntelliSense
4. Ensure API compatibility

## Testing Strategy
- **Compatibility Tests**: Verify type definitions are valid
- **API Tests**: Ensure interfaces match expectations
- **Build Tests**: Confirm TypeScript compilation succeeds
- **Integration Tests**: Validate usage in real projects

## Version Management
- **Patch (1.0.x)**: Type fixes, no breaking changes
- **Minor (1.x.0)**: New types, backwards compatible
- **Major (x.0.0)**: Breaking changes to existing types

## Recent Updates
- Published initial version 1.0.1 to npm registry
- Added comprehensive plugin registry types
- Implemented validation constants and patterns
- Created sync script for electron-app integration
- Set up automated testing infrastructure
- Successfully integrated with both electron-app and plugin-registry