import type { ResumeStyles } from "../types/index.js";

/**
 * Default style tokens for the resume.
 * Override individual tokens via {@link createStyles}.
 */
export const defaultStyles: ResumeStyles = {
  heading: {
    font: "Calibri",
    size: 28,
    bold: true,
    color: "1A1A1A",
    spacing: { before: 0, after: 120, line: 276 },
    alignment: "center",
  },
  subHeading: {
    font: "Calibri",
    size: 20,
    bold: true,
    color: "2B5797",
    spacing: { before: 120, after: 60, line: 276 },
  },
  sectionHeading: {
    font: "Calibri",
    size: 14,
    bold: true,
    color: "2B5797",
    spacing: { before: 200, after: 60, line: 276 },
  },
  designation: {
    font: "Calibri",
    size: 20,
    bold: false,
    color: "555555",
    spacing: { before: 0, after: 60, line: 276 },
    alignment: "center",
  },
  text: {
    font: "Calibri",
    size: 11,
    color: "333333",
    spacing: { before: 0, after: 40, line: 276 },
  },
  smallText: {
    font: "Calibri",
    size: 9,
    color: "666666",
    spacing: { before: 0, after: 20, line: 240 },
  },
  bullet: {
    font: "Calibri",
    size: 11,
    color: "333333",
    spacing: { before: 0, after: 20, line: 276 },
  },
  company: {
    font: "Calibri",
    size: 12,
    bold: true,
    color: "1A1A1A",
    spacing: { before: 0, after: 0, line: 276 },
  },
  duration: {
    font: "Calibri",
    size: 11,
    italics: true,
    color: "777777",
    spacing: { before: 0, after: 0, line: 276 },
  },
  name: {
    font: "Calibri",
    size: 36,
    bold: true,
    color: "1A1A1A",
    spacing: { before: 0, after: 60, line: 276 },
    alignment: "center",
  },
  contact: {
    font: "Calibri",
    size: 10,
    color: "555555",
    spacing: { before: 0, after: 60, line: 240 },
    alignment: "center",
  },
  skill: {
    font: "Calibri",
    size: 11,
    color: "333333",
    spacing: { before: 0, after: 20, line: 276 },
  },
};

/**
 * Create a merged style configuration from partial overrides.
 *
 * @param overrides - Partial style overrides to apply on top of defaults.
 * @returns Complete {@link ResumeStyles} configuration.
 *
 * @example
 * ```ts
 * const customStyles = createStyles({
 *   heading: { color: "FF0000", size: 32 },
 *   name: { font: "Georgia" },
 * });
 * ```
 */
export function createStyles(
  overrides: Partial<ResumeStyles> = {},
): ResumeStyles {
  const merged = { ...defaultStyles };

  for (const key of Object.keys(overrides) as Array<keyof ResumeStyles>) {
    if (overrides[key]) {
      merged[key] = { ...merged[key], ...overrides[key] };
    }
  }

  return merged;
}
