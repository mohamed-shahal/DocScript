import type { ListNode, ListNodeType, DSNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

export function List(type: ListNodeType, ...children: DSNode[]): ListNode {
  const node: ListNode = {
    kind: "list",
    version: DS_NODE_VERSION,
    props: { type },
    children: Object.freeze([...children]),
  };
  return Object.freeze(node);
}
