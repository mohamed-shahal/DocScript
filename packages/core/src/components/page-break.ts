import type { PageBreakNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

export function PageBreak(): PageBreakNode {
  const node: PageBreakNode = {
    kind: "pageBreak",
    version: DS_NODE_VERSION,
    props: {},
    children: Object.freeze([]),
  };
  return Object.freeze(node);
}
