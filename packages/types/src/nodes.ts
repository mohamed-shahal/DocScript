export const DS_NODE_VERSION = 1 as const;

export type DSNodeKind =
  | "document"
  | "section"
  | "heading"
  | "paragraph"
  | "list"
  | "table"
  | "image"
  | "divider"
  | "columns";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type ListNodeType = "bullet" | "numbered";

export interface DSNode {
  readonly kind: DSNodeKind;
  readonly version: typeof DS_NODE_VERSION;
  readonly props: Record<string, unknown>;
  readonly children: readonly DSNode[];
}

export interface DocumentNode extends DSNode {
  readonly kind: "document";
}

export interface SectionNode extends DSNode {
  readonly kind: "section";
}

export interface HeadingNode extends DSNode {
  readonly kind: "heading";
  readonly props: {
    readonly text: string;
    readonly level: HeadingLevel;
  };
}

export interface ParagraphNode extends DSNode {
  readonly kind: "paragraph";
  readonly props: {
    readonly text: string;
  };
}

export interface ListNode extends DSNode {
  readonly kind: "list";
  readonly props: {
    readonly type: ListNodeType;
  };
}

export interface TableNode extends DSNode {
  readonly kind: "table";
}

export interface ImageNode extends DSNode {
  readonly kind: "image";
  readonly props: {
    readonly src: string;
    readonly alt?: string;
  };
}

export interface DividerNode extends DSNode {
  readonly kind: "divider";
}

export interface ColumnsNode extends DSNode {
  readonly kind: "columns";
}

export type AnyDSNode =
  | DocumentNode
  | SectionNode
  | HeadingNode
  | ParagraphNode
  | ListNode
  | TableNode
  | ImageNode
  | DividerNode
  | ColumnsNode;
