import { useGitHubUsers } from "../hooks";

const Home = () => {
  const { users, loading, error } = useGitHubUsers();

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(users);
  return (
    <div>
      <h1>GitHub Users</h1>
      <ul>
        {users.map((user: any, index: number) => (
          <li key={user.id + index}>
            <img src={user.avatar_url} alt={user.login} />
            <h2>{user.login}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
