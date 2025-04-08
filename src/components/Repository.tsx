const Repository = ({ repo }: any) => {
  return (
    <div key={repo.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <a
        className="text-green-600 font-semibold text-lg"
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
      >
        {repo.name}
      </a>
      {repo.description && <p className="text-sm mt-1">{repo.description}</p>}
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex gap-4">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        {repo.language && <span>💻 {repo.language}</span>}
      </div>
    </div>
  );
};

export default Repository;
