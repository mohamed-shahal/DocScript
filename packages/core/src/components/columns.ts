import type { ColumnsNode, DSNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

function isDSNode(value: unknown): value is DSNode {
  return typeof value === "object" && value !== null && "kind" in value;
}

export function Columns(...children: DSNode[]): ColumnsNode;
export function Columns(props: { id?: string }, ...children: DSNode[]): ColumnsNode;
export function Columns(
  first: DSNode | { id?: string },
  ...rest: DSNode[]
): ColumnsNode {
  if (isDSNode(first)) {
    const node: ColumnsNode = {
      kind: "columns",
      version: DS_NODE_VERSION,
      props: {},
      children: Object.freeze([first, ...rest]),
    };
    return Object.freeze(node);
  }

  const node: ColumnsNode = {
    kind: "columns",
    version: DS_NODE_VERSION,
    props: { ...first },
    children: Object.freeze([...rest]),
  };
  return Object.freeze(node);
}
