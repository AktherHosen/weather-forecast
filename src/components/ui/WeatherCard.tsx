// components/WeatherCard.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

const WeatherCard: React.FC = () => {
  const { data, loading, error } = useSelector((state: RootState) => state.weather);

  if (loading) return <div className="text-center mt-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-6">{error}</div>;
  if (!data) return null;

  const { name, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-6 text-center">
      <h2 className="text-2xl font-semibold mb-2">{name}</h2>
      <img src={iconUrl} alt={weather[0]?.description} className="mx-auto" />
      <p className="text-xl">{weather[0]?.main}</p>
      <p className="text-3xl font-bold">{main?.temp}°C</p>
      <div className="mt-4 space-y-1 text-sm text-gray-600">
        <p>Humidity: {main?.humidity}%</p>
        <p>Wind Speed: {wind?.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;