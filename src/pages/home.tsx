import { useState } from "react";
import { useGitHubUser, useGitHubUserRepos } from "../hooks";
import User from "../components/user";
import Repository from "../components/Repository";
import SearchForm from "../components/SearchForm";

const Home = () => {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUsername] = useState("");

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setSubmittedUsername(username.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-4">
      <SearchForm
        username={username}
        setUsername={setUsername}
        handleSearch={handleSearch}
      />

      {(userLoading || reposLoading) && <p>Loading...</p>}

      {(userError || reposError) && (
        <p className="text-red-500">
          {userError?.message || reposError?.message}
        </p>
      )}

      {user && <User user={user} />}

      {repos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">Repositories</h3>
          {repos.slice(0, 10).map((repo) => (
            <Repository repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
