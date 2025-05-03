import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

const WeatherCard = () => {
  const { data, loading, error } = useSelector((state: RootState) => state.weather);

  if (loading) return <div className="text-center mt-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-6">{error}</div>;
  if (!data) return null;

  const {
    name,
    sys,
    weather,
    main,
    wind,
    clouds,
    visibility,
    coord,
  } = data;

  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coord.lon - 0.05},${coord.lat - 0.05},${coord.lon + 0.05},${coord.lat + 0.05}&layer=mapnik&marker=${coord.lat},${coord.lon}`;

  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-blue-200 shadow-xl rounded-2xl p-6 max-w-xl mx-auto mt-8">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold">{name}, {sys.country}</h2>
        <p className="text-sm text-gray-600">
          🌍 Latitude: <span className="font-medium">{coord.lat}</span> | Longitude: <span className="font-medium">{coord.lon}</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center">
          <img src={iconUrl} alt={weather[0].description} className="w-24 h-24 mx-auto" />
          <p className="text-xl capitalize">{weather[0].description}</p>
          <p className="text-4xl font-bold">{main.temp}°C</p>
          <p className="text-sm text-gray-500">Feels like: {main.feels_like}°C</p>
        </div>

        <div className="text-sm text-gray-700 space-y-2 w-full md:w-1/2">
          <p>🌡 Min Temp: {main.temp_min}°C | Max Temp: {main.temp_max}°C</p>
          <p>💧 Humidity: {main.humidity}%</p>
          <p>🌬 Wind: {wind.speed} m/s, {wind.deg}°</p>
          <p>☁ Cloudiness: {clouds.all}%</p>
          <p>🔭 Visibility: {visibility / 1000} km</p>
          <p>🌅 Sunrise: {formatTime(sys.sunrise)}</p>
          <p>🌇 Sunset: {formatTime(sys.sunset)}</p>
        </div>
      </div>

      {/* Map Display */}
      <div className="mt-6 border rounded overflow-hidden">
        <iframe
          src={mapUrl}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="City Location"
        ></iframe>
      </div>
    </div>
  );
};

export default WeatherCard;
