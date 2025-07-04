export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherWind {
  speed: number;
  deg: number;
}

export interface WeatherSys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherCoord {
  lon: number;
  lat: number;
}

export interface WeatherApiResponse {
  coord: WeatherCoord;
  weather: WeatherCondition[];
  base: string;
  main: WeatherMain;
  visibility: number;
  wind: WeatherWind;
  clouds: {
    all: number;
  };
  dt: number;
  sys: WeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface CityWeatherData {
  id: string;
  name: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  lastUpdated: number;
}

export interface WeatherState {
  cities: Record<string, CityWeatherData>;
  isLoading: boolean;
  error: string | null;
  lastFetch: number | null;
}

export const CITIES = [
  { name: "New York", id: "new-york" },
  { name: "London", id: "london" },
  { name: "Tokyo", id: "tokyo" }
] as const;
