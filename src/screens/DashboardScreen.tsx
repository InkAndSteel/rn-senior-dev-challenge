import { useCallback, useEffect, useMemo } from "react";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CITIES } from "src/api/weatherTypes";
import { LoadingWeatherCard, WeatherCard } from "src/components";
import { logout } from "src/store/authSlice";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { clearError, fetchAllCitiesWeather } from "src/store/weatherSlice";
import { styles } from "src/theme";

export const DashboardScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cities, isLoading, error } = useAppSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchAllCitiesWeather());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching weather data:", error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchAllCitiesWeather());
  }, [dispatch]);

  const renderWeatherCards = useCallback(() => {
    if (isLoading && Object.keys(cities).length === 0) {
      return CITIES.map((city) => <LoadingWeatherCard key={city.id} />);
    }

    return CITIES.map((city) => {
      const cityData = cities[city.id];
      if (cityData) {
        return <WeatherCard key={city.id} cityData={cityData} />;
      }
      return <LoadingWeatherCard key={city.id} />;
    });
  }, [isLoading, cities]);

  const refreshControl = useMemo(
    () => <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />,
    [isLoading, handleRefresh]
  );

  const activityRecommendationText = useMemo(() => {
    return Object.keys(cities).length > 0
      ? "Based on current weather conditions, consider indoor activities during extreme temperatures and outdoor activities during pleasant weather."
      : "Recommendations will be generated based on weather conditions.";
  }, [cities]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weather Dashboard</Text>
      </View>

      <ScrollView style={styles.content} refreshControl={refreshControl}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Welcome to Health Environment Tracker!</Text>
          <Text style={styles.placeholderSubtext}>Current weather conditions for major cities worldwide.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Weather</Text>
          <View style={styles.weatherGrid}>{renderWeatherCards()}</View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity Recommendations</Text>
          <View style={styles.card}>
            <Text style={styles.bodyText}>{activityRecommendationText}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
