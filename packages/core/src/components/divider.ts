import type { DividerNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

export function Divider(): DividerNode {
  const node: DividerNode = {
    kind: "divider",
    version: DS_NODE_VERSION,
    props: {},
    children: Object.freeze([]),
  };
  return Object.freeze(node);
}
