import type { CodeBlockNode } from "@docscript/types";
import { DS_NODE_VERSION } from "@docscript/types";

interface CodeBlockProps {
  code: string;
  language?: string;
  id?: string;
}

export function CodeBlock(code: string, language?: string): CodeBlockNode;
export function CodeBlock(props: CodeBlockProps): CodeBlockNode;
export function CodeBlock(
  codeOrProps: string | CodeBlockProps,
  language?: string,
): CodeBlockNode {
  if (typeof codeOrProps === "string") {
    const node: CodeBlockNode = {
      kind: "codeBlock",
      version: DS_NODE_VERSION,
      props: { code: codeOrProps, ...(language !== undefined ? { language } : {}) },
      children: Object.freeze([]),
    };
    return Object.freeze(node);
  }

  const node: CodeBlockNode = {
    kind: "codeBlock",
    version: DS_NODE_VERSION,
    props: { code: codeOrProps.code, ...(codeOrProps.language !== undefined ? { language: codeOrProps.language } : {}), ...(codeOrProps.id !== undefined ? { id: codeOrProps.id } : {}) },
    children: Object.freeze([]),
  };
  return Object.freeze(node);
}
