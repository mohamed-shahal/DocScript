import { describe, it, expect } from "vitest";
import { Document, Heading, Paragraph, Text, Section } from "@docscript/core";
import { parse, normalize } from "@docscript/parser";

describe("normalize", () => {
  it("returns a frozen copy of the node", () => {
    const doc = Document(Heading("Test"));
    const normalized = normalize(doc);

    expect(Object.isFrozen(normalized)).toBe(true);
    expect(Object.isFrozen(normalized.children)).toBe(true);
  });

  it("normalizes nested nodes", () => {
    const doc = Document(
      Heading("Title"),
      Paragraph(Text("Body")),
    );
    const normalized = normalize(doc);

    expect(normalized.children).toHaveLength(2);
    for (const child of normalized.children) {
      expect(Object.isFrozen(child)).toBe(true);
    }
  });

  it("preserves node structure", () => {
    const doc = Document(Section(Heading("X")));
    const normalized = normalize(doc);

    expect(normalized.kind).toBe("document");
    expect(normalized.children[0].kind).toBe("section");
    expect(normalized.children[0].children[0].kind).toBe("heading");
  });
});

describe("parse", () => {
  it("returns a ParseResult with the node", () => {
    const doc = Document(Heading("Hello"));
    const result = parse(doc);

    expect(result.node.kind).toBe("document");
    expect(result.node.children).toHaveLength(1);
  });

  it("marks normalized flag correctly", () => {
    const doc = Document(Heading("Hello"));
    const result = parse(doc);

    expect(typeof result.normalized).toBe("boolean");
  });
});
