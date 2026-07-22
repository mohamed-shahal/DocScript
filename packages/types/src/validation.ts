import type { DSNode, DSNodeKind } from "./nodes.js";

export interface ValidationError {
  readonly path: string;
  readonly kind: DSNodeKind;
  readonly rule: string;
  readonly message: string;
}

export interface ValidationRule {
  readonly name: string;
  readonly description: string;
  readonly validate: (node: DSNode, path: string) => ValidationError[];
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: readonly ValidationError[];
}
