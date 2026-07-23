import type { ResumeStyles, StyleToken } from "../types/index.js";
import { defaultStyles } from "../styles/index.js";
import {
  Paragraph,
  TextRun,
  Document,
  AlignmentType,
  HeadingLevel,
  Tab,
  TabStopPosition,
  TabStopType,
  ImageRun,
  BorderStyle,
  HeightRule,
  TableRow,
  Table,
  WidthType,
  convertInchesToTwip,
} from "docx";

/**
 * Create a TextRun from a StyleToken.
 */
export function textRunFromToken(
  token: StyleToken,
  text: string,
): TextRun {
  return new TextRun({
    text,
    font: token.font,
    size: token.size,
    bold: token.bold,
    italics: token.italics,
    color: token.color,
  });
}

/**
 * Create a Paragraph from a StyleToken and text content.
 */
export function paragraphFromToken(
  token: StyleToken,
  text: string,
  options?: {
    alignment?: StyleToken["alignment"];
    bullet?: boolean;
    numbering?: { reference: string; level: number };
  },
): Paragraph {
  const alignmentMap: Record<string, (typeof AlignmentType)[keyof typeof AlignmentType]> = {
    left: AlignmentType.LEFT,
    center: AlignmentType.CENTER,
    right: AlignmentType.RIGHT,
  };

  return new Paragraph({
    children: [textRunFromToken(token, text)],
    spacing: token.spacing,
    alignment: alignmentMap[options?.alignment ?? token.alignment ?? "left"],
    numbering: options?.numbering,
  });
}

/**
 * Create a Paragraph with mixed inline runs (e.g., company + duration on one line).
 */
export function inlineParagraph(
  runs: Array<{ token: StyleToken; text: string }>,
  options?: {
    spacing?: StyleToken["spacing"];
    alignment?: StyleToken["alignment"];
    tabStop?: boolean;
  },
): Paragraph {
  const alignmentMap: Record<string, (typeof AlignmentType)[keyof typeof AlignmentType]> = {
    left: AlignmentType.LEFT,
    center: AlignmentType.CENTER,
    right: AlignmentType.RIGHT,
  };

  const children: (TextRun | Tab)[] = [];

  if (options?.tabStop) {
    children.push(
      new Tab(),
    );
  }

  for (const run of runs) {
    children.push(textRunFromToken(run.token, run.text));
  }

  return new Paragraph({
    children,
    spacing: options?.spacing,
    alignment: options?.alignment
      ? alignmentMap[options.alignment]
      : undefined,
    tabStops: options?.tabStop
      ? [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX,
          },
        ]
      : undefined,
  });
}

/**
 * Create a divider (horizontal rule) paragraph.
 */
export function dividerParagraph(): Paragraph {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    border: {
      bottom: {
        color: "CCCCCC",
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
  });
}

/**
 * Create a spacer paragraph with configurable height.
 */
export function spacerParagraph(points: number = 100): Paragraph {
  return new Paragraph({
    spacing: { after: points },
    children: [],
  });
}

/**
 * Get the styles object, defaulting to built-in styles.
 */
export function getStyles(styles?: ResumeStyles): ResumeStyles {
  return styles ?? defaultStyles;
}

export {
  Paragraph,
  TextRun,
  Document,
  AlignmentType,
  HeadingLevel,
  Tab,
  TabStopPosition,
  TabStopType,
  ImageRun,
  BorderStyle,
  HeightRule,
  TableRow,
  Table,
  WidthType,
  convertInchesToTwip,
};
