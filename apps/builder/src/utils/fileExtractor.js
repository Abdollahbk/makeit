/**
 * fileExtractor.js
 * In-browser document text extraction for PDF, DOCX, TXT, and JSON files.
 * 100% client-side, zero backend required.
 */
import * as pdfjsLib from 'pdfjs-dist';

// Set worker source with cdn fallback for browser compatibility
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;
}

/**
 * Extract plain text from a File object (.pdf, .docx, .txt, .json)
 */
export async function extractTextFromFile(file) {
  if (!file) throw new Error('No file provided');

  const fileName = file.name.toLowerCase();

  // 1. Plain text and markdown files
  if (fileName.endsWith('.txt') || fileName.endsWith('.md') || fileName.endsWith('.rtf')) {
    return await readAsPlainText(file);
  }

  // 2. JSON files (MakeIt exports or JSONResume)
  if (fileName.endsWith('.json')) {
    const jsonStr = await readAsPlainText(file);
    try {
      const parsed = JSON.parse(jsonStr);
      return flattenJsonCV(parsed);
    } catch {
      return jsonStr;
    }
  }

  // 3. PDF files
  if (fileName.endsWith('.pdf') || file.type === 'application/pdf') {
    return await extractPdfText(file);
  }

  // 4. DOCX files
  if (fileName.endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return await extractDocxText(file);
  }

  // Fallback to text reading
  return await readAsPlainText(file);
}

/**
 * Reads file as plain text
 */
function readAsPlainText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result || '');
    reader.onerror = (err) => reject(err);
    reader.readAsText(file);
  });
}

/**
 * Extracts plain text page-by-page from PDF ArrayBuffer using pdfjs-dist
 */
async function extractPdfText(file) {
  const arrayBuffer = await file.arrayBuffer();
  try {
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const pageTexts = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageStr = textContent.items.map(item => item.str).join(' ');
      pageTexts.push(pageStr);
    }

    return pageTexts.join('\n\n');
  } catch (err) {
    console.warn('PDF.js parse warning, attempting stream fallback:', err);
    return fallbackPdfStreamExtract(arrayBuffer);
  }
}

/**
 * Fallback binary stream text extraction for uncompressed or standard PDF text streams
 */
function fallbackPdfStreamExtract(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  let binaryStr = '';
  // Read in chunks
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binaryStr += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }

  // Find text inside parentheses following Tj or inside TJ arrays
  const textMatches = [];
  const tjRegex = /\(([^)]+)\)\s*Tj/g;
  let match;
  while ((match = tjRegex.exec(binaryStr)) !== null) {
    textMatches.push(match[1]);
  }

  if (textMatches.length > 20) {
    return textMatches.join(' ');
  }

  // General ASCII word extraction fallback
  const asciiClean = binaryStr.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
  const words = asciiClean.split(/\s+/).filter(w => w.length > 2 && /^[a-zA-Z0-9.,@#+\-/]+$/.test(w));
  return words.join(' ');
}

/**
 * DOCX file text extraction (reads word/document.xml stream)
 */
async function extractDocxText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binaryStr = '';
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binaryStr += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }

  // Look for XML paragraph tags: <w:t>...</w:t>
  const wtRegex = /<w:t[^>]*>([^<]+)<\/w:t>/g;
  const parts = [];
  let m;
  while ((m = wtRegex.exec(binaryStr)) !== null) {
    parts.push(m[1]);
  }

  if (parts.length > 0) {
    return parts.join(' ');
  }

  return readAsPlainText(file);
}

/**
 * Flattens structured CV JSON into searchable text
 */
function flattenJsonCV(data) {
  if (!data || typeof data !== 'object') return '';
  const parts = [];

  function recurse(val) {
    if (!val) return;
    if (typeof val === 'string' || typeof val === 'number') {
      parts.push(String(val));
    } else if (Array.isArray(val)) {
      val.forEach(recurse);
    } else if (typeof val === 'object') {
      Object.values(val).forEach(recurse);
    }
  }

  recurse(data);
  return parts.join(' ');
}
