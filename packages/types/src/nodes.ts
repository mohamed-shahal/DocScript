export const DS_NODE_VERSION = 2 as const;

export type DSNodeKind =
  | "document"
  | "section"
  | "heading"
  | "text"
  | "paragraph"
  | "list"
  | "item"
  | "table"
  | "image"
  | "divider"
  | "columns"
  | "pageBreak"
  | "header"
  | "footer"
  | "hyperlink"
  | "quote"
  | "codeBlock";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type ListNodeType = "bullet" | "numbered";

export interface DSNode {
  readonly kind: DSNodeKind;
  readonly version: typeof DS_NODE_VERSION;
  readonly props: Record<string, unknown>;
  readonly children: readonly DSNode[];
}

// --- Layout nodes ---

export interface DocumentNode extends DSNode {
  readonly kind: "document";
  readonly props: Record<string, never>;
}

export interface SectionNode extends DSNode {
  readonly kind: "section";
  readonly props: { readonly id?: string };
}

export interface ColumnsNode extends DSNode {
  readonly kind: "columns";
  readonly props: { readonly id?: string };
}

export interface DividerNode extends DSNode {
  readonly kind: "divider";
  readonly props: Record<string, never>;
}

export interface PageBreakNode extends DSNode {
  readonly kind: "pageBreak";
  readonly props: Record<string, never>;
}

export interface HeaderNode extends DSNode {
  readonly kind: "header";
  readonly props: { readonly id?: string };
}

export interface FooterNode extends DSNode {
  readonly kind: "footer";
  readonly props: { readonly id?: string };
}

// --- Text nodes ---

export interface HeadingNode extends DSNode {
  readonly kind: "heading";
  readonly props: {
    readonly text: string;
    readonly level: HeadingLevel;
    readonly id?: string;
  };
}

export interface TextNode extends DSNode {
  readonly kind: "text";
  readonly props: {
    readonly value: string;
  };
}

export interface ParagraphNode extends DSNode {
  readonly kind: "paragraph";
  readonly props: { readonly id?: string };
}

export interface ListNode extends DSNode {
  readonly kind: "list";
  readonly props: {
    readonly type: ListNodeType;
    readonly id?: string;
  };
}

export interface ItemNode extends DSNode {
  readonly kind: "item";
  readonly props: { readonly id?: string };
}

export interface TableNode extends DSNode {
  readonly kind: "table";
  readonly props: { readonly id?: string };
}

export interface ImageNode extends DSNode {
  readonly kind: "image";
  readonly props: {
    readonly src: string;
    readonly alt?: string;
    readonly id?: string;
  };
}

export interface HyperlinkNode extends DSNode {
  readonly kind: "hyperlink";
  readonly props: {
    readonly text: string;
    readonly url: string;
    readonly id?: string;
  };
}

export interface QuoteNode extends DSNode {
  readonly kind: "quote";
  readonly props: {
    readonly text: string;
    readonly attribution?: string;
    readonly id?: string;
  };
}

export interface CodeBlockNode extends DSNode {
  readonly kind: "codeBlock";
  readonly props: {
    readonly code: string;
    readonly language?: string;
    readonly id?: string;
  };
}

export type AnyDSNode =
  | DocumentNode
  | SectionNode
  | HeadingNode
  | TextNode
  | ParagraphNode
  | ListNode
  | ItemNode
  | TableNode
  | ImageNode
  | DividerNode
  | ColumnsNode
  | PageBreakNode
  | HeaderNode
  | FooterNode
  | HyperlinkNode
  | QuoteNode
  | CodeBlockNode;
