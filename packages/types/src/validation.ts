import type { DSNode, DSNodeKind } from "./nodes.js";
import type { ComponentRegistry } from "./registry.js";

export interface ValidationError {
  readonly path: string;
  readonly kind: DSNodeKind;
  readonly rule: string;
  readonly message: string;
}

export interface ValidationRule {
  readonly name: string;
  readonly description: string;
  readonly validate: (
    node: DSNode,
    path: string,
    context: ValidationContext,
  ) => ValidationError[];
}

export interface ValidationContext {
  readonly parentKind?: DSNodeKind;
  readonly registry?: ComponentRegistry;
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: readonly ValidationError[];
}

export type AllowedChildren = readonly (DSNodeKind | string)[] | null;

export interface HierarchyMap {
  readonly [parentKind: string]: AllowedChildren;
}
