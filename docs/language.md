# DocScript Language Specification

DocScript is a component-based language for describing document structure semantically.

## Philosophy

DocScript components describe **what** a document contains, not **how** it looks.

Components never include:
- Fonts
- Colors
- Margins
- Page sizes
- Spacing
- Alignment

Those belong to renderers.

## AST Format

Every node in a DocScript tree:

```ts
{
  kind: string,       // Component name
  version: 2,         // Schema version
  props: {},          // Component-specific properties
  children: []        // Child nodes (immutable)
}
```

All nodes are frozen with `Object.freeze`.

## Components

### Root

#### Document

The root node. Only one allowed per tree.

```ts
Document(
  Heading("Title"),
  Paragraph(Text("Content"))
)
```

---

### Layout

#### Section

Logical grouping of content.

```ts
Section(
  Heading("Education"),
  Paragraph(Text("Details here"))
)

// With id
Section({ id: "education" },
  Heading("Education")
)
```

#### Columns

Container for horizontal layout.

```ts
Columns(
  Paragraph(Text("Left column")),
  Paragraph(Text("Right column"))
)
```

#### Divider

Horizontal rule. No props, no children.

```ts
Divider()
```

#### PageBreak

Starts a new page. No props, no children.

```ts
PageBreak()
```

#### Header

Document header. Direct child of Document only.

```ts
Header(Paragraph(Text("My Document")))
```

#### Footer

Document footer. Direct child of Document only.

```ts
Footer(Paragraph(Text("Page 1")))
```

---

### Text

#### Heading

Section heading with level 1-6.

```ts
Heading("Experience")
Heading("Sub Heading", 2)
Heading({ text: "Deep", level: 3, id: "deep" })
```

#### Text

Raw text node. Leaf node. Will support rich text in future versions.

```ts
Text("Hello, world!")
```

#### Paragraph

Contains one or more Text nodes.

```ts
Paragraph("Hello")                        // shorthand → auto-wraps in Text
Paragraph(Text("Hello"), Text(" World"))  // explicit children
Paragraph({ id: "p1" }, Text("Hello"))    // with props
```

#### Hyperlink

External link. Leaf node.

```ts
Hyperlink("Click here", "https://example.com")
Hyperlink({ text: "GitHub", url: "https://github.com", id: "link1" })
```

#### Quote

Block quote with optional attribution.

```ts
Quote("Stay hungry. Stay foolish.", "Steve Jobs")
Quote({ text: "Hello" })
```

#### CodeBlock

Code listing with optional language.

```ts
CodeBlock("const x = 1;", "typescript")
CodeBlock({ code: "print('hello')", language: "python" })
```

---

### Lists

#### List

Container for list items.

```ts
List("bullet",
  Item("React"),
  Item("TypeScript"),
)

List("numbered",
  Item("First"),
  Item("Second"),
)

List({ type: "bullet", id: "skills" },
  Item("Node.js"),
)
```

#### Item

Single list item. Contains block nodes.

```ts
Item("Simple text")
Item(Text("Explicit"), Text(" text"))
Item(Paragraph(Text("Rich"), Text(" content")))
```

---

### Media

#### Image

Image reference. Leaf node.

```ts
Image("photo.png")
Image("photo.png", "A descriptive caption")
Image({ src: "photo.png", alt: "Caption", id: "img1" })
```

---

### Tables

#### Table

Table container.

```ts
Table(
  Paragraph(Text("Cell 1")),
  Paragraph(Text("Cell 2")),
)
```

---

## Dual Syntax

Every component supports both shorthand and object syntax:

| Component | Shorthand | Object |
|---|---|---|
| Document | `Document(...children)` | — |
| Section | `Section(...children)` | `Section({ id }, ...children)` |
| Heading | `Heading(text, level?)` | `Heading({ text, level?, id? })` |
| Paragraph | `Paragraph(text)` | `Paragraph({ id }, ...children)` |
| List | `List(type, ...children)` | `List({ type, id? }, ...children)` |
| Item | `Item(text)` | `Item({ id? }, ...children)` |
| Image | `Image(src, alt?)` | `Image({ src, alt?, id? })` |
| Columns | `Columns(...children)` | `Columns({ id }, ...children)` |
| Hyperlink | `Hyperlink(text, url)` | `Hyperlink({ text, url, id? })` |
| Quote | `Quote(text, attr?)` | `Quote({ text, attribution?, id? })` |
| CodeBlock | `CodeBlock(code, lang?)` | `CodeBlock({ code, language?, id? })` |

---

## Component Hierarchy

```
Document
├── Section
├── Heading
├── Paragraph
├── List
├── Table
├── Image
├── Divider
├── Columns
├── Quote
├── CodeBlock
├── Hyperlink
├── PageBreak
├── Header (Document only)
└── Footer (Document only)

Section
├── Heading, Paragraph, Text
├── List, Table, Image
├── Quote, CodeBlock, Hyperlink
├── Columns, Divider
└── PageBreak

Columns
├── Heading, Paragraph, Text
├── List, Table, Image
├── Quote, CodeBlock, Hyperlink

List
└── Item

Item
├── Text, Paragraph
├── Heading, List
├── Image, Quote, CodeBlock, Hyperlink

Paragraph
└── Text

Header / Footer
└── (any block node)
```

---

## Validation Rules

| Rule | Description |
|---|---|
| `document-must-be-root` | Document cannot be a child of another node |
| `heading-requires-text` | Heading must have non-empty text |
| `invalid-heading-level` | Heading level must be 1-6 |
| `paragraph-requires-children` | Paragraph must have at least one child |
| `image-requires-src` | Image must have non-empty src |
| `section-requires-children` | Section must have at least one child |
| `hyperlink-requires-url` | Hyperlink must have non-empty url |
| `quote-requires-text` | Quote must have non-empty text |
| `codeblock-requires-code` | CodeBlock must have non-empty code |
| `list-requires-item-children` | List children must be Item nodes |
| `text-requires-value` | Text must have non-empty value |
| `item-requires-children` | Item must have at least one child |
| `header-only-under-document` | Header must be direct child of Document |
| `footer-only-under-document` | Footer must be direct child of Document |
| `illegal-parent-child` | Child not allowed inside parent |

---

## Visitor API

Traverse the AST with typed handlers:

```ts
import { visit } from "@docscript/core";

const headings: string[] = [];

visit(document, {
  Heading(node) {
    headings.push(node.props.text);
  },
  Paragraph(node) {
    console.log("Found paragraph");
  },
  enter(node) {
    // Called before visiting node
  },
  leave(node) {
    // Called after visiting node and its children
  },
});
```

---

## Registry

Register custom components:

```ts
import { registry } from "@docscript/core";

registry.register("custom-component", factory, {
  kind: "custom-component",
  version: "0.1.0",
  description: "A custom component",
  props: [
    { name: "text", type: "string", required: true },
  ],
  allowedChildren: null, // any children allowed
});

// Query metadata
const meta = registry.getMeta("custom-component");
const allKinds = registry.kinds();
```
