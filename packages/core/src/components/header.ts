import type { HeaderNode, DSNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

function isDSNode(value: unknown): value is DSNode {
  return typeof value === "object" && value !== null && "kind" in value;
}

export function Header(...children: DSNode[]): HeaderNode;
export function Header(props: { id?: string }, ...children: DSNode[]): HeaderNode;
export function Header(
  first: DSNode | { id?: string },
  ...rest: DSNode[]
): HeaderNode {
  if (isDSNode(first)) {
    const node: HeaderNode = {
      kind: "header",
      version: DS_NODE_VERSION,
      props: {},
      children: Object.freeze([first, ...rest]),
    };
    return Object.freeze(node);
  }

  const node: HeaderNode = {
    kind: "header",
    version: DS_NODE_VERSION,
    props: { ...first },
    children: Object.freeze([...rest]),
  };
  return Object.freeze(node);
}
