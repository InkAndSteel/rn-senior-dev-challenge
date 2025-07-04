import React, { useCallback, useMemo } from "react";
import { Text, View } from "react-native";
import { CityWeatherData } from "src/api/weatherTypes";
import { styles } from "src/theme";

interface WeatherCardProps {
  cityData: CityWeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ cityData }) => {
  const formatTime = useCallback((timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }, []);

  const formattedTime = useMemo(() => {
    return formatTime(cityData.lastUpdated);
  }, [formatTime, cityData.lastUpdated]);

  const temperatureText = useMemo(() => {
    return `${cityData.temperature}°C`;
  }, [cityData.temperature]);

  const feelsLikeText = useMemo(() => {
    return `${cityData.feelsLike}°C`;
  }, [cityData.feelsLike]);

  const humidityText = useMemo(() => {
    return `${cityData.humidity}%`;
  }, [cityData.humidity]);

  const windSpeedText = useMemo(() => {
    return `${cityData.windSpeed} km/h`;
  }, [cityData.windSpeed]);

  return (
    <View style={styles.weatherCard}>
      <View style={styles.weatherCardHeader}>
        <View>
          <Text style={styles.weatherCityName}>{cityData.name}</Text>
          <Text style={styles.weatherCountry}>{cityData.country}</Text>
        </View>
        <Text style={styles.weatherTemp}>{temperatureText}</Text>
      </View>

      <Text style={styles.weatherDescription}>{cityData.description}</Text>

      <View style={styles.weatherDetails}>
        <View style={styles.weatherDetailItem}>
          <Text style={styles.weatherDetailLabel}>Feels like</Text>
          <Text style={styles.weatherDetailValue}>{feelsLikeText}</Text>
        </View>

        <View style={styles.weatherDetailItem}>
          <Text style={styles.weatherDetailLabel}>Humidity</Text>
          <Text style={styles.weatherDetailValue}>{humidityText}</Text>
        </View>

        <View style={styles.weatherDetailItem}>
          <Text style={styles.weatherDetailLabel}>Wind</Text>
          <Text style={styles.weatherDetailValue}>{windSpeedText}</Text>
        </View>

        <View style={styles.weatherDetailItem}>
          <Text style={styles.weatherDetailLabel}>Updated</Text>
          <Text style={styles.weatherDetailValue}>{formattedTime}</Text>
        </View>
      </View>
    </View>
  );
};
