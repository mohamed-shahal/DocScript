import type { ContactInfo } from "../types/index.js";

/**
 * Format contact info into a single string with pipe separators.
 *
 * @example
 * ```ts
 * formatContact({ email: "a@b.com", phone: "+1234" });
 * // "a@b.com | +1234"
 * ```
 */
export function formatContact(info: ContactInfo): string {
  const parts: string[] = [];

  if (info.email) parts.push(info.email);
  if (info.phone) parts.push(info.phone);
  if (info.website) parts.push(info.website);
  if (info.linkedin) parts.push(info.linkedin);
  if (info.github) parts.push(info.github);
  if (info.location) parts.push(info.location);

  return parts.join(" | ");
}

/**
 * Normalize a string list into a clean array, filtering empty entries.
 */
export function normalizeList(items: (string | undefined | null)[]): string[] {
  return items.filter((item): item is string => Boolean(item?.trim()));
}

/**
 * Create a consistent section separator name from a label.
 */
export function sectionId(label: string): string {
  return `section_${label.toLowerCase().replace(/\s+/g, "_")}`;
}
