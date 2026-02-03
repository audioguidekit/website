import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content/docs');

export interface DocMeta {
  title: string;
  description?: string;
  slug: string[];
}

export interface DocContent {
  meta: DocMeta;
  content: string;
}

export function getDocBySlug(slug: string[]): DocContent | null {
  // Handle root path
  const filePath = slug.length === 0
    ? path.join(CONTENT_DIR, 'introduction.mdx')
    : path.join(CONTENT_DIR, ...slug) + '.mdx';

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      meta: {
        title: data.title || 'Documentation',
        description: data.description,
        slug,
      },
      content,
    };
  } catch {
    return null;
  }
}

export function getAllDocSlugs(): string[][] {
  const slugs: string[][] = [];

  function walkDir(dir: string, prefix: string[] = []) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walkDir(filePath, [...prefix, file]);
      } else if (file.endsWith('.mdx')) {
        const slug = file === 'introduction.mdx' && prefix.length === 0
          ? []
          : [...prefix, file.replace('.mdx', '')];
        slugs.push(slug);
      }
    }
  }

  walkDir(CONTENT_DIR);
  return slugs;
}
