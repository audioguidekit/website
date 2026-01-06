import { NextResponse } from 'next/server';
import { getLatestCommit } from '@/lib/github';

export async function GET() {
  // You can change these to your own repository
  const owner = process.env.GITHUB_OWNER || 'vercel';
  const repo = process.env.GITHUB_REPO || 'next.js';

  const commit = await getLatestCommit(owner, repo);

  if (!commit) {
    return NextResponse.json({ error: 'Failed to fetch commit' }, { status: 500 });
  }

  return NextResponse.json(commit);
}
