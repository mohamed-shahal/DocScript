import type { ColumnsNode, DSNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

export function Columns(...children: DSNode[]): ColumnsNode {
  const node: ColumnsNode = {
    kind: "columns",
    version: DS_NODE_VERSION,
    props: {},
    children: Object.freeze([...children]),
  };
  return Object.freeze(node);
}
