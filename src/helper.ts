export const getTopStarredRepos = (repos: any, count: number = 10) => {
  return repos
    .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
    .slice(0, count);
};
