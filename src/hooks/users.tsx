import { useEffect, useState } from "react";
import { fetchAllGitHubUsers } from "../api";

export const useGitHubUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAllGitHubUsers();
        setUsers(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { users, loading, error };
};
