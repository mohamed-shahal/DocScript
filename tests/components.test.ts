import { describe, it, expect } from "vitest";
import {
  Document,
  Section,
  Heading,
  Text,
  Paragraph,
  List,
  Item,
  Table,
  Image,
  Divider,
  Columns,
  PageBreak,
  Header,
  Footer,
  Hyperlink,
  Quote,
  CodeBlock,
} from "@docscript/core";

// --- Document ---
describe("Document", () => {
  it("creates with children", () => {
    const doc = Document(Heading("Title"), Paragraph(Text("Body")));
    expect(doc.kind).toBe("document");
    expect(doc.version).toBe(2);
    expect(doc.children).toHaveLength(2);
  });

  it("creates empty", () => {
    const doc = Document();
    expect(doc.children).toHaveLength(0);
  });

  it("is frozen", () => {
    const doc = Document();
    expect(Object.isFrozen(doc)).toBe(true);
    expect(Object.isFrozen(doc.children)).toBe(true);
  });
});

// --- Section ---
describe("Section", () => {
  it("creates with children (shorthand)", () => {
    const s = Section(Heading("A"), Paragraph(Text("B")));
    expect(s.kind).toBe("section");
    expect(s.children).toHaveLength(2);
  });

  it("creates with props", () => {
    const s = Section({ id: "intro" }, Heading("Intro"));
    expect(s.props.id).toBe("intro");
    expect(s.children).toHaveLength(1);
  });

  it("is frozen", () => {
    const s = Section();
    expect(Object.isFrozen(s)).toBe(true);
  });
});

// --- Heading ---
describe("Heading", () => {
  it("creates with shorthand", () => {
    const h = Heading("Title");
    expect(h.props.text).toBe("Title");
    expect(h.props.level).toBe(1);
  });

  it("creates with level", () => {
    const h = Heading("Sub", 3);
    expect(h.props.level).toBe(3);
  });

  it("creates with object syntax", () => {
    const h = Heading({ text: "Exp", level: 2, id: "exp" });
    expect(h.props.text).toBe("Exp");
    expect(h.props.level).toBe(2);
    expect(h.props.id).toBe("exp");
  });

  it("defaults level to 1 in object syntax", () => {
    const h = Heading({ text: "X" });
    expect(h.props.level).toBe(1);
  });

  it("is frozen", () => {
    const h = Heading("Test");
    expect(Object.isFrozen(h)).toBe(true);
  });
});

// --- Text ---
describe("Text", () => {
  it("creates with value", () => {
    const t = Text("Hello");
    expect(t.kind).toBe("text");
    expect(t.props.value).toBe("Hello");
    expect(t.children).toHaveLength(0);
  });

  it("is frozen", () => {
    const t = Text("X");
    expect(Object.isFrozen(t)).toBe(true);
  });
});

// --- Paragraph ---
describe("Paragraph", () => {
  it("creates with string (shorthand)", () => {
    const p = Paragraph("Hello");
    expect(p.kind).toBe("paragraph");
    expect(p.children).toHaveLength(1);
    expect(p.children[0].kind).toBe("text");
  });

  it("creates with Text child", () => {
    const p = Paragraph(Text("Hello"));
    expect(p.children).toHaveLength(1);
    expect(p.children[0].kind).toBe("text");
  });

  it("creates with multiple children", () => {
    const p = Paragraph(Text("A"), Text("B"));
    expect(p.children).toHaveLength(2);
  });

  it("creates with props", () => {
    const p = Paragraph({ id: "p1" }, Text("Hello"));
    expect(p.props.id).toBe("p1");
    expect(p.children).toHaveLength(1);
  });

  it("is frozen", () => {
    const p = Paragraph("X");
    expect(Object.isFrozen(p)).toBe(true);
  });
});

// --- List ---
describe("List", () => {
  it("creates bullet list (shorthand)", () => {
    const l = List("bullet", Item("A"), Item("B"));
    expect(l.kind).toBe("list");
    expect(l.props.type).toBe("bullet");
    expect(l.children).toHaveLength(2);
  });

  it("creates numbered list", () => {
    const l = List("numbered", Item("X"));
    expect(l.props.type).toBe("numbered");
  });

  it("creates with object syntax", () => {
    const l = List({ type: "bullet", id: "l1" }, Item("A"));
    expect(l.props.type).toBe("bullet");
    expect(l.props.id).toBe("l1");
  });

  it("defaults type to bullet in object syntax", () => {
    const l = List({}, Item("A"));
    expect(l.props.type).toBe("bullet");
  });

  it("is frozen", () => {
    const l = List("bullet");
    expect(Object.isFrozen(l)).toBe(true);
  });
});

// --- Item ---
describe("Item", () => {
  it("creates with string (shorthand)", () => {
    const i = Item("React");
    expect(i.kind).toBe("item");
    expect(i.children).toHaveLength(1);
    expect(i.children[0].kind).toBe("text");
  });

  it("creates with Text children", () => {
    const i = Item(Text("Hello"), Text(" World"));
    expect(i.children).toHaveLength(2);
  });

  it("creates with props", () => {
    const i = Item({ id: "i1" }, Text("X"));
    expect(i.props.id).toBe("i1");
    expect(i.children).toHaveLength(1);
  });

  it("is frozen", () => {
    const i = Item("X");
    expect(Object.isFrozen(i)).toBe(true);
  });
});

// --- Table ---
describe("Table", () => {
  it("creates with children (shorthand)", () => {
    const t = Table(Paragraph(Text("Cell")));
    expect(t.kind).toBe("table");
    expect(t.children).toHaveLength(1);
  });

  it("creates with props", () => {
    const t = Table({ id: "t1" }, Paragraph(Text("Cell")));
    expect(t.props.id).toBe("t1");
  });

  it("is frozen", () => {
    const t = Table();
    expect(Object.isFrozen(t)).toBe(true);
  });
});

// --- Image ---
describe("Image", () => {
  it("creates with src (shorthand)", () => {
    const img = Image("https://example.com/img.png");
    expect(img.kind).toBe("image");
    expect(img.props.src).toBe("https://example.com/img.png");
    expect(img.props.alt).toBeUndefined();
  });

  it("creates with alt", () => {
    const img = Image("img.png", "A photo");
    expect(img.props.alt).toBe("A photo");
  });

  it("creates with object syntax", () => {
    const img = Image({ src: "img.png", alt: "Photo", id: "img1" });
    expect(img.props.src).toBe("img.png");
    expect(img.props.alt).toBe("Photo");
    expect(img.props.id).toBe("img1");
  });

  it("is frozen", () => {
    const img = Image("x.png");
    expect(Object.isFrozen(img)).toBe(true);
  });
});

// --- Divider ---
describe("Divider", () => {
  it("creates divider", () => {
    const d = Divider();
    expect(d.kind).toBe("divider");
    expect(d.children).toHaveLength(0);
  });

  it("is frozen", () => {
    const d = Divider();
    expect(Object.isFrozen(d)).toBe(true);
  });
});

// --- Columns ---
describe("Columns", () => {
  it("creates with children (shorthand)", () => {
    const c = Columns(Paragraph(Text("A")), Paragraph(Text("B")));
    expect(c.kind).toBe("columns");
    expect(c.children).toHaveLength(2);
  });

  it("creates with props", () => {
    const c = Columns({ id: "cols" }, Paragraph(Text("A")));
    expect(c.props.id).toBe("cols");
  });

  it("is frozen", () => {
    const c = Columns();
    expect(Object.isFrozen(c)).toBe(true);
  });
});

// --- PageBreak ---
describe("PageBreak", () => {
  it("creates page break", () => {
    const pb = PageBreak();
    expect(pb.kind).toBe("pageBreak");
    expect(pb.children).toHaveLength(0);
  });

  it("is frozen", () => {
    const pb = PageBreak();
    expect(Object.isFrozen(pb)).toBe(true);
  });
});

// --- Header ---
describe("Header", () => {
  it("creates with children (shorthand)", () => {
    const h = Header(Paragraph(Text("My Doc")));
    expect(h.kind).toBe("header");
    expect(h.children).toHaveLength(1);
  });

  it("creates with props", () => {
    const h = Header({ id: "h1" }, Paragraph(Text("X")));
    expect(h.props.id).toBe("h1");
  });

  it("is frozen", () => {
    const h = Header();
    expect(Object.isFrozen(h)).toBe(true);
  });
});

// --- Footer ---
describe("Footer", () => {
  it("creates with children (shorthand)", () => {
    const f = Footer(Paragraph(Text("Page 1")));
    expect(f.kind).toBe("footer");
    expect(f.children).toHaveLength(1);
  });

  it("creates with props", () => {
    const f = Footer({ id: "f1" }, Paragraph(Text("X")));
    expect(f.props.id).toBe("f1");
  });

  it("is frozen", () => {
    const f = Footer();
    expect(Object.isFrozen(f)).toBe(true);
  });
});

// --- Hyperlink ---
describe("Hyperlink", () => {
  it("creates with shorthand", () => {
    const h = Hyperlink("Click here", "https://example.com");
    expect(h.kind).toBe("hyperlink");
    expect(h.props.text).toBe("Click here");
    expect(h.props.url).toBe("https://example.com");
    expect(h.children).toHaveLength(0);
  });

  it("creates with object syntax", () => {
    const h = Hyperlink({ text: "Link", url: "https://x.com", id: "link1" });
    expect(h.props.text).toBe("Link");
    expect(h.props.url).toBe("https://x.com");
    expect(h.props.id).toBe("link1");
  });

  it("is frozen", () => {
    const h = Hyperlink("X", "Y");
    expect(Object.isFrozen(h)).toBe(true);
  });
});

// --- Quote ---
describe("Quote", () => {
  it("creates with shorthand", () => {
    const q = Quote("Stay hungry.", "Steve Jobs");
    expect(q.kind).toBe("quote");
    expect(q.props.text).toBe("Stay hungry.");
    expect(q.props.attribution).toBe("Steve Jobs");
  });

  it("creates without attribution", () => {
    const q = Quote("Hello");
    expect(q.props.attribution).toBeUndefined();
  });

  it("creates with object syntax", () => {
    const q = Quote({ text: "Hi", attribution: "Me", id: "q1" });
    expect(q.props.text).toBe("Hi");
    expect(q.props.id).toBe("q1");
  });

  it("is frozen", () => {
    const q = Quote("X");
    expect(Object.isFrozen(q)).toBe(true);
  });
});

// --- CodeBlock ---
describe("CodeBlock", () => {
  it("creates with shorthand", () => {
    const cb = CodeBlock("const x = 1;", "ts");
    expect(cb.kind).toBe("codeBlock");
    expect(cb.props.code).toBe("const x = 1;");
    expect(cb.props.language).toBe("ts");
  });

  it("creates without language", () => {
    const cb = CodeBlock("hello");
    expect(cb.props.language).toBeUndefined();
  });

  it("creates with object syntax", () => {
    const cb = CodeBlock({ code: "x", language: "js", id: "cb1" });
    expect(cb.props.code).toBe("x");
    expect(cb.props.language).toBe("js");
    expect(cb.props.id).toBe("cb1");
  });

  it("is frozen", () => {
    const cb = CodeBlock("x");
    expect(Object.isFrozen(cb)).toBe(true);
  });
});
