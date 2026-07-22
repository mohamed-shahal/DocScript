import { describe, it, expect } from "vitest";
import { Document, Heading, Paragraph, Text, Section, List, Item, visit } from "@docscript/core";

describe("visit", () => {
  it("calls kind-specific handler", () => {
    const headings: string[] = [];
    const doc = Document(Heading("A"), Heading("B"));

    visit(doc, {
      Heading(node) {
        headings.push(node.props.text);
      },
    });

    expect(headings).toEqual(["A", "B"]);
  });

  it("calls enter for every node", () => {
    const entered: string[] = [];
    const doc = Document(Section(Heading("X")));

    visit(doc, {
      enter(node) {
        entered.push(node.kind);
      },
    });

    expect(entered).toEqual(["document", "section", "heading"]);
  });

  it("calls leave for every node", () => {
    const left: string[] = [];
    const doc = Document(Section(Heading("X")));

    visit(doc, {
      leave(node) {
        left.push(node.kind);
      },
    });

    expect(left).toEqual(["heading", "section", "document"]);
  });

  it("traverses depth-first", () => {
    const order: string[] = [];
    const doc = Document(
      Section(Heading("A"), Paragraph(Text("B"))),
      Heading("C"),
    );

    visit(doc, {
      enter(node) {
        if (node.kind === "heading" || node.kind === "paragraph" || node.kind === "text") {
          order.push(node.kind);
        }
      },
    });

    expect(order).toEqual(["heading", "paragraph", "text", "heading"]);
  });

  it("works with multiple handlers", () => {
    const results: string[] = [];
    const doc = Document(
      Heading("Title"),
      Paragraph(Text("Body")),
      List("bullet", Item("X")),
    );

    visit(doc, {
      Heading(node) {
        results.push(`H:${node.props.text}`);
      },
      Paragraph() {
        results.push("P");
      },
      List(node) {
        results.push(`L:${node.props.type}`);
      },
      Item() {
        results.push("I");
      },
      Text(node) {
        results.push(`T:${node.props.value}`);
      },
    });

    expect(results).toEqual(["H:Title", "P", "T:Body", "L:bullet", "I", "T:X"]);
  });

  it("handles empty document", () => {
    const entered: string[] = [];
    const doc = Document();

    visit(doc, {
      enter(node) {
        entered.push(node.kind);
      },
    });

    expect(entered).toEqual(["document"]);
  });

  it("does not break when handler returns value", () => {
    const doc = Document(Heading("X"));
    let called = false;

    visit(doc, {
      Heading() {
        called = true;
        return "something";
      },
    });

    expect(called).toBe(true);
  });
});
