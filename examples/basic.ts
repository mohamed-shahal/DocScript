import { Document, Heading, Paragraph, Section, List, Image, Divider, Columns } from "@docscript/core";
import { validate } from "@docscript/validator";
import { parse } from "@docscript/parser";

const document = Document(
  Heading("DocScript"),
  Paragraph("Build editable Microsoft Word documents with JavaScript components."),
  Divider(),
  Section(
    Heading("Features", 2),
    Paragraph("Component-based architecture"),
    Paragraph("Semantic document modeling"),
    Paragraph("Immutable data structures"),
  ),
  Heading("Getting Started", 2),
  Paragraph("Install DocScript and start building documents."),
  List("bullet",
    Paragraph("Install the package"),
    Paragraph("Import components"),
    Paragraph("Build your document"),
  ),
  Heading("Image Example", 2),
  Image("https://example.com/diagram.png", "Architecture diagram"),
  Columns(
    Paragraph("Column 1 content"),
    Paragraph("Column 2 content"),
  ),
);

console.log("Document tree:");
console.log(JSON.stringify(document, null, 2));

const result = validate(document);
console.log("\nValidation:", result.valid ? "PASS" : "FAIL");

if (!result.valid) {
  console.log("Errors:", result.errors);
}

const parsed = parse(document);
console.log("\nParsed successfully:", parsed.node.kind === "document");
