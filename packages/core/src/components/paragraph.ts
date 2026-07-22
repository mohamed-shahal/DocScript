import type { ParagraphNode, DSNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

function isDSNode(value: unknown): value is DSNode {
  return typeof value === "object" && value !== null && "kind" in value;
}

function normalizeChildren(children: readonly DSNode[]): readonly DSNode[] {
  const result: DSNode[] = [];
  for (const child of children) {
    if (child.kind === "paragraph") {
      result.push(...child.children);
    } else {
      result.push(child);
    }
  }
  return Object.freeze(result);
}

export function Paragraph(...children: DSNode[]): ParagraphNode;
export function Paragraph(text: string): ParagraphNode;
export function Paragraph(props: { id?: string }, ...children: DSNode[]): ParagraphNode;
export function Paragraph(
  first: DSNode | string | { id?: string },
  ...rest: DSNode[]
): ParagraphNode {
  let props: { id?: string } = {};
  let rawChildren: DSNode[];

  if (typeof first === "string") {
    rawChildren = [
      { kind: "text", version: DS_NODE_VERSION, props: { value: first }, children: [] },
    ];
  } else if (isDSNode(first)) {
    rawChildren = [first, ...rest];
  } else {
    props = first;
    rawChildren = rest;
  }

  const children = normalizeChildren(rawChildren);

  const node: ParagraphNode = {
    kind: "paragraph",
    version: DS_NODE_VERSION,
    props,
    children,
  };
  return Object.freeze(node);
}
