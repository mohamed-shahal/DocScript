import type { AnyDSNode, DSNodeKind } from "./nodes.js";

export type VisitorHandler<T> = {
  readonly [K in DSNodeKind]?: (node: Extract<AnyDSNode, { kind: K }>) => T | void;
};

export interface Visitor<T = void> extends VisitorHandler<T> {
  readonly enter?: (node: AnyDSNode) => T | void;
  readonly leave?: (node: AnyDSNode) => T | void;
}
