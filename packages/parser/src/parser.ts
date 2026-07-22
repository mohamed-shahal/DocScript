import type { DSNode } from "@docscript/types";
import { normalize } from "./normalizer.js";

export interface ParseResult {
  readonly node: DSNode;
  readonly normalized: boolean;
}

export function parse(node: DSNode): ParseResult {
  const normalized = normalize(node);

  return {
    node: normalized,
    normalized: normalized !== node,
  };
}
