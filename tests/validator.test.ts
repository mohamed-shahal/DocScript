import { describe, it, expect } from "vitest";
import { Document, Heading, Paragraph, Image, Section } from "@docscript/core";
import { validate } from "@docscript/validator";
import type { ValidationRule } from "@docscript/validator";

describe("validate", () => {
  it("returns valid for a correct document", () => {
    const doc = Document(Heading("Title"), Paragraph("Body"));
    const result = validate(doc);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("detects document not at root", () => {
    const innerDoc = Document(Paragraph("inner"));
    const outer = Document(innerDoc);
    const result = validate(outer);

    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "document-must-be-root")).toBe(true);
  });

  it("detects heading without text", () => {
    const doc = Document(Heading(""));
    const result = validate(doc);

    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "heading-requires-text")).toBe(true);
  });

  it("detects paragraph without text", () => {
    const doc = Document(Paragraph(""));
    const result = validate(doc);

    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "paragraph-requires-text")).toBe(true);
  });

  it("detects image without src", () => {
    const doc = Document(Image(""));
    const result = validate(doc);

    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "image-requires-src")).toBe(true);
  });

  it("detects section without children", () => {
    const doc = Document(Section());
    const result = validate(doc);

    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "section-requires-children")).toBe(true);
  });

  it("returns correct error paths", () => {
    const doc = Document(
      Heading("Good"),
      Section(Paragraph("")),
    );
    const result = validate(doc);

    expect(result.valid).toBe(false);
    const paraError = result.errors.find((e) => e.rule === "paragraph-requires-text");
    expect(paraError?.path).toBe("document.section.paragraph");
  });

  it("accepts custom rules", () => {
    const customRule: ValidationRule = {
      name: "no-dividers",
      description: "No dividers allowed",
      validate: (node, path) => {
        if (node.kind !== "divider") return [];
        return [{ path, kind: node.kind, rule: "no-dividers", message: "No dividers" }];
      },
    };

    const doc = Document(
      Heading("Title"),
      { kind: "divider" as const, version: 1 as const, props: {}, children: [] },
    );
    const result = validate(doc, [customRule]);

    expect(result.valid).toBe(false);
    expect(result.errors[0].rule).toBe("no-dividers");
  });

  it("validates deeply nested nodes", () => {
    const doc = Document(
      Section(
        Heading("Deep"),
        Paragraph(""),
      ),
    );
    const result = validate(doc);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
