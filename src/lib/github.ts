import { cache } from 'react';

export interface GitHubCommit {
  sha: string;
  message: string;
  date: string;
  url: string;
}

// Wrapped with React.cache() for per-request deduplication in RSC
export const getLatestCommit = cache(async (owner: string, repo: string): Promise<GitHubCommit | null> => {
  const commits = await getCommits(owner, repo, 1);
  return commits.length > 0 ? commits[0] : null;
});

// Wrapped with React.cache() for per-request deduplication in RSC
export const getCommits = cache(async (owner: string, repo: string, perPage: number = 20): Promise<GitHubCommit[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from GitHub');
    }

    const data = await response.json();
    if (!data || !Array.isArray(data)) return [];

    return data.map((commit: Record<string, unknown>) => ({
      sha: (commit.sha as string).substring(0, 7),
      message: (commit.commit as Record<string, unknown>).message as string,
      date: ((commit.commit as Record<string, unknown>).author as Record<string, unknown>).date as string,
      url: commit.html_url as string,
    }));
  } catch (error) {
    console.error('Error fetching GitHub commits:', error);
    return [];
  }
});
