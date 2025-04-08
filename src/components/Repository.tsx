const Repository = ({ repo }: any) => {
  return (
    <div
      key={repo.id}
      className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between gap-4"
    >
      <div>
        <a
          className="text-green-600 font-semibold text-lg"
          href={repo.html_url}
          target="_blank"
        >
          {repo.name}
        </a>
        {repo.description && <p className="text-sm mt-1">{repo.description}</p>}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-end flex-col">
        <span className="whitespace-nowrap" title="Stars">
          {repo.stargazers_count} ⭐
        </span>
        <span className="whitespace-nowrap" title="Forks">
          {repo.forks_count} ⛓️‍💥
        </span>
        {repo.language && (
          <span className="whitespace-nowrap" title="Languages">
            {" "}
            {repo.language} 💻
          </span>
        )}
      </div>
    </div>
  );
};

export default Repository;
