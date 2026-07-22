import type {
  DSNode,
  ValidationError,
  ValidationContext,
  ValidationRule,
  ValidationResult,
} from "@docscript/types";
import { defaultRules } from "./rules.js";

function collectErrors(
  node: DSNode,
  path: string,
  rules: readonly ValidationRule[],
  parentKind?: DSNode["kind"],
): ValidationError[] {
  const errors: ValidationError[] = [];
  const currentPath = path ? `${path}.${node.kind}` : node.kind;
  const context: ValidationContext = parentKind !== undefined ? { parentKind } : {};

  for (const rule of rules) {
    errors.push(...rule.validate(node, currentPath, context));
  }

  for (const child of node.children) {
    errors.push(...collectErrors(child, currentPath, rules, node.kind));
  }

  return errors;
}

export function validate(node: DSNode, rules?: readonly ValidationRule[]): ValidationResult {
  const appliedRules = rules ?? defaultRules;
  const errors = collectErrors(node, "", appliedRules);

  return {
    valid: errors.length === 0,
    errors: Object.freeze(errors),
  };
}
