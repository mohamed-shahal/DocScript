import type { ItemNode, DSNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

export function Item(...children: DSNode[]): ItemNode;
export function Item(text: string): ItemNode;
export function Item(props: { id?: string }, ...children: DSNode[]): ItemNode;
export function Item(
  first: DSNode | string | { id?: string },
  ...rest: DSNode[]
): ItemNode {
  let props: { id?: string } = {};
  let children: DSNode[];

  if (typeof first === "string") {
    children = [
      { kind: "text", version: DS_NODE_VERSION, props: { value: first }, children: [] },
    ];
  } else if (
    typeof first === "object" &&
    first !== null &&
    !Array.isArray(first) &&
    !("kind" in first)
  ) {
    props = first;
    children = rest;
  } else {
    children = [first as DSNode, ...rest];
  }

  const node: ItemNode = {
    kind: "item",
    version: DS_NODE_VERSION,
    props,
    children: Object.freeze([...children]),
  };
  return Object.freeze(node);
}
