import { describe, it, expect } from "vitest";
import {
  Document,
  Section,
  Heading,
  Paragraph,
  List,
  Table,
  Image,
  Divider,
  Columns,
} from "@docscript/core";

describe("Document", () => {
  it("creates a document node with children", () => {
    const heading = Heading("Hello");
    const para = Paragraph("World");
    const doc = Document(heading, para);

    expect(doc.kind).toBe("document");
    expect(doc.version).toBe(1);
    expect(doc.children).toHaveLength(2);
    expect(doc.children[0]).toBe(heading);
    expect(doc.children[1]).toBe(para);
  });

  it("creates an empty document", () => {
    const doc = Document();
    expect(doc.children).toHaveLength(0);
  });

  it("returns a frozen object", () => {
    const doc = Document();
    expect(Object.isFrozen(doc)).toBe(true);
    expect(Object.isFrozen(doc.children)).toBe(true);
  });
});

describe("Heading", () => {
  it("creates a heading with text and default level 1", () => {
    const h = Heading("Title");
    expect(h.kind).toBe("heading");
    expect(h.props.text).toBe("Title");
    expect(h.props.level).toBe(1);
    expect(h.children).toHaveLength(0);
  });

  it("creates a heading with custom level", () => {
    const h = Heading("Sub", 3);
    expect(h.props.level).toBe(3);
  });

  it("returns a frozen object", () => {
    const h = Heading("Test");
    expect(Object.isFrozen(h)).toBe(true);
  });
});

describe("Paragraph", () => {
  it("creates a paragraph with text", () => {
    const p = Paragraph("Hello");
    expect(p.kind).toBe("paragraph");
    expect(p.props.text).toBe("Hello");
    expect(p.children).toHaveLength(0);
  });

  it("returns a frozen object", () => {
    const p = Paragraph("Test");
    expect(Object.isFrozen(p)).toBe(true);
  });
});

describe("Section", () => {
  it("creates a section with children", () => {
    const s = Section(Heading("A"), Paragraph("B"));
    expect(s.kind).toBe("section");
    expect(s.children).toHaveLength(2);
  });
});

describe("List", () => {
  it("creates a bullet list", () => {
    const l = List("bullet", Paragraph("Item 1"), Paragraph("Item 2"));
    expect(l.kind).toBe("list");
    expect(l.props.type).toBe("bullet");
    expect(l.children).toHaveLength(2);
  });

  it("creates a numbered list", () => {
    const l = List("numbered", Paragraph("First"));
    expect(l.props.type).toBe("numbered");
  });
});

describe("Table", () => {
  it("creates a table node", () => {
    const t = Table(Paragraph("Cell 1"), Paragraph("Cell 2"));
    expect(t.kind).toBe("table");
    expect(t.children).toHaveLength(2);
  });
});

describe("Image", () => {
  it("creates an image with src", () => {
    const img = Image("https://example.com/img.png");
    expect(img.kind).toBe("image");
    expect(img.props.src).toBe("https://example.com/img.png");
    expect(img.props.alt).toBeUndefined();
  });

  it("creates an image with alt text", () => {
    const img = Image("img.png", "A photo");
    expect(img.props.alt).toBe("A photo");
  });
});

describe("Divider", () => {
  it("creates a divider node", () => {
    const d = Divider();
    expect(d.kind).toBe("divider");
    expect(d.children).toHaveLength(0);
  });
});

describe("Columns", () => {
  it("creates a columns node with children", () => {
    const c = Columns(Paragraph("Col 1"), Paragraph("Col 2"));
    expect(c.kind).toBe("columns");
    expect(c.children).toHaveLength(2);
  });
});
