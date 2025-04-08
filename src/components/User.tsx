const User = ({ user }: any) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
      <div className="flex items-center gap-4">
        <img
          className="w-20 h-20 rounded-full"
          src={user?.avatar_url}
          alt="Avatar"
        />
        <div>
          <h2 className="text-xl font-bold">{user?.name || "No Name"}</h2>
          <p>@{user?.login}</p>
          {user?.location && <p>{user?.location}</p>}
          {user?.bio && <p>{user?.bio}</p>}
          <div className="flex gap-4 mt-2">
            <span>Followers: {user?.followers}</span>
            <span>Following: {user?.following}</span>
          </div>
          <a
            className="text-green-500 underline"
            href={user?.html_url}
            target="_blank"
            rel="noreferrer"
          >
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default User;
