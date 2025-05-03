import Navbar from "../../components/ui/Navbar";
import SearchHistory from "../../components/ui/SearchHistory";
import WeatherCard from "../../components/ui/WeatherCard";
const Home = () => {
  return (
    <div className="min-h-screen max-w-[1240px] mx-auto transition-colors duration-300 px-6 py-2">
      <Navbar />
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeatherCard />
        </div>
        <div className="lg:col-span-1">
          <SearchHistory />
        </div>
      </div>
    </div>
  );
};

export default Home;
