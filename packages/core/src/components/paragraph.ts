import type { ParagraphNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

export function Paragraph(text: string): ParagraphNode {
  const node: ParagraphNode = {
    kind: "paragraph",
    version: DS_NODE_VERSION,
    props: { text },
    children: Object.freeze([]),
  };
  return Object.freeze(node);
}
