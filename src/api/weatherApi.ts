import Constants from "expo-constants";
import { WeatherApiResponse } from "./weatherTypes";

const API_KEY = Constants.expoConfig?.extra?.EXPO_PUBLIC_WEATHER_API_KEY || process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const weatherApi = {
  async getWeatherByCity(cityName: string): Promise<WeatherApiResponse> {
    const url = `${BASE_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Weather API error: ${response.status} ${response.statusText}`);
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }

    const data: WeatherApiResponse = await response.json();
    return data;
  }
};
