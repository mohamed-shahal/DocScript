import type { DSNode, ValidationError, ValidationRule, ValidationResult } from "@docscript/types";
import { defaultRules } from "./rules.js";

function collectErrors(
  node: DSNode,
  path: string,
  rules: readonly ValidationRule[],
): ValidationError[] {
  const errors: ValidationError[] = [];
  const currentPath = path ? `${path}.${node.kind}` : node.kind;

  for (const rule of rules) {
    errors.push(...rule.validate(node, currentPath));
  }

  for (const child of node.children) {
    errors.push(...collectErrors(child, currentPath, rules));
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
