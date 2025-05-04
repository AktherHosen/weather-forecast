import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchWeather } from "../../utils/api";

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

interface WeatherState {
  city: string;
  data: WeatherData | null;
  loading: boolean;
  error: string;
  history: string[];
}

export const getWeather = createAsyncThunk<WeatherData, string>(
  "weather/getWeather",
  async (city: string, { rejectWithValue }) => {
    try {
      return await fetchWeather(city);
    } catch (error) {
      return rejectWithValue("City not found");
    }
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
  } as WeatherState,
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
        state.data = null;
      })
      .addCase(
        getWeather.fulfilled,
        (state, action: PayloadAction<WeatherData>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCity, addSearchHistory, removeSearchHistory, clearHistory } =
  weatherSlice.actions;
export default weatherSlice.reducer;
