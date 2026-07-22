import type { DSNode, DSNodeKind } from "./nodes.js";

export type ComponentFactory = (
  ...args: unknown[]
) => DSNode;

export interface ComponentRegistry {
  readonly register: (kind: DSNodeKind | string, factory: ComponentFactory) => void;
  readonly get: (kind: DSNodeKind | string) => ComponentFactory | undefined;
  readonly has: (kind: DSNodeKind | string) => boolean;
}
