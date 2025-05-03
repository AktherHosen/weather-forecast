import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <div className="mt-4">
      <nav className="flex items-center justify-between flex-wrap gap-4 mb-6 py-4 px-4 bg-[#bccfe1] rounded-md dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-semibold ">Weather Forecast</h2>

        <SearchBar />
        <button onClick={toggleTheme} className="px-3 py-1 text-sm rounded">
          {theme === "dark" ? (
            <div className="flex items-center text-sm gap-1 bg-gray-800 px-2 py-1.5 rounded-md">
              <Sun size={16} />
              Light
            </div>
          ) : (
            <div className="flex items-center text-sm gap-1 bg-gray-800 text-white px-2 py-1.5 rounded-md">
              <Moon size={16} /> Dark
            </div>
          )}
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
