import { WeatherApiResponse } from "./weatherTypes";

const API_KEY = "fa6ba1cc021d3b189446395bcb0b68dd";
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
