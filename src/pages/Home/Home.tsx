import SearchBar from "../../components/ui/SearchBar";
import WeatherCard from "../../components/ui/WeatherCard";
const Home = () => {
  return (
    <div>
      <h1 className="text-center">Home</h1>
      <SearchBar />
      <WeatherCard />
    </div>
  );
};

export default Home;
