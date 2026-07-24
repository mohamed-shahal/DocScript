import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "fs/promises";
import * as path from "path";
import { Resume, Header, Name, Summary, exportFile } from "../index.js";

describe("exportFile", () => {
  const testDir = path.resolve("./test-exports");

  beforeEach(async () => {
    await fs.rm(testDir, { recursive: true, force: true });
  });

  afterEach(async () => {
    await fs.rm(testDir, { recursive: true, force: true });
  });

  it("should export a DOCX file", async () => {
    const resume = Resume(
      Header(Name("Test User")),
      Summary("Test summary.")
    );

    const result = await exportFile(resume, {
      outputDir: testDir,
      fileName: "test",
    });

    expect(result.docx).toBe(path.join(testDir, "test.docx"));
    expect(result.pdf).toBeUndefined();

    const stat = await fs.stat(result.docx);
    expect(stat.size).toBeGreaterThan(0);
  });

  it("should create output directory if it does not exist", async () => {
    const nestedDir = path.join(testDir, "nested", "dir");
    const resume = Resume(
      Header(Name("Test User")),
      Summary("Test summary.")
    );

    const result = await exportFile(resume, {
      outputDir: nestedDir,
      fileName: "test",
    });

    const stat = await fs.stat(result.docx);
    expect(stat.size).toBeGreaterThan(0);
  });

  it("should use default options when none provided", async () => {
    const resume = Resume(
      Header(Name("Test User")),
      Summary("Test summary.")
    );

    const result = await exportFile(resume);

    expect(result.docx).toContain("resume.docx");

    // Cleanup default output
    await fs.rm("./exports", { recursive: true, force: true });
  });

  it("should throw meaningful error for invalid document", async () => {
    await expect(
      exportFile(null as any, { outputDir: testDir, fileName: "test" })
    ).rejects.toThrow("Failed to generate DOCX");
  });
});
