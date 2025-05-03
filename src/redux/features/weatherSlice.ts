import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeather } from '../../utils/api';


export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (city: string) => {
    return await fetchWeather(city);
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    city: '',
    data: null,
    loading: false,
    error: '',
  },
  reducers: {
    setCity(state, action) {
      state.city = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getWeather.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'City not found or API error.';
      });
  },
});

export const { setCity } = weatherSlice.actions;
export default weatherSlice.reducer;
