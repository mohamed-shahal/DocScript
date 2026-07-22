import type { DSNode, ValidationRule } from "@docscript/types";
import { hierarchy } from "./hierarchy.js";

export const documentMustBeRoot: ValidationRule = {
  name: "document-must-be-root",
  description: "Document node must not be a child of another node",
  validate(node: DSNode, path: string) {
    if (node.kind !== "document") return [];
    if (path === "document") return [];
    return [
      {
        path,
        kind: node.kind,
        rule: this.name,
        message: "Document node must be the root node.",
      },
    ];
  },
};

export const headingRequiresText: ValidationRule = {
  name: "heading-requires-text",
  description: "Heading node must have a text prop",
  validate(node: DSNode, path: string) {
    if (node.kind !== "heading") return [];
    const text = node.props["text"];
    if (typeof text === "string" && text.length > 0) return [];
    return [
      {
        path,
        kind: node.kind,
        rule: this.name,
        message: "Heading requires a non-empty text prop.",
      },
    ];
  },
};

export const invalidHeadingLevel: ValidationRule = {
  name: "invalid-heading-level",
  description: "Heading level must be between 1 and 6",
  validate(node: DSNode, path: string) {
    if (node.kind !== "heading") return [];
    const level = node.props["level"];
    if (typeof level === "number" && level >= 1 && level <= 6) return [];
    return [
      {
        path,
        kind: node.kind,
        rule: this.name,
        message: "Heading level must be between 1 and 6.",
      },
    ];
  },
};

export const paragraphRequiresChildren: ValidationRule = {
  name: "paragraph-requires-children",
  description: "Paragraph must have at least one child",
  validate(node: DSNode, path: string) {
    if (node.kind !== "paragraph") return [];
    if (node.children.length > 0) return [];
    return [
      {
        path,
        kind: node.kind,
        rule: this.name,
        message: "Paragraph requires at least one child node.",
      },
    ];
  },
};

export const imageRequiresSrc: ValidationRule = {
  name: "image-requires-src",
  description: "Image node must have a src prop",
  validate(node: DSNode, path: string) {
    if (node.kind !== "image") return [];
    const src = node.props["src"];
    if (typeof src === "string" && src.length > 0) return [];
    return [
      {
        path,
        kind: node.kind,
        rule: this.name,
        message: "Image requires a non-empty src prop.",
      },
    ];
  },
};

export const sectionRequiresChildren: ValidationRule = {
  name: "section-requires-children",
  description: "Section node must have at least one child",
  validate(node: DSNode, path: string) {
    if (node.kind !== "section") return [];
    if (node.children.length > 0) return [];
    return [
      {
        path,
        kind: node.kind,
        rule: this.name,
        message: "Section requires at least one child.",
      },
    ];
  },
};

export const hyperlinkRequiresUrl: ValidationRule = {
  name: "hyperlink-requires-url",
  description: "Hyperlink must have a non-empty url prop",
  validate(node: DSNode, path: string) {
    if (node.kind !== "hyperlink") return [];
    const url = node.props["url"];
    if (typeof url === "string" && url.length > 0) return [];
    return [
      {
        path,
        kind: node.kind,
        rule: this.name,
        message: "Hyperlink requires a non-empty url prop.",
      },
    ];
  },
};

export const quoteRequiresText: ValidationRule = {
  name: "quote-requires-text",
  description: "Quote must have a non-empty text prop",
  validate(node: DSNode, path: string) {
    if (node.kind !== "quote") return [];
    const text = node.props["text"];
    if (typeof text === "string" && text.length > 0) return [];
    return [
      {
        path,
        kind: node.kind,
        rule: this.name,
        message: "Quote requires a non-empty text prop.",
      },
    ];
  },
};

export const codeBlockRequiresCode: ValidationRule = {
  name: "codeblock-requires-code",
  description: "CodeBlock must have a non-empty code prop",
  validate(node: DSNode, path: string) {
    if (node.kind !== "codeBlock") return [];
    const code = node.props["code"];
    if (typeof code === "string" && code.length > 0) return [];
    return [
      {
        path,
        kind: node.kind,
        rule: this.name,
        message: "CodeBlock requires a non-empty code prop.",
      },
    ];
  },
};

export const listRequiresItemChildren: ValidationRule = {
  name: "list-requires-item-children",
  description: "List must have only Item children",
  validate(node: DSNode, path: string) {
    if (node.kind !== "list") return [];
    for (const child of node.children) {
      if (child.kind !== "item") {
        return [
          {
            path,
            kind: node.kind,
            rule: this.name,
            message: `List children must be Item nodes, found "${child.kind}".`,
          },
        ];
      }
    }
    return [];
  },
};

export const textRequiresValue: ValidationRule = {
  name: "text-requires-value",
  description: "Text node must have a non-empty value prop",
  validate(node: DSNode, path: string) {
    if (node.kind !== "text") return [];
    const value = node.props["value"];
    if (typeof value === "string" && value.length > 0) return [];
    return [
      {
        path,
        kind: node.kind,
        rule: this.name,
        message: "Text requires a non-empty value prop.",
      },
    ];
  },
};

export const itemRequiresChildren: ValidationRule = {
  name: "item-requires-children",
  description: "Item must have at least one child",
  validate(node: DSNode, path: string) {
    if (node.kind !== "item") return [];
    if (node.children.length > 0) return [];
    return [
      {
        path,
        kind: node.kind,
        rule: this.name,
        message: "Item requires at least one child node.",
      },
    ];
  },
};

export const headerOnlyUnderDocument: ValidationRule = {
  name: "header-only-under-document",
  description: "Header must be a direct child of Document",
  validate(_node: DSNode, _path: string, context) {
    if (_node.kind !== "header") return [];
    if (context.parentKind === "document") return [];
    return [
      {
        path: _path,
        kind: _node.kind,
        rule: this.name,
        message: "Header must be a direct child of Document.",
      },
    ];
  },
};

export const footerOnlyUnderDocument: ValidationRule = {
  name: "footer-only-under-document",
  description: "Footer must be a direct child of Document",
  validate(_node: DSNode, _path: string, context) {
    if (_node.kind !== "footer") return [];
    if (context.parentKind === "document") return [];
    return [
      {
        path: _path,
        kind: _node.kind,
        rule: this.name,
        message: "Footer must be a direct child of Document.",
      },
    ];
  },
};

export const illegalParentChild: ValidationRule = {
  name: "illegal-parent-child",
  description: "Child is not allowed inside this parent",
  validate(node: DSNode, path: string, context) {
    if (!context.parentKind) return [];
    const allowed = hierarchy[context.parentKind];
    if (allowed === undefined) return [];
    if (allowed === null) return [];
    if (allowed.includes(node.kind)) return [];
    return [
      {
        path,
        kind: node.kind,
        rule: this.name,
        message: `"${node.kind}" is not allowed inside "${context.parentKind}".`,
      },
    ];
  },
};

export const defaultRules: readonly ValidationRule[] = [
  documentMustBeRoot,
  headingRequiresText,
  invalidHeadingLevel,
  paragraphRequiresChildren,
  imageRequiresSrc,
  sectionRequiresChildren,
  hyperlinkRequiresUrl,
  quoteRequiresText,
  codeBlockRequiresCode,
  listRequiresItemChildren,
  textRequiresValue,
  itemRequiresChildren,
  headerOnlyUnderDocument,
  footerOnlyUnderDocument,
  illegalParentChild,
];
