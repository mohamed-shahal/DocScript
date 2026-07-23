import type { SectionComponent, ResumeStyles } from "../types/index.js";
import { paragraphFromToken, textRunFromToken, getStyles, Paragraph, TextRun } from "../core/index.js";

/**
 * A skills section displaying skill tags inline.
 *
 * @param skills - Skill components or plain text strings.
 * @returns A section component producing skill paragraphs.
 *
 * @example
 * ```ts
 * const skills = Skills(
 *   Skill("TypeScript"),
 *   Skill("React"),
 *   "Node.js"
 * );
 * ```
 */
export function Skills(
  ...skills: Array<SectionComponent | string>
): SectionComponent {
  return () => {
    const paragraphs: Paragraph[] = [];

    for (const skill of skills) {
      if (typeof skill === "string") {
        paragraphs.push(...Text(skill)());
      } else {
        paragraphs.push(...skill());
      }
    }

    return paragraphs;
  };
}

/**
 * A single skill displayed as a bullet point.
 *
 * @param name - The skill name.
 * @param styles - Optional style overrides.
 * @returns A section component producing a skill paragraph.
 */
export function Skill(
  name: string,
  styles?: ResumeStyles,
): SectionComponent {
  return () => {
    const s = getStyles(styles);
    return [
      new Paragraph({
        children: [textRunFromToken(s.skill, name)],
        spacing: s.skill.spacing,
      }),
    ];
  };
}

// Re-use Text from generic for string fallback
import { Text } from "./generic.js";
