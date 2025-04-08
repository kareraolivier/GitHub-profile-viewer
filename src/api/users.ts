export const fetchAllGitHubUsers = async () => {
  const response = await fetch("https://api.github.com/users");
  const data = await response.json();
  return data;
};

export const fetchGitHubUser = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  return data;
};

export const fetchGitHubUserRepos = async (username: string) => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const data = await response.json();
  return data;
};
