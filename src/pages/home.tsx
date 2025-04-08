import { useEffect, useState } from "react";
import { useGitHubUser, useGitHubUserRepos } from "../hooks";
import User from "../components/User";
import Repository from "../components/Repository";
import SearchForm from "../components/SearchForm";
import { getTopStarredRepos } from "../helper";

const MAX_HISTORY = 8;

const Home = () => {
  const [submittedUsername, setSubmittedUsername] = useState("");
  const [searchHistory, setSearchHistory] = useState<any[]>([]);
  const [cachedUser, setCachedUser] = useState<any | null>(null);

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useGitHubUser(submittedUsername);

  const {
    repos,
    loading: reposLoading,
    error: reposError,
  } = useGitHubUserRepos(submittedUsername);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);

  useEffect(() => {
    if (user && user.login) {
      const updatedHistory = [
        user,
        ...searchHistory.filter((u) => u.login !== user.login),
      ].slice(0, MAX_HISTORY);
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
  }, [user]);

  useEffect(() => {
    if (!submittedUsername) return;

    const cached = searchHistory.find(
      (u) => u.login.toLowerCase() === submittedUsername.toLowerCase()
    );
    if (cached) {
      setCachedUser(cached);
    } else {
      setCachedUser(null);
    }
  }, [submittedUsername, searchHistory]);

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-white p-4">
      <SearchForm setSubmittedUsername={setSubmittedUsername} />

      {(userLoading || reposLoading) && <p>Loading...</p>}

      {(userError || reposError) && (
        <p className="text-red-500">
          {userError?.message || reposError?.message}
        </p>
      )}

      {submittedUsername && (cachedUser || user) && (
        <>
          {cachedUser && <User user={cachedUser} />}
          {!cachedUser && user?.status === "404" && (
            <p className="text-red-500">User not found</p>
          )}
          {!cachedUser && user && <User user={user} />}
        </>
      )}

      {!submittedUsername && searchHistory.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Recent Searches</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {searchHistory.map((cached) => (
              <User key={cached.id} user={cached} />
            ))}
          </div>
        </div>
      )}

      {repos && repos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">Repositories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {getTopStarredRepos(repos).map((repo: any) => (
              <Repository key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
