// components/SearchBar.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getWeather, setCity } from '../../redux/features/weatherSlice';
import { AppDispatch } from '../../redux/store';


const SearchBar: React.FC = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    if (input.trim()) {
      dispatch(setCity(input));
      dispatch(getWeather(input));
    } else {
      alert("Please enter a city name.");
    }
  };
  

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="flex justify-center gap-4 mt-8">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter city name"
        className="px-4 py-2 border rounded-md w-64 focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
