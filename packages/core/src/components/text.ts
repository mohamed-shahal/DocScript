import type { TextNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

export function Text(value: string): TextNode {
  const node: TextNode = {
    kind: "text",
    version: DS_NODE_VERSION,
    props: { value },
    children: Object.freeze([]),
  };
  return Object.freeze(node);
}
