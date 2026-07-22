import type { HyperlinkNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

interface HyperlinkProps {
  text: string;
  url: string;
  id?: string;
}

export function Hyperlink(text: string, url: string): HyperlinkNode;
export function Hyperlink(props: HyperlinkProps): HyperlinkNode;
export function Hyperlink(
  textOrProps: string | HyperlinkProps,
  url?: string,
): HyperlinkNode {
  const props =
    typeof textOrProps === "string"
      ? { text: textOrProps, url: url ?? "" }
      : textOrProps;

  const node: HyperlinkNode = {
    kind: "hyperlink",
    version: DS_NODE_VERSION,
    props,
    children: Object.freeze([]),
  };
  return Object.freeze(node);
}
