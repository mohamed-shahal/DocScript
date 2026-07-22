import { describe, it, expect } from "vitest";
import { registry, Paragraph, Text } from "@docscript/core";

describe("registry", () => {
  it("registers and retrieves a component", () => {
    const factory = (...args: unknown[]) =>
      Paragraph(...[Text(String(args[0]))]);
    registry.register("custom-component", factory);

    expect(registry.has("custom-component")).toBe(true);
    expect(registry.get("custom-component")).toBe(factory);
  });

  it("returns undefined for unregistered components", () => {
    expect(registry.has("nonexistent")).toBe(false);
    expect(registry.get("nonexistent")).toBeUndefined();
  });

  it("throws when registering a duplicate component", () => {
    const factory = (...args: unknown[]) => Paragraph(String(args[0]));
    registry.register("duplicate-test", factory);

    expect(() => registry.register("duplicate-test", factory)).toThrow(
      'Component "duplicate-test" is already registered.',
    );
  });

  it("stores and retrieves metadata", () => {
    const factory = (...args: unknown[]) => Paragraph(String(args[0]));
    const meta = {
      kind: "test-meta" as const,
      version: "0.1.0",
      description: "Test component",
      props: [{ name: "text", type: "string" as const, required: true }],
      allowedChildren: null,
    };
    registry.register("test-meta", factory, meta);

    const retrieved = registry.getMeta("test-meta");
    expect(retrieved).toBeDefined();
    expect(retrieved?.description).toBe("Test component");
    expect(retrieved?.props).toHaveLength(1);
  });

  it("returns undefined meta for unknown component", () => {
    expect(registry.getMeta("unknown")).toBeUndefined();
  });

  it("returns all registered kinds", () => {
    const kinds = registry.kinds();
    expect(Array.isArray(kinds)).toBe(true);
    expect(kinds.length).toBeGreaterThan(0);
  });
});
