import type { ImageNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

export function Image(src: string, alt?: string): ImageNode {
  const props = alt !== undefined ? { src, alt } : { src };
  const node: ImageNode = {
    kind: "image",
    version: DS_NODE_VERSION,
    props,
    children: Object.freeze([]),
  };
  return Object.freeze(node);
}
