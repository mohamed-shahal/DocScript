import type { ListNode, ListNodeType, DSNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

interface ListProps {
  type?: ListNodeType;
  id?: string;
}

export function List(type: ListNodeType, ...children: DSNode[]): ListNode;
export function List(props: ListProps, ...children: DSNode[]): ListNode;
export function List(
  typeOrProps: ListNodeType | ListProps,
  ...children: DSNode[]
): ListNode {
  if (typeof typeOrProps === "string") {
    const node: ListNode = {
      kind: "list",
      version: DS_NODE_VERSION,
      props: { type: typeOrProps },
      children: Object.freeze([...children]),
    };
    return Object.freeze(node);
  }

  const node: ListNode = {
    kind: "list",
    version: DS_NODE_VERSION,
    props: { type: typeOrProps.type ?? "bullet", ...(typeOrProps.id !== undefined ? { id: typeOrProps.id } : {}) },
    children: Object.freeze([...children]),
  };
  return Object.freeze(node);
}
