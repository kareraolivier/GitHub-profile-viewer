import { useState, useEffect } from "react";
import { fetchGitHubUser } from "../api";

export const useGitHubUser = (username: string) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!username) return;
    const getUser = async () => {
      try {
        const data = await fetchGitHubUser(username);
        setUser(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username]);

  return { user, loading, error };
};
