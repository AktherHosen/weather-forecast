import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getWeather } from "../../redux/features/weatherSlice";
import { X } from "lucide-react";

const SearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("weather-history");
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }

    const handleAddCity = (e: Event) => {
      const city = (e as CustomEvent).detail;
      setSearchHistory((prev) => {
        if (prev.includes(city)) return prev;
        const updated = [city, ...prev];
        localStorage.setItem("weather-history", JSON.stringify(updated));
        return updated;
      });
    };

    window.addEventListener("add-city-to-history", handleAddCity);
    return () =>
      window.removeEventListener("add-city-to-history", handleAddCity);
  }, []);

  const handleRemoveCity = (city: string) => {
    const updated = searchHistory.filter((c) => c !== city);
    setSearchHistory(updated);
    localStorage.setItem("weather-history", JSON.stringify(updated));
  };

  const handleClear = () => {
    setSearchHistory([]);
    localStorage.removeItem("weather-history");
  };

  const handleSearchCity = (city: string) => {
    dispatch(getWeather(city) as any);
  };

  return (
    <div className="bg-[#bccfe1] dark:text-white dark:bg-gray-800 dark:border dark:border-gray-600 dark:shadow-sm rounded-xl px-4 py-4 min-h-[100px]">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Search History</h3>
        {searchHistory.length > 0 && (
          <button onClick={handleClear} className="text-blue-500">
            Clear All
          </button>
        )}
      </div>

      {searchHistory.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {searchHistory.map((city, index) => (
            <li key={index} className="flex items-center justify-between">
              <span
                onClick={() => handleSearchCity(city)} // Clicked city will trigger the correct weather data fetch
                className="cursor-pointer hover:text-blue-600 text-sm"
              >
                {city}
              </span>
              <span
                onClick={() => handleRemoveCity(city)}
                className="text-red-500 cursor-pointer"
              >
                <X size={14} />
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          No recent searches found.
        </p>
      )}
    </div>
  );
};

export default SearchHistory;
