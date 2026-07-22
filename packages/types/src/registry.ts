import type { DSNode, DSNodeKind } from "./nodes.js";

export type ComponentFactory = (...args: unknown[]) => DSNode;

export interface PropSpec {
  readonly name: string;
  readonly type: "string" | "number" | "boolean" | "array" | "object";
  readonly required: boolean;
  readonly description?: string;
  readonly default?: unknown;
}

export interface ComponentMeta {
  readonly kind: DSNodeKind | string;
  readonly version: string;
  readonly description: string;
  readonly props: readonly PropSpec[];
  readonly allowedChildren: readonly (DSNodeKind | string)[] | null;
}

export interface ComponentRegistry {
  readonly register: (
    kind: DSNodeKind | string,
    factory: ComponentFactory,
    meta?: ComponentMeta,
  ) => void;
  readonly get: (kind: DSNodeKind | string) => ComponentFactory | undefined;
  readonly has: (kind: DSNodeKind | string) => boolean;
  readonly getMeta: (kind: DSNodeKind | string) => ComponentMeta | undefined;
  readonly kinds: () => readonly (DSNodeKind | string)[];
}
