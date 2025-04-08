import { useState, useEffect } from "react";
import { fetchGitHubUserRepos } from "../api";

export const useGitHubUserRepos = (username: string) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!username) return;
    const getRepos = async () => {
      try {
        const data = await fetchGitHubUserRepos(username);
        setRepos(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getRepos();
  }, [username]);

  return { repos, loading, error };
};
