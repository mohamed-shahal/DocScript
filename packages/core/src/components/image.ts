import type { ImageNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

interface ImageProps {
  src: string;
  alt?: string;
  id?: string;
}

export function Image(src: string, alt?: string): ImageNode;
export function Image(props: ImageProps): ImageNode;
export function Image(srcOrProps: string | ImageProps, alt?: string): ImageNode {
  const props =
    typeof srcOrProps === "string"
      ? alt !== undefined
        ? { src: srcOrProps, alt }
        : { src: srcOrProps }
      : srcOrProps;

  const node: ImageNode = {
    kind: "image",
    version: DS_NODE_VERSION,
    props,
    children: Object.freeze([]),
  };
  return Object.freeze(node);
}
