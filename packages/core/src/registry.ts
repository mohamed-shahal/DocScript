import type {
  ComponentFactory,
  ComponentMeta,
  ComponentRegistry,
  DSNodeKind,
} from "@docscript/types";

function createRegistry(): ComponentRegistry {
  const factories = new Map<string, ComponentFactory>();
  const metas = new Map<string, ComponentMeta>();

  return {
    register(
      kind: DSNodeKind | string,
      factory: ComponentFactory,
      meta?: ComponentMeta,
    ): void {
      if (factories.has(kind)) {
        throw new Error(`Component "${kind}" is already registered.`);
      }
      factories.set(kind, factory);
      if (meta) {
        metas.set(kind, meta);
      }
    },

    get(kind: DSNodeKind | string): ComponentFactory | undefined {
      return factories.get(kind);
    },

    has(kind: DSNodeKind | string): boolean {
      return factories.has(kind);
    },

    getMeta(kind: DSNodeKind | string): ComponentMeta | undefined {
      return metas.get(kind);
    },

    kinds(): readonly (DSNodeKind | string)[] {
      return [...factories.keys()];
    },
  };
}

export const registry: ComponentRegistry = createRegistry();
