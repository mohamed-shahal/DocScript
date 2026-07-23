import type {
  SectionComponent,
  ResumeStyles,
  LanguageConfig,
} from "../types/index.js";
import { paragraphFromToken, inlineParagraph, textRunFromToken, getStyles, Paragraph, TextRun } from "../core/index.js";

/**
 * A languages section containing multiple language entries.
 *
 * @param items - Language components or plain text strings.
 * @returns A section component producing language paragraphs.
 *
 * @example
 * ```ts
 * const langs = Languages(
 *   Language({ name: "English", proficiency: "Native" }),
 *   Language({ name: "Spanish", proficiency: "Intermediate" })
 * );
 * ```
 */
export function Languages(
  ...items: Array<SectionComponent | string>
): SectionComponent {
  return () => {
    const paragraphs: Paragraph[] = [];

    for (const item of items) {
      if (typeof item === "string") {
        paragraphs.push(...Text(item)());
      } else {
        paragraphs.push(...item());
      }
    }

    return paragraphs;
  };
}

/**
 * A single language entry with name and optional proficiency.
 *
 * @param config - Language configuration.
 * @param styles - Optional style overrides.
 * @returns A section component producing a language paragraph.
 */
export function Language(
  config: LanguageConfig,
  styles?: ResumeStyles,
): SectionComponent {
  return () => {
    const s = getStyles(styles);

    if (config.proficiency) {
      return [
        new Paragraph({
          children: [
            textRunFromToken(s.company, config.name),
            new TextRun({ text: " — ", font: s.text.font, size: s.text.size, color: s.text.color }),
            textRunFromToken(s.text, config.proficiency),
          ],
          spacing: s.skill.spacing,
        }),
      ];
    }

    return [paragraphFromToken(s.company, config.name)];
  };
}

// Re-use Text from generic for string fallback
import { Text } from "./generic.js";
