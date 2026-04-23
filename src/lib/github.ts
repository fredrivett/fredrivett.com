const GITHUB_OWNER = "fredrivett";
const GITHUB_API = "https://api.github.com";

export type RepoMeta = {
  stars: number | null;
  lastCommit: string | null;
  createdAt: string | null;
};

type RepoApiResponse = {
  stargazers_count: number;
  default_branch: string;
  created_at: string;
  private: boolean;
};

type CommitApiResponse = {
  commit: {
    author: { date: string } | null;
    committer: { date: string } | null;
  };
};

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_PAT;
  const base: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  return token ? { ...base, Authorization: `Bearer ${token}` } : base;
}

export async function fetchRepoMeta(repo: string): Promise<RepoMeta> {
  const empty: RepoMeta = { stars: null, lastCommit: null, createdAt: null };
  try {
    const repoRes = await fetch(`${GITHUB_API}/repos/${GITHUB_OWNER}/${repo}`, {
      headers: authHeaders(),
    });
    if (!repoRes.ok) return empty;
    const repoData = (await repoRes.json()) as RepoApiResponse;

    const commitRes = await fetch(
      `${GITHUB_API}/repos/${GITHUB_OWNER}/${repo}/commits/${repoData.default_branch}`,
      { headers: authHeaders() },
    );
    const commitData = commitRes.ok
      ? ((await commitRes.json()) as CommitApiResponse)
      : null;

    const commitDate =
      commitData?.commit.committer?.date ??
      commitData?.commit.author?.date ??
      null;

    return {
      stars: repoData.private ? null : repoData.stargazers_count,
      lastCommit: commitDate,
      createdAt: repoData.created_at,
    };
  } catch {
    return empty;
  }
}
