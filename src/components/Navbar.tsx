import { useState, useEffect } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);
  return (
    <div className="py-4 shadow-md bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-white px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">GitHub Profile Viewer</h1>
        <button
          className="bg-zinc-300 dark:bg-zinc-700 px-4 py-2 rounded"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ " : "🌙"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
