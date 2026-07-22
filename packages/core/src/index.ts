export {
  Document,
  Section,
  Heading,
  Paragraph,
  List,
  Table,
  Image,
  Divider,
  Columns,
} from "./components/index.js";

export { registry } from "./registry.js";

export type {
  DSNode,
  DocumentNode,
  SectionNode,
  HeadingNode,
  ParagraphNode,
  ListNode,
  TableNode,
  ImageNode,
  DividerNode,
  ColumnsNode,
  AnyDSNode,
  DSNodeKind,
  HeadingLevel,
  ListNodeType,
  ComponentFactory,
  ComponentRegistry,
} from "@docscript/types";
