import mammoth from "mammoth"
import TurndownService from 'turndown';
import fs, { read } from 'fs';
import { join, basename } from 'path'
const DOC_REGEXP = /\.(doc|docx)$/
import matter from 'gray-matter'
import { titleToSlug } from '@/libs/handleFunctions'
function docxFilenameToMdFilename(docxFilename: string) {
  if (typeof docxFilename !== 'string' || docxFilename.trim() === '') {
    return ''; // Handle invalid or empty input
  }

  const baseFilename = docxFilename.replace(/\.docx$/i, '');

  // Add the ".md" extension
  const mdFilename = baseFilename + '.md';

  return mdFilename;
}

export async function translateDir(path: string) {
  try {
    const dirents = fs.readdirSync(path, { withFileTypes: true })
    const files = dirents
      .filter((dirent) => dirent.isFile() && DOC_REGEXP.test(dirent.name))
      .map((dirent) => dirent.name)
    for (const file of files) {
      await docxToMarkdown(join(path, file))
    }
  } catch (error) {
    console.error({ readMdMdxFiles: error })
    return []
  }
}
export async function docxToMarkdown(docxPath: string) {
  try {
    const outputPath = docxFilenameToMdFilename(docxPath)
    if (fs.existsSync(outputPath)) {
      return;
    }
    const buffer = fs.readFileSync(docxPath);
    const result = await mammoth.convertToHtml({ buffer: buffer });

    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(result.value);
    const title = basename(outputPath).split('.')[0]
    const data = {
      title,
      slug: titleToSlug(title).toLocaleLowerCase(),
      description: null,
      coverImage: null,
      status: 'published',
      publishedAt: new Date().toISOString()
    }
    const fileContent = matter.stringify(markdown, data)
    fs.writeFileSync(outputPath, fileContent)
  } catch (error) {
    console.error("Conversion error:", error);
  }
}

