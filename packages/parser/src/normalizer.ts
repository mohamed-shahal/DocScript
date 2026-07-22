import type { DSNode } from "@docscript/types";

export function normalize(node: DSNode): DSNode {
  return Object.freeze({
    ...node,
    props: Object.freeze({ ...node.props }),
    children: Object.freeze(
      node.children.map((child) => normalize(child)),
    ),
  });
}
