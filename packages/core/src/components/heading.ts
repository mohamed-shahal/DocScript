import type { HeadingNode, HeadingLevel } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

export function Heading(text: string, level: HeadingLevel = 1): HeadingNode {
  const node: HeadingNode = {
    kind: "heading",
    version: DS_NODE_VERSION,
    props: { text, level },
    children: Object.freeze([]),
  };
  return Object.freeze(node);
}
