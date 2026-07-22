import { describe, it, expect } from "vitest";
import { registry } from "@docscript/core";
import { Paragraph } from "@docscript/core";

describe("registry", () => {
  it("registers and retrieves a component", () => {
    const factory = (...args: unknown[]) => Paragraph(String(args[0]));
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
});
