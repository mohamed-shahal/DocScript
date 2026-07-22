import type {
  ComponentFactory,
  ComponentRegistry,
  DSNodeKind,
} from "@docscript/types";

function createRegistry(): ComponentRegistry {
  const factories = new Map<string, ComponentFactory>();

  return {
    register(kind: DSNodeKind | string, factory: ComponentFactory): void {
      if (factories.has(kind)) {
        throw new Error(`Component "${kind}" is already registered.`);
      }
      factories.set(kind, factory);
    },

    get(kind: DSNodeKind | string): ComponentFactory | undefined {
      return factories.get(kind);
    },

    has(kind: DSNodeKind | string): boolean {
      return factories.has(kind);
    },
  };
}

export const registry: ComponentRegistry = createRegistry();
