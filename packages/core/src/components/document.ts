import type { DocumentNode, DSNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

export function Document(...children: DSNode[]): DocumentNode {
  const node: DocumentNode = {
    kind: "document",
    version: DS_NODE_VERSION,
    props: {},
    children: Object.freeze([...children]),
  };
  return Object.freeze(node);
}
