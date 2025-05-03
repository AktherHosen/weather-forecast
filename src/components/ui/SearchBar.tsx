import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getWeather, setCity } from '../../redux/features/weatherSlice';
import { AppDispatch } from '../../redux/Store';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  // Load search history from localStorage on mount
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('weather-history');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Handle the search
  const handleSearch = () => {
    if (input.trim()) {
      // Dispatch actions to set city and fetch weather
      dispatch(setCity(input));
      dispatch(getWeather(input));

      // Update search history only if not already in history
      if (!searchHistory.includes(input)) {
        const updatedHistory = [input, ...searchHistory]; // Add new city to the history
        setSearchHistory(updatedHistory);
        localStorage.setItem('weather-history', JSON.stringify(updatedHistory));
      }

      setInput(''); // Clear the input field after search
    } else {
      alert('Please enter a city name.');
    }
  };

  // Handle pressing Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  // Handle deleting a city from history
  const handleRemoveCity = (city: string) => {
    const updatedHistory = searchHistory.filter((storedCity) => storedCity !== city);

    setSearchHistory(updatedHistory);
    localStorage.setItem('weather-history', JSON.stringify(updatedHistory));
  };

  // Clear all search history
  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('weather-history');
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex gap-4">
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

      {/* Display the search history */}
      <div className="mt-4">
        <h3 className="text-lg">Search History</h3>
        <ul className="space-y-2">
          {searchHistory.map((city, index) => (
            <li key={index} className="flex items-center justify-between">
              <span
                onClick={() => {
                  setInput(city);
                  dispatch(getWeather(city)); // Fetch weather data for that city
                }}
                className="cursor-pointer hover:text-blue-600"
              >
                {city}
              </span>
              <span
                onClick={() => handleRemoveCity(city)}
                className="text-red-500 cursor-pointer ml-2"
              >
                &#10005; 
              </span>
            </li>
          ))}
        </ul>

       
        {searchHistory.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="mt-4 text-red-500 hover:text-red-700"
          >
            Clear All Search History
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
