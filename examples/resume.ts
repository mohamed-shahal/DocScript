import {
  Document,
  Section,
  Heading,
  Text,
  Paragraph,
  List,
  Item,
  Divider,
  Header,
  Footer,
  Hyperlink,
} from "@docscript/core";
import { validate } from "@docscript/validator";
import { visit } from "@docscript/core";

const resume = Document(
  Header(Paragraph(Text("Mohamed Shahal — Resume"))),

  Section(
    Heading("Mohamed Shahal"),
    Paragraph(Text("Computer Science Student")),
    Paragraph(Text("mohamed@example.com | +1 234 567 890 | San Francisco, CA")),
    Paragraph(
      Hyperlink("GitHub", "https://github.com/mohamed-shahal"),
    ),
  ),

  Divider(),

  Section(
    Heading("Education", 2),
    Paragraph(Text("Bachelor of Science in Computer Science")),
    Paragraph(Text("University of California — Expected 2027")),
  ),

  Section(
    Heading("Experience", 2),
    Paragraph(Text("Software Engineering Intern")),
    Paragraph(Text("Tech Corp — Summer 2025")),
    Paragraph(
      Text("Built internal tools that reduced manual work by 40%."),
    ),
    Paragraph(
      Text("Led migration of legacy REST API to GraphQL."),
    ),
  ),

  Section(
    Heading("Projects", 2),
    List("bullet",
      Item(
        Paragraph(
          Text("DocScript"),
          Text(" — Component-based framework for building Word documents with JavaScript."),
        ),
      ),
      Item(
        Paragraph(
          Text("MediaVault"),
          Text(" — Media management platform with AI-powered tagging."),
        ),
      ),
      Item(
        Paragraph(
          Text("DevTrack"),
          Text(" — Developer productivity dashboard with real-time metrics."),
        ),
      ),
    ),
  ),

  Section(
    Heading("Skills", 2),
    List("bullet",
      Item("TypeScript"),
      Item("React"),
      Item("Node.js"),
      Item("Python"),
      Item("PostgreSQL"),
      Item("Git"),
    ),
  ),

  Section(
    Heading("Languages", 2),
    List("bullet",
      Item("Arabic (Native)"),
      Item("English (Fluent)"),
    ),
  ),

  Footer(Paragraph(Text("Generated with DocScript"))),
);

const result = validate(resume);
console.log("Validation:", result.valid ? "PASS" : "FAIL");

if (!result.valid) {
  console.log("Errors:", result.errors);
}

const headings: string[] = [];
visit(resume, {
  Heading(node) {
    headings.push(node.props.text);
  },
});

console.log("Headings found:", headings);
