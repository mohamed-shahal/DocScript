import type { TableNode, DSNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

export function Table(...children: DSNode[]): TableNode {
  const node: TableNode = {
    kind: "table",
    version: DS_NODE_VERSION,
    props: {},
    children: Object.freeze([...children]),
  };
  return Object.freeze(node);
}
