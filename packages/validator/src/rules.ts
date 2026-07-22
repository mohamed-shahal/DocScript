import type { DSNode, ValidationRule } from "@docscript/types";

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

export const paragraphRequiresText: ValidationRule = {
  name: "paragraph-requires-text",
  description: "Paragraph node must have a text prop",
  validate(node: DSNode, path: string) {
    if (node.kind !== "paragraph") return [];
    const text = node.props["text"];
    if (typeof text === "string" && text.length > 0) return [];
    return [
      {
        path,
        kind: node.kind,
        rule: this.name,
        message: "Paragraph requires a non-empty text prop.",
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

export const defaultRules: readonly ValidationRule[] = [
  documentMustBeRoot,
  headingRequiresText,
  paragraphRequiresText,
  imageRequiresSrc,
  sectionRequiresChildren,
];
