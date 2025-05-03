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
      <nav className="flex flex-col lg:flex-row lg:items-center lg:justify-between flex-wrap gap-4 mb-6 py-4 px-6 bg-[#bccfe1] rounded-xl dark:border dark:border-gray-600 dark:bg-gray-800 dark:text-white">
        <div className="w-full flex justify-between items-center lg:w-auto">
          <h2 className="text-xl font-semibold title-font">Weather Forecast</h2>
          <button onClick={toggleTheme} className="px-3 py-1 text-sm rounded">
            {theme === "dark" ? (
              <div className="flex items-center gap-1 text-black dark:text-white">
                <Sun size={26} />
              </div>
            ) : (
              <div className="flex items-center gap-1 text-black dark:text-white">
                <Moon size={26} />
              </div>
            )}
          </button>
        </div>

        <div className="lg:justify-end px-2">
          <SearchBar />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
