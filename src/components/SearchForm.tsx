const SearchForm = ({ username, setUsername, handleSearch }: any) => {
  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-6">
      <input
        className="p-2 border rounded w-full text-black"
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
