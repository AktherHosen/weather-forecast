import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getWeather, setCity } from "../../redux/features/weatherSlice";
import { AppDispatch } from "../../redux/Store";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    if (input.trim()) {
      dispatch(setCity(input));
      dispatch(getWeather(input));
      window.dispatchEvent(
        new CustomEvent("add-city-to-history", { detail: input })
      );

      setInput("");
    } else {
      alert("Please enter a city name.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter city name"
          className="px-4 py-2 border text-black dark:text-white border-gray-600 rounded-md w-64 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default SearchBar;
