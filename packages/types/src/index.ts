export { DS_NODE_VERSION } from "./nodes.js";

export type {
  DSNode,
  DocumentNode,
  SectionNode,
  HeadingNode,
  TextNode,
  ParagraphNode,
  ListNode,
  ItemNode,
  TableNode,
  ImageNode,
  DividerNode,
  ColumnsNode,
  PageBreakNode,
  HeaderNode,
  FooterNode,
  HyperlinkNode,
  QuoteNode,
  CodeBlockNode,
  AnyDSNode,
  DSNodeKind,
  HeadingLevel,
  ListNodeType,
} from "./nodes.js";

export type {
  ValidationError,
  ValidationRule,
  ValidationResult,
  ValidationContext,
  AllowedChildren,
  HierarchyMap,
} from "./validation.js";

export type {
  ComponentFactory,
  ComponentRegistry,
  PropSpec,
  ComponentMeta,
} from "./registry.js";

export type { Visitor, VisitorHandler } from "./visitor.js";
