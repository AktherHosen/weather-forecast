import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeather } from "../../utils/api";

export const getWeather = createAsyncThunk(
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
  },
  reducers: {
    setCity(state, action) {
      state.city = action.payload;
    },
    addSearchHistory(state, action) {
      const newCity = action.payload;
      if (!state.history.includes(newCity)) {
        state.history.unshift(newCity);
      }
      if (state.history.length > 5) {
        state.history.pop();
      }
    },
    removeSearchHistory(state, action) {
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
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getWeather.rejected, (state) => {
        state.loading = false;
        state.error = "City not found";
      });
  },
});

export const { setCity, addSearchHistory, removeSearchHistory, clearHistory } =
  weatherSlice.actions;
export default weatherSlice.reducer;
