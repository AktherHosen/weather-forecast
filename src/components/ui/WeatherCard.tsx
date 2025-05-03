import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { useEffect, useState } from "react";
import {
  Cloud,
  Droplet,
  Eye,
  Sun,
  Sunset,
  ThermometerSun,
  Wind,
} from "lucide-react";

const WeatherCard = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  const { data, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  if (loading) return <div className="text-center mt-6">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-6">{error}</div>;
  if (!data) return null;

  const { name, sys, weather, main, wind, clouds, visibility, coord } = data;

  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    coord.lon - 0.05
  },${coord.lat - 0.05},${coord.lon + 0.05},${
    coord.lat + 0.05
  }&layer=mapnik&marker=${coord.lat},${coord.lon}`;

  return (
    <div className=" mx-auto flex flex-col">
      <div className=" mb-4  bg-[#bccfe1] dark:bg-gray-800 dark:border-gray-200 dark:shadow-sm  rounded-2xl min-h-[100px] p-4">
        <p>Current Local Time</p>
        <strong>{time.toLocaleTimeString()}</strong>
        <h2 className="text-3xl font-bold">
          {name}, {sys.country}
        </h2>
        <p className="text-sm text-gray-600">
          🌍 Latitude: <span className="font-medium">{coord.lat}</span> |
          Longitude: <span className="font-medium">{coord.lon}</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 ">
        <div className=" bg-[#bccfe1] dark:bg-gray-800 dark:border-gray-200 dark:shadow-sm rounded-xl flex flex-col items-start w-full text-start gap-4 p-4">
          <img
            src={iconUrl}
            alt={weather[0].description}
            className="w-24 h-24 "
          />
          <p className="text-4xl font-bold">{main.temp}°C</p>
          <div>
            <p className="text-sm capitalize">{weather[0].description}</p>
            <p className="text-sm text-gray-500">
              Feels like: {main.feels_like}°C
            </p>
          </div>
        </div>
        <div className="border overflow-hidden rounded-xl">
          <iframe
            src={mapUrl}
            width="100%"
            height="240"
            style={{ border: 0, borderRadius: "20px" }}
            allowFullScreen
            loading="lazy"
            title="City Location"
          ></iframe>
        </div>
      </div>

      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <p className="h-full flex flex-col justify-between bg-[#bccfe1] dark:text-white dark:bg-gray-800 dark:border-gray-200 dark:shadow-sm rounded-xl p-2">
          <span className="flex items-center gap-1 mb-1">
            <Droplet size={14} />
            <span className="font-bold text-black dark:text-white">
              Humidity
            </span>
          </span>
          {main.humidity}%
        </p>

        <p className="h-full flex flex-col justify-between bg-[#bccfe1] dark:text-white dark:bg-gray-800 dark:border-gray-200 dark:shadow-sm rounded-xl p-2">
          <span className="flex items-center gap-1 mb-1">
            <Wind size={14} />
            <span className="font-bold text-black dark:text-white">Wind</span>
          </span>
          {wind.speed} m/s, {wind.deg}°
        </p>

        <p className="h-full flex flex-col justify-between bg-[#bccfe1] dark:text-white dark:bg-gray-800 dark:border-gray-200 dark:shadow-sm rounded-xl p-2">
          <span className="flex items-center gap-1 mb-1">
            <Cloud size={14} />
            <span className="font-bold text-black dark:text-white">
              Cloudiness
            </span>
          </span>
          {clouds.all}%
        </p>

        <p className="h-full flex flex-col justify-between bg-[#bccfe1] dark:text-white dark:bg-gray-800 dark:border-gray-200 dark:shadow-sm rounded-xl p-2">
          <span className="flex items-center gap-1 mb-1">
            <Eye size={14} />
            <span className="font-bold text-black dark:text-white">
              Visibility
            </span>
          </span>
          {visibility / 1000} km
        </p>

        <p className="h-full flex flex-col justify-between bg-[#bccfe1] dark:text-white dark:bg-gray-800 dark:border-gray-200 dark:shadow-sm rounded-xl p-2">
          <span className="flex items-center gap-1 mb-1">
            <Sun size={14} />
            <span className="font-bold text-black dark:text-white">
              Sunrise
            </span>
          </span>
          {formatTime(sys.sunrise)}
        </p>

        <p className="h-full flex flex-col justify-between bg-[#bccfe1] dark:text-white dark:bg-gray-800 dark:border-gray-200 dark:shadow-sm rounded-xl p-2">
          <span className="flex items-center gap-1 mb-1">
            <Sun size={14} />
            <span className="font-bold text-black dark:text-white">Sunset</span>
          </span>
          {formatTime(sys.sunset)}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
