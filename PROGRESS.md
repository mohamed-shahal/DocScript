# DocScript — Project Progress

## v0.2 — Language Layer ✅

**Date:** Completed
**Status:** Done, pushed to GitHub

### What was done

#### 17 Components (all with dual syntax)

| Component | Shorthand | Object | Kind |
|---|---|---|---|
| Document | `Document(...children)` | — | `document` |
| Section | `Section(...children)` | `Section({ id? }, ...children)` | `section` |
| Heading | `Heading(text, level?)` | `Heading({ text, level?, id? })` | `heading` |
| Text | `Text(value)` | — | `text` |
| Paragraph | `Paragraph(text)` | `Paragraph({ id? }, ...children)` | `paragraph` |
| List | `List(type, ...children)` | `List({ type?, id? }, ...children)` | `list` |
| Item | `Item(text)` | `Item({ id? }, ...children)` | `item` |
| Table | `Table(...children)` | `Table({ id? }, ...children)` | `table` |
| Image | `Image(src, alt?)` | `Image({ src, alt?, id? })` | `image` |
| Divider | `Divider()` | — | `divider` |
| Columns | `Columns(...children)` | `Columns({ id? }, ...children)` | `columns` |
| PageBreak | `PageBreak()` | — | `pageBreak` |
| Header | `Header(...children)` | `Header({ id? }, ...children)` | `header` |
| Footer | `Footer(...children)` | `Footer({ id? }, ...children)` | `footer` |
| Hyperlink | `Hyperlink(text, url)` | `Hyperlink({ text, url, id? })` | `hyperlink` |
| Quote | `Quote(text, attr?)` | `Quote({ text, attribution?, id? })` | `quote` |
| CodeBlock | `CodeBlock(code, lang?)` | `CodeBlock({ code, language?, id? })` | `codeBlock` |

#### Visitor API

```ts
visit(document, {
  Heading(node) { /* typed */ },
  Paragraph(node) { /* typed */ },
  enter(node) { /* before */ },
  leave(node) { /* after */ },
});
```

Depth-first traversal with kind-specific handlers and enter/leave hooks.

#### Enhanced Registry

- `register(kind, factory, meta?)` — with ComponentMeta
- `getMeta(kind)` — retrieve component metadata
- `kinds()` — list all registered kinds
- ComponentMeta includes: kind, version, description, props spec, allowed children

#### 15 Validation Rules

| Rule | Description |
|---|---|
| document-must-be-root | Document cannot be child |
| heading-requires-text | Non-empty text required |
| invalid-heading-level | Level must be 1-6 |
| paragraph-requires-children | Must have children |
| image-requires-src | Non-empty src required |
| section-requires-children | Must have children |
| hyperlink-requires-url | Non-empty url required |
| quote-requires-text | Non-empty text required |
| codeblock-requires-code | Non-empty code required |
| list-requires-item-children | Children must be Items |
| text-requires-value | Non-empty value required |
| item-requires-children | Must have children |
| header-only-under-document | Document direct child only |
| footer-only-under-document | Document direct child only |
| illegal-parent-child | Hierarchy enforcement |

#### AST Specification

Version bumped to 2. All nodes frozen. Documented hierarchy matrix.

#### Tests: 97 passing

- `tests/components.test.ts` — 58 tests (all 17 components, both syntaxes)
- `tests/visitor.test.ts` — 7 tests (handlers, enter/leave, depth-first)
- `tests/validator.test.ts` — 21 tests (all rules, paths, complex doc)
- `tests/registry.test.ts` — 6 tests (register, meta, kinds)
- `tests/parser.test.ts` — 5 tests (normalize, parse)

#### Documentation

- `docs/language.md` — Full language specification

#### Examples

- `examples/resume.ts` — Complete resume using only generic components

---

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

### Packages

- `@docscript/types` — DSNode, node types, validation types, registry types
- `@docscript/core` — Component factories, registry, visitor
- `@docscript/validator` — 15 validation rules, hierarchy enforcement
- `@docscript/parser` — Normalization, parsing
- `@docscript/renderer-docx` — Placeholder

### Tooling

- TypeScript 5.5+ (strict, ESM, project references)
- pnpm 9 workspaces
- ESLint 9 + typescript-eslint
- Prettier
- Vitest
- Changesets
- GitHub Actions CI (Node 18/20/22)
- EditorConfig
- MIT License

---

## Future Roadmap

- [ ] v0.3 — DOCX Renderer Implementation
- [ ] v0.4 — Rich Text Support (bold, italic, links)
- [ ] v0.5 — Table Cell Content
- [ ] v0.6 — Page Layout Configuration
- [ ] v0.7 — Style System
- [ ] v0.8 — Plugin API
- [ ] v0.9 — CLI Tool
- [ ] v1.0 — Stable Release
- [ ] VS Code Extension
