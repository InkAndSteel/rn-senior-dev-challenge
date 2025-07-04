import React from "react";
import { Text, View } from "react-native";
import { CityWeatherData } from "src/api/weatherTypes";
import { styles } from "src/theme";

interface WeatherCardProps {
  cityData: CityWeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ cityData }) => {
  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <View style={styles.weatherCard}>
      <View style={styles.weatherCardHeader}>
        <View>
          <Text style={styles.weatherCityName}>{cityData.name}</Text>
          <Text style={styles.weatherCountry}>{cityData.country}</Text>
        </View>
        <Text style={styles.weatherTemp}>{cityData.temperature}°C</Text>
      </View>

      <Text style={styles.weatherDescription}>{cityData.description}</Text>

      <View style={styles.weatherDetails}>
        <View style={styles.weatherDetailItem}>
          <Text style={styles.weatherDetailLabel}>Feels like</Text>
          <Text style={styles.weatherDetailValue}>{cityData.feelsLike}°C</Text>
        </View>

        <View style={styles.weatherDetailItem}>
          <Text style={styles.weatherDetailLabel}>Humidity</Text>
          <Text style={styles.weatherDetailValue}>{cityData.humidity}%</Text>
        </View>

        <View style={styles.weatherDetailItem}>
          <Text style={styles.weatherDetailLabel}>Wind</Text>
          <Text style={styles.weatherDetailValue}>{cityData.windSpeed} km/h</Text>
        </View>

        <View style={styles.weatherDetailItem}>
          <Text style={styles.weatherDetailLabel}>Updated</Text>
          <Text style={styles.weatherDetailValue}>{formatTime(cityData.lastUpdated)}</Text>
        </View>
      </View>
    </View>
  );
};
