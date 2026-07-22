# DocScript

> Component-based JavaScript framework for building editable Microsoft Word documents.

## Vision

DocScript sits on top of the existing `docx` library and provides a simpler, semantic, component-based API. Think of it as React for Word documents.

Instead of writing:

```ts
new Paragraph({
  children: [
    new TextRun("Hello")
  ]
})
```

Developers write:

```ts
Paragraph("Hello")
```

## Why DocScript

- **Semantic**: Components describe document meaning, not formatting
- **Component-based**: Compose documents from reusable building blocks
- **Type-safe**: Full TypeScript support with strict typing
- **Immutable**: All nodes are frozen, preventing accidental mutation
- **Extensible**: Register custom components via the plugin registry

## Architecture

```
docscript/
  packages/
    core/            - Component factories and registry
    types/           - Shared TypeScript types
    parser/          - Node normalization and parsing
    validator/       - Modular validation rules
    renderer-docx/   - DOCX rendering (placeholder)
  examples/          - Usage examples
  tests/             - Integration tests
```

## Packages

| Package | Description |
|---------|-------------|
| `@docscript/types` | Shared TypeScript interfaces and type definitions |
| `@docscript/core` | Component factories (Document, Heading, Paragraph, etc.) and registry |
| `@docscript/parser` | Node normalization and parsing pipeline |
| `@docscript/validator` | Modular validation system with structured errors |
| `@docscript/renderer-docx` | DOCX rendering (not yet implemented) |

## Quick Start

```ts
import { Document, Heading, Paragraph } from "@docscript/core";

const doc = Document(
  Heading("My Document"),
  Paragraph("Hello, world!")
);
```

## Development

### Prerequisites

- Node.js >= 18
- pnpm >= 9

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint
pnpm lint

# Type check
pnpm typecheck
```

### Project Structure

This is a pnpm monorepo. Each package in `packages/` is independently versioned and published.

## Roadmap

- [ ] DOCX renderer implementation
- [ ] Rich text support (bold, italic, links)
- [ ] Table cell content support
- [ ] Page layout configuration
- [ ] Style system
- [ ] Plugin API for custom renderers
- [ ] CLI tool for document generation
- [ ] VS Code extension

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
