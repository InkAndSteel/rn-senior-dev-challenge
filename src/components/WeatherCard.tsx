import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { CityWeatherData } from "src/api/weatherTypes";
import { styles } from "src/theme";

interface WeatherCardProps {
  cityData: CityWeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ cityData }) => {
  const { t } = useTranslation();

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
          <Text style={styles.weatherDetailLabel}>{t("weather.feelsLike")}</Text>
          <Text style={styles.weatherDetailValue}>{feelsLikeText}</Text>
        </View>

        <View style={styles.weatherDetailItem}>
          <Text style={styles.weatherDetailLabel}>{t("weather.humidity")}</Text>
          <Text style={styles.weatherDetailValue}>{humidityText}</Text>
        </View>

        <View style={styles.weatherDetailItem}>
          <Text style={styles.weatherDetailLabel}>{t("weather.wind")}</Text>
          <Text style={styles.weatherDetailValue}>{windSpeedText}</Text>
        </View>

        <View style={styles.weatherDetailItem}>
          <Text style={styles.weatherDetailLabel}>{t("weather.updated")}</Text>
          <Text style={styles.weatherDetailValue}>{formattedTime}</Text>
        </View>
      </View>
    </View>
  );
};
