import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchWeather } from "../../utils/api";

// Define types for the weather data
interface WeatherData {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  weather: { description: string; icon: string }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  wind: { speed: number; deg: number };
  clouds: { all: number };
  visibility: number;
  coord: { lat: number; lon: number };
}

// Define the initial state type
interface WeatherState {
  city: string;
  data: WeatherData | null;
  loading: boolean;
  error: string;
  history: string[];
}

// Create the async thunk to fetch weather data
export const getWeather = createAsyncThunk<WeatherData, string>(
  "weather/getWeather",
  async (city: string) => {
    return await fetchWeather(city);
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: "",
    data: null,
    loading: false,
    error: "",
    history: [] as string[],
  } as WeatherState, // Adding type to initialState
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    addSearchHistory(state, action: PayloadAction<string>) {
      const newCity = action.payload;
      if (!state.history.includes(newCity)) {
        state.history.unshift(newCity);
      }
      if (state.history.length > 5) {
        state.history.pop();
      }
    },
    removeSearchHistory(state, action: PayloadAction<string>) {
      state.history = state.history.filter((city) => city !== action.payload);
    },
    clearHistory(state) {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        getWeather.fulfilled,
        (state, action: PayloadAction<WeatherData>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getWeather.rejected, (state) => {
        state.loading = false;
        state.error = "City not found";
      });
  },
});

export const { setCity, addSearchHistory, removeSearchHistory, clearHistory } =
  weatherSlice.actions;
export default weatherSlice.reducer;
