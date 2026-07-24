import { Packer, Document } from "docx";
import * as fs from "fs/promises";
import * as path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export interface ExportOptions {
  outputDir?: string;
  fileName?: string;
  pdf?: boolean;
}

export interface ExportResult {
  docx: string;
  pdf?: string;
}

export async function exportFile(
  document: Document,
  options: ExportOptions = {}
): Promise<ExportResult> {
  const {
    outputDir = "./exports",
    fileName = "resume",
    pdf = false,
  } = options;

  const absOutputDir = path.resolve(outputDir);
  await fs.mkdir(absOutputDir, { recursive: true });

  const docxPath = path.join(absOutputDir, `${fileName}.docx`);

  let buffer: Buffer;
  try {
    buffer = await Packer.toBuffer(document);
  } catch (err) {
    throw new Error(
      `Failed to generate DOCX: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  try {
    await fs.writeFile(docxPath, buffer);
  } catch (err) {
    throw new Error(
      `Failed to write DOCX file to "${docxPath}": ${err instanceof Error ? err.message : String(err)}`
    );
  }

  const result: ExportResult = { docx: docxPath };

  if (pdf) {
    try {
      await execFileAsync("soffice", [
        "--headless",
        "--convert-to", "pdf",
        "--outdir", absOutputDir,
        docxPath,
      ]);
      result.pdf = path.join(absOutputDir, `${fileName}.pdf`);
    } catch (err) {
      throw new Error(
        `Failed to convert DOCX to PDF. Is LibreOffice installed?\n` +
        `  Install: https://www.libreoffice.org/get-help/install/\n` +
        `  Error: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  return result;
}
