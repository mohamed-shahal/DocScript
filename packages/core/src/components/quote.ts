import type { QuoteNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

interface QuoteProps {
  text: string;
  attribution?: string;
  id?: string;
}

export function Quote(text: string, attribution?: string): QuoteNode;
export function Quote(props: QuoteProps): QuoteNode;
export function Quote(
  textOrProps: string | QuoteProps,
  attribution?: string,
): QuoteNode {
  if (typeof textOrProps === "string") {
    const node: QuoteNode = {
      kind: "quote",
      version: DS_NODE_VERSION,
      props: { text: textOrProps, ...(attribution !== undefined ? { attribution } : {}) },
      children: Object.freeze([]),
    };
    return Object.freeze(node);
  }

  const node: QuoteNode = {
    kind: "quote",
    version: DS_NODE_VERSION,
    props: { text: textOrProps.text, ...(textOrProps.attribution !== undefined ? { attribution: textOrProps.attribution } : {}), ...(textOrProps.id !== undefined ? { id: textOrProps.id } : {}) },
    children: Object.freeze([]),
  };
  return Object.freeze(node);
}
