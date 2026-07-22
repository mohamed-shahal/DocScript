import type { SectionNode, DSNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

export function Section(...children: DSNode[]): SectionNode {
  const node: SectionNode = {
    kind: "section",
    version: DS_NODE_VERSION,
    props: {},
    children: Object.freeze([...children]),
  };
  return Object.freeze(node);
}
