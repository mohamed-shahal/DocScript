# DocScript — Project Progress

## v0.1 — Base Project Setup ✅

**Date:** Completed
**Status:** Done, pushed to GitHub

### Monorepo Structure

```
docscript/
├── packages/
│   ├── types/           @docscript/types
│   ├── core/            @docscript/core
│   ├── parser/          @docscript/parser
│   ├── validator/       @docscript/validator
│   └── renderer-docx/   @docscript/renderer-docx
├── examples/
├── tests/
├── docs/
└── .github/workflows/
```

### @docscript/types

- `DSNode` base interface (kind, version, props, children)
- 9 node types: Document, Section, Heading, Paragraph, List, Table, Image, Divider, Columns
- `DS_NODE_VERSION = 1`
- `DSNodeKind` union type
- `HeadingLevel`, `ListNodeType` aliases
- `ValidationError`, `ValidationRule`, `ValidationResult` types
- `ComponentFactory`, `ComponentRegistry` types

### @docscript/core

- 9 component factory functions (all pure, all frozen/immutable):
  - `Document(...children)`
  - `Section(...children)`
  - `Heading(text, level?)`
  - `Paragraph(text)`
  - `List(type, ...children)`
  - `Table(...children)`
  - `Image(src, alt?)`
  - `Divider()`
  - `Columns(...children)`
- Component registry (Map-based, register/get/has)

### @docscript/validator

- 5 validation rules:
  - `document-must-be-root`
  - `heading-requires-text`
  - `paragraph-requires-text`
  - `image-requires-src`
  - `section-requires-children`
- Recursive tree traversal with path tracking
- Custom rule support

### @docscript/parser

- `normalize()` — deep-freezes node tree
- `parse()` — returns ParseResult with normalized flag

### @docscript/renderer-docx

- Placeholder only, `render()` throws "Renderer not implemented."

### Tooling

- TypeScript 5.5+ (strict, ESM, project references)
- pnpm 9 workspaces
- ESLint 9 + typescript-eslint
- Prettier
- Vitest (32 tests passing)
- Changesets
- GitHub Actions CI (Node 18/20/22 matrix)
- EditorConfig
- .gitignore
- MIT License

### Tests (32 passing)

- `tests/components.test.ts` — 16 tests for all 9 components
- `tests/registry.test.ts` — 3 tests (register, get, duplicate)
- `tests/validator.test.ts` — 9 tests (valid doc, errors, paths, custom rules)
- `tests/parser.test.ts` — 4 tests (normalize, parse)

### Examples

- `examples/basic.ts` — demonstrates all components

### GitHub

- Repository: https://github.com/mohamed-shahal/DocScript
- Branch: main
- License: MIT

---

## v0.2 — Language Design & Component Specification 📋

**Date:** Planned, not started
**Status:** Plan designed, awaiting implementation

### Planned Changes

#### New Components (17)

**Professional/Resume:**
- Profile (name, title, summary, email, phone, url, location)
- Experience (company, role, startDate, endDate, summary, highlights)
- Education (institution, area, studyType, startDate, endDate)
- Skills (name, level, keywords)
- Projects (name, description, url, highlights, keywords)
- Certification (name, date, issuer, url)
- Languages (language, fluency)
- Award (title, date, awarder, summary)
- Reference (name, relationship, email, phone, summary)

**Content:**
- Quote (text, attribution)
- CodeBlock (code, language)
- Hyperlink (text, url)
- PageBreak
- Header (text)
- Footer (text)
- Metadata (key-value pairs)

#### Dual-Syntax API

Every component supports both shorthand and object syntax:
```ts
Heading("Experience")
Heading({ text: "Experience", id: "exp", level: 2 })
```

#### Visitor Pattern

```ts
visit(document, {
  Heading(node) { ... },
  Paragraph(node) { ... }
});
```

#### Error System

- DocScriptError (base)
- ValidationError
- ParserError
- RegistryError

#### Enhanced Registry

- ComponentMeta (kind, version, description, props spec, allowed children)
- getMeta(), kinds() methods

#### Component Hierarchy Rules

- Document → any (root only)
- Section → content + professional components
- Columns → block-level only
- List → Paragraph only
- Leaf nodes: Heading, Paragraph, Image, Quote, CodeBlock, Hyperlink

#### Enhanced Validation (15+ rules)

- Unknown component kinds
- Unknown props
- Missing required props
- Illegal parent-child
- Singleton violations (Metadata)
- Per-component required props

#### Documentation

- `docs/specification.md` — full language spec
- TSDoc on all public APIs
- 4 examples: resume, report, invoice, cover letter

### Files to Modify/Create

| Package | Modified | Created |
|---|---|---|
| @docscript/types | 4 files | 2 (errors.ts, visitor.ts) |
| @docscript/core | 11 files | 19 (17 components + visitor + registry) |
| @docscript/validator | 3 files | 1 (hierarchy.ts) |
| tests/ | 2 files | 4 new test files |
| examples/ | 0 | 4 new examples |
| docs/ | 0 | 1 (specification.md) |

---

## Future Roadmap

- [ ] v0.2 — Language Design & Component Specification
- [ ] v0.3 — DOCX Renderer Implementation
- [ ] v0.4 — Rich Text Support (bold, italic, links)
- [ ] v0.5 — Table Cell Content
- [ ] v0.6 — Page Layout Configuration
- [ ] v0.7 — Style System
- [ ] v0.8 — Plugin API
- [ ] v0.9 — CLI Tool
- [ ] v1.0 — Stable Release
- [ ] VS Code Extension
