import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { weatherApi } from "src/api/weatherApi";
import { CITIES, CityWeatherData, WeatherApiResponse, WeatherState } from "src/api/weatherTypes";

const initialState: WeatherState = {
  cities: {},
  isLoading: false,
  error: null,
  lastFetch: null
};

export const fetchWeatherForCity = createAsyncThunk(
  "weather/fetchWeatherForCity",
  async (cityName: string, { rejectWithValue }) => {
    try {
      const response: WeatherApiResponse = await weatherApi.getWeatherByCity(cityName);

      const cityData: CityWeatherData = {
        id: cityName.toLowerCase().replace(/\s+/g, "-"),
        name: response.name,
        country: response.sys.country,
        temperature: Math.round(response.main.temp),
        feelsLike: Math.round(response.main.feels_like),
        description: response.weather[0].description,
        icon: response.weather[0].icon,
        humidity: response.main.humidity,
        windSpeed: Math.round(response.wind.speed * 3.6),
        lastUpdated: Date.now()
      };

      return cityData;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch weather data";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchAllCitiesWeather = createAsyncThunk(
  "weather/fetchAllCitiesWeather",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const promises = CITIES.map((city) => dispatch(fetchWeatherForCity(city.name)));

      await Promise.all(promises);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch weather data for all cities";
      return rejectWithValue(errorMessage);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearWeatherData: (state) => {
      state.cities = {};
      state.lastFetch = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForCity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeatherForCity.fulfilled, (state, action: PayloadAction<CityWeatherData>) => {
        state.isLoading = false;
        state.cities[action.payload.id] = action.payload;
        state.lastFetch = Date.now();
      })
      .addCase(fetchWeatherForCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllCitiesWeather.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCitiesWeather.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllCitiesWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearError, clearWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
