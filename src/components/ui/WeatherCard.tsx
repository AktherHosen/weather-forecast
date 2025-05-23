import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Cloud,
  Droplet,
  Eye,
  Search,
  Sun,
  Sunset,
  Thermometer,
  Wind,
} from "lucide-react";
import { CircleLoader } from "react-spinners";
import { toast } from "react-toastify";

const WeatherCard = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { data, loading, error } = useSelector((state: any) => state.weather);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (!data && !loading) {
    return (
      <div className="bg-[#bccfe1] dark:text-white dark:bg-gray-800 dark:border dark:border-gray-600 rounded-xl min-h-[100px] flex items-center justify-center px-4">
        <p className="text-gray-700 dark:text-gray-300 text-sm flex gap-1 items-center">
          <Search size={20} /> Search for a city to see the weather forecast.
        </p>
      </div>
    );
  }

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
    <div className="mx-auto flex flex-col gap-2">
      <div className="mb-4 dark:border dark:border-gray-600 bg-[#bccfe1] dark:bg-gray-800 dark:shadow-sm rounded-2xl min-h-[135px] p-6 space-y-2">
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

      <div className="flex dark:border dark:border-gray-600 rounded-xl flex-col md:flex-row justify-between gap-4">
        <div className="bg-[#bccfe1] dark:bg-gray-800 dark:border-gray-200 dark:shadow-sm rounded-xl flex flex-col w-full gap-2 p-6 min-h-[220px]">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <CircleLoader color="#3b82f6" size={40} />
            </div>
          ) : (
            <div className="flex justify-center sm:justify-between flex-wrap gap-4">
              <div>
                <img
                  src={iconUrl}
                  alt={weather[0].description}
                  className="w-24 h-24"
                />
                <p className="text-4xl font-bold">{main.temp}°C</p>
                <div>
                  <p className="text-sm capitalize">{weather[0].description}</p>
                  <p className="text-sm text-gray-500">
                    Feels like: {main.feels_like}°C
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl">
                <iframe
                  src={mapUrl}
                  width="100%"
                  className="h-full"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen
                  loading="lazy"
                  title="City Location"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="my-4 dark:border dark:border-gray-600 grid grid-cols-2 md:grid-cols-3 gap-4 w-full rounded-xl py-4">
        <p className="h-full flex flex-col justify-between bg-[#bccfe1] dark:text-white dark:bg-gray-800 dark:shadow-sm rounded-xl p-4">
          <span className="flex items-start gap-2">
            <Droplet size={20} className="mt-2" />
            <div>
              <span className="font-bold block text-black dark:text-white">
                Humidity
              </span>
              {main.humidity}%
            </div>
          </span>
        </p>
        <p className="h-full flex flex-col justify-between bg-[#bccfe1] dark:text-white dark:bg-gray-800  dark:shadow-sm rounded-xl p-4">
          <span className="flex items-start gap-2">
            <Wind size={20} className="mt-2" />
            <div>
              <span className="font-bold block text-black dark:text-white">
                Wind
              </span>
              {wind.speed} m/s, {wind.deg}°
            </div>
          </span>
        </p>
        <p className="h-full flex flex-col justify-between bg-[#bccfe1] dark:text-white dark:bg-gray-800 dark:shadow-sm rounded-xl p-4">
          <span className="flex items-start gap-2">
            <Cloud size={20} className="mt-2" />
            <div>
              <span className="font-bold block text-black dark:text-white">
                Cloudiness
              </span>
              {clouds.all}%
            </div>
          </span>
        </p>
        <p className="h-full flex flex-col justify-between bg-[#bccfe1] dark:text-white dark:bg-gray-800  dark:shadow-sm rounded-xl p-4">
          <span className="flex items-start gap-2">
            <Thermometer size={20} className="mt-2" />
            <div>
              <span className="font-bold block text-black dark:text-white">
                Pressure
              </span>
              {main.pressure} hPa
            </div>
          </span>
        </p>
        <p className="h-full flex flex-col justify-between bg-[#bccfe1] dark:text-white dark:bg-gray-800  dark:shadow-sm rounded-xl p-4">
          <span className="flex items-start gap-2">
            <Eye size={20} className="mt-2" />
            <div>
              <span className="font-bold block text-black dark:text-white">
                Visibility
              </span>
              {visibility / 1000} km
            </div>
          </span>
        </p>
        <p className="h-full flex flex-col justify-between bg-[#bccfe1] dark:text-white dark:bg-gray-800  dark:shadow-sm rounded-xl p-4">
          <span className="flex items-start gap-2">
            <Sun size={20} className="mt-2" />
            <div>
              <span className="font-bold block text-black dark:text-white">
                Air Quality
              </span>
              {clouds.all}
            </div>
          </span>
        </p>
      </div>

      <div className="dark:border dark:border-gray-600 flex justify-between items-start min-h-[200px] w-full bg-[#bccfe1] dark:text-white dark:bg-gray-800 dark:shadow-sm rounded-xl p-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-start gap-1">
            <Thermometer size={32} />
            <span className="font-bold text-black dark:text-white">
              Min Temp
            </span>
            <span className="text-sm">{main.temp_min}</span>
          </div>

          <div className="flex flex-col items-start gap-1">
            <Thermometer size={32} />
            <span className="font-bold text-black dark:text-white">
              Max Temp
            </span>
            <span className="text-sm">{main.temp_max}</span>
          </div>
        </div>

        <div className="flex flex-col gap-8 items-end">
          <div className="flex flex-col items-end gap-1">
            <Sun size={32} />
            <span className="font-bold text-black dark:text-white">
              Sunrise
            </span>
            <span className="text-sm">{formatTime(sys.sunrise)}</span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <Sunset size={32} />
            <span className="font-bold text-black dark:text-white">Sunset</span>
            <span className="text-sm">{formatTime(sys.sunset)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
