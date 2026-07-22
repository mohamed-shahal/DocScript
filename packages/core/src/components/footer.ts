import type { FooterNode, DSNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

function isDSNode(value: unknown): value is DSNode {
  return typeof value === "object" && value !== null && "kind" in value;
}

export function Footer(...children: DSNode[]): FooterNode;
export function Footer(props: { id?: string }, ...children: DSNode[]): FooterNode;
export function Footer(
  first: DSNode | { id?: string },
  ...rest: DSNode[]
): FooterNode {
  if (isDSNode(first)) {
    const node: FooterNode = {
      kind: "footer",
      version: DS_NODE_VERSION,
      props: {},
      children: Object.freeze([first, ...rest]),
    };
    return Object.freeze(node);
  }

  const node: FooterNode = {
    kind: "footer",
    version: DS_NODE_VERSION,
    props: { ...first },
    children: Object.freeze([...rest]),
  };
  return Object.freeze(node);
}
