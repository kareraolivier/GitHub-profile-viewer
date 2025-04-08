import { useState } from "react";
import { useGitHubUser, useGitHubUserRepos } from "../hooks";
import Navbar from "../components/Navbar";

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
      <Navbar />
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          className="p-2 border rounded w-full text-black dark:text-white"
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Search
        </button>
      </form>

      {(userLoading || reposLoading) && <p>Loading...</p>}

      {(userError || reposError) && (
        <p className="text-red-500">
          {userError?.message || reposError?.message}
        </p>
      )}

      {user && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
          <div className="flex items-center gap-4">
            <img
              className="w-20 h-20 rounded-full"
              src={user.avatar_url}
              alt="Avatar"
            />
            <div>
              <h2 className="text-xl font-bold">{user.name || "No Name"}</h2>
              <p>@{user.login}</p>
              {user.location && <p>{user.location}</p>}
              {user.bio && <p>{user.bio}</p>}
              <div className="flex gap-4 mt-2">
                <span>Followers: {user.followers}</span>
                <span>Following: {user.following}</span>
              </div>
              <a
                className="text-blue-500 underline"
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      )}

      {repos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">Repositories</h3>
          {repos.slice(0, 10).map((repo) => (
            <div
              key={repo.id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow"
            >
              <a
                className="text-blue-600 font-semibold text-lg"
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
              >
                {repo.name}
              </a>
              {repo.description && (
                <p className="text-sm mt-1">{repo.description}</p>
              )}
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex gap-4">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                {repo.language && <span>💻 {repo.language}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
