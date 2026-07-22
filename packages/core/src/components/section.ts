import type { SectionNode, DSNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

function isDSNode(value: unknown): value is DSNode {
  return typeof value === "object" && value !== null && "kind" in value;
}

export function Section(...children: DSNode[]): SectionNode;
export function Section(props: { id?: string }, ...children: DSNode[]): SectionNode;
export function Section(
  first: DSNode | { id?: string },
  ...rest: DSNode[]
): SectionNode {
  if (isDSNode(first)) {
    const node: SectionNode = {
      kind: "section",
      version: DS_NODE_VERSION,
      props: {},
      children: Object.freeze([first, ...rest]),
    };
    return Object.freeze(node);
  }

  const node: SectionNode = {
    kind: "section",
    version: DS_NODE_VERSION,
    props: { ...first },
    children: Object.freeze([...rest]),
  };
  return Object.freeze(node);
}
