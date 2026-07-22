import { describe, it, expect } from "vitest";
import {
  Document,
  Heading,
  Paragraph,
  Text,
  Image,
  Section,
  List,
  Item,
  Hyperlink,
  Quote,
  CodeBlock,
  Header,
  Footer,
  Divider,
  PageBreak,
} from "@docscript/core";
import { validate } from "@docscript/validator";

describe("validate", () => {
  it("returns valid for a correct document", () => {
    const doc = Document(
      Heading("Title"),
      Paragraph(Text("Body")),
    );
    const result = validate(doc);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  // --- document-must-be-root ---
  it("detects document not at root", () => {
    const innerDoc = Document(Paragraph(Text("inner")));
    const outer = Document(innerDoc);
    const result = validate(outer);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "document-must-be-root")).toBe(true);
  });

  // --- heading-requires-text ---
  it("detects heading without text", () => {
    const doc = Document(Heading(""));
    const result = validate(doc);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "heading-requires-text")).toBe(true);
  });

  // --- invalid-heading-level ---
  it("detects invalid heading level", () => {
    const doc = Document(
      Heading({ text: "X", level: 7 as unknown as 1 }),
    );
    const result = validate(doc);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "invalid-heading-level")).toBe(true);
  });

  it("accepts valid heading levels", () => {
    const doc = Document(
      Heading({ text: "A", level: 1 }),
      Heading({ text: "B", level: 6 }),
    );
    const result = validate(doc);
    expect(result.valid).toBe(true);
  });

  // --- paragraph-requires-children ---
  it("detects empty paragraph (no children)", () => {
    const doc = Document(
      { kind: "paragraph" as const, version: 2 as const, props: {}, children: [] },
    );
    const result = validate(doc);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "paragraph-requires-children")).toBe(true);
  });

  // --- text-requires-value ---
  it("detects text without value", () => {
    const doc = Document(
      Section(Paragraph(Text(""))),
    );
    const result = validate(doc);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "text-requires-value")).toBe(true);
  });

  // --- image-requires-src ---
  it("detects image without src", () => {
    const doc = Document(Image(""));
    const result = validate(doc);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "image-requires-src")).toBe(true);
  });

  // --- section-requires-children ---
  it("detects section without children", () => {
    const doc = Document(Section());
    const result = validate(doc);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "section-requires-children")).toBe(true);
  });

  // --- hyperlink-requires-url ---
  it("detects hyperlink without url", () => {
    const doc = Document(
      Section(Hyperlink("Click", "")),
    );
    const result = validate(doc);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "hyperlink-requires-url")).toBe(true);
  });

  // --- quote-requires-text ---
  it("detects quote without text", () => {
    const doc = Document(
      Section(Quote("")),
    );
    const result = validate(doc);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "quote-requires-text")).toBe(true);
  });

  // --- codeblock-requires-code ---
  it("detects codeblock without code", () => {
    const doc = Document(
      Section(CodeBlock("")),
    );
    const result = validate(doc);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "codeblock-requires-code")).toBe(true);
  });

  // --- list-requires-item-children ---
  it("detects list with non-item children", () => {
    const doc = Document(
      Section(List("bullet", Paragraph(Text("X")))),
    );
    const result = validate(doc);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "list-requires-item-children")).toBe(true);
  });

  // --- item-requires-children ---
  it("detects item without children", () => {
    const doc = Document(
      Section(List("bullet", { kind: "item" as const, version: 2 as const, props: {}, children: [] })),
    );
    const result = validate(doc);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "item-requires-children")).toBe(true);
  });

  // --- header/footer only under document ---
  it("detects header not under document", () => {
    const doc = Document(
      Section(Header(Paragraph(Text("X")))),
    );
    const result = validate(doc);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "header-only-under-document")).toBe(true);
  });

  it("detects footer not under document", () => {
    const doc = Document(
      Section(Footer(Paragraph(Text("X")))),
    );
    const result = validate(doc);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "footer-only-under-document")).toBe(true);
  });

  it("accepts header under document", () => {
    const doc = Document(
      Header(Paragraph(Text("Header"))),
      Heading("Title"),
    );
    const result = validate(doc);
    const headerErrors = result.errors.filter((e) => e.rule === "header-only-under-document");
    expect(headerErrors).toHaveLength(0);
  });

  it("accepts footer under document", () => {
    const doc = Document(
      Footer(Paragraph(Text("Footer"))),
      Heading("Title"),
    );
    const result = validate(doc);
    const footerErrors = result.errors.filter((e) => e.rule === "footer-only-under-document");
    expect(footerErrors).toHaveLength(0);
  });

  // --- illegal-parent-child ---
  it("detects illegal parent-child", () => {
    const doc = Document(
      Heading("Good"),
      Section(
        { kind: "document" as const, version: 2 as const, props: {}, children: [] },
      ),
    );
    const result = validate(doc);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.rule === "illegal-parent-child")).toBe(true);
  });

  // --- error paths ---
  it("returns correct error paths", () => {
    const doc = Document(
      Heading("Good"),
      Section(Paragraph(Text(""))),
    );
    const result = validate(doc);
    expect(result.valid).toBe(false);
    const textError = result.errors.find((e) => e.rule === "text-requires-value");
    expect(textError?.path).toBe("document.section.paragraph.text");
  });

  // --- valid complex document ---
  it("validates a complex document", () => {
    const doc = Document(
      Header(Paragraph(Text("My Doc"))),
      Heading("Resume"),
      Paragraph(Text("John Doe")),
      Divider(),
      Section(
        Heading("Education", 2),
        Paragraph(Text("CS Degree")),
      ),
      Section(
        Heading("Skills", 2),
        List("bullet",
          Item("React"),
          Item("TypeScript"),
        ),
      ),
      PageBreak(),
      Section(
        Heading("Projects", 2),
        List("numbered",
          Item(Paragraph(Text("DocScript"), Text(" - A document framework"))),
        ),
      ),
      Footer(Paragraph(Text("Page 1"))),
    );
    const result = validate(doc);
    expect(result.valid).toBe(true);
  });
});
