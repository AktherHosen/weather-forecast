import { useState } from "react";
import { useDispatch } from "react-redux";
import { getWeather, setCity } from "../../redux/features/weatherSlice";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (input.trim()) {
      dispatch(setCity(input));
      dispatch(getWeather(input) as any);
      window.dispatchEvent(
        new CustomEvent("add-city-to-history", { detail: input })
      );
      setInput("");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Enter city name"
        className="px-4 py-2 border text-black dark:text-white border-gray-600 rounded-md w-full focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
