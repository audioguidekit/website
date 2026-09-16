import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

const NOTES_DIR = path.join(process.cwd(), 'src/content/notes');
const DOCS_DIR = path.join(process.cwd(), 'content/docs');

function resolveSourceFile(segments: string[]): string | null {
  const [section, ...rest] = segments;

  if (section === 'notes' && rest.length === 1) {
    return path.join(NOTES_DIR, `${rest[0]}.md`);
  }

  if (section === 'docs') {
    return rest.length === 0
      ? path.join(DOCS_DIR, 'introduction.mdx')
      : path.join(DOCS_DIR, ...rest) + '.mdx';
  }

  return null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;
  const filePath = resolveSourceFile(segments);

  if (!filePath) {
    return new NextResponse('Not found', { status: 404 });
  }

  let raw: string;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }

  const { data, content } = matter(raw);
  const heading = data.title ? `# ${data.title}\n\n` : '';
  const lede = data.description || data.excerpt ? `${data.description ?? data.excerpt}\n\n` : '';
  const body = `${heading}${lede}${content.trim()}\n`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // ponytail: chars/4 heuristic, swap for a real tokenizer if agents need exact counts
      'X-Markdown-Tokens': String(Math.ceil(body.length / 4)),
    },
  });
}
