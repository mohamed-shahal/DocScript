import type { HeadingNode, HeadingLevel } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

interface HeadingProps {
  text: string;
  level?: HeadingLevel;
  id?: string;
}

export function Heading(text: string, level?: HeadingLevel): HeadingNode;
export function Heading(props: HeadingProps): HeadingNode;
export function Heading(
  textOrProps: string | HeadingProps,
  level?: HeadingLevel,
): HeadingNode {
  if (typeof textOrProps === "string") {
    const node: HeadingNode = {
      kind: "heading",
      version: DS_NODE_VERSION,
      props: { text: textOrProps, level: level ?? 1 },
      children: Object.freeze([]),
    };
    return Object.freeze(node);
  }

  const node: HeadingNode = {
    kind: "heading",
    version: DS_NODE_VERSION,
    props: { text: textOrProps.text, level: textOrProps.level ?? 1, ...(textOrProps.id !== undefined ? { id: textOrProps.id } : {}) },
    children: Object.freeze([]),
  };
  return Object.freeze(node);
}
