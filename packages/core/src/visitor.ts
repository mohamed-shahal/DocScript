import type { AnyDSNode, Visitor } from "@docscript/types";

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function visit<T = void>(node: AnyDSNode, handler: Visitor<T>): void {
  handler.enter?.(node);

  const kindKey = capitalize(node.kind) as keyof Visitor<T>;
  const kindHandler = handler[kindKey] as ((n: AnyDSNode) => T | void) | undefined;
  kindHandler?.(node);

  for (const child of node.children) {
    visit(child as AnyDSNode, handler);
  }

  handler.leave?.(node);
}
