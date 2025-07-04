import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { colors, styles } from "src/theme";

export const LoadingWeatherCard: React.FC = () => {
  return (
    <View style={styles.loadingCard}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loadingText}>Loading weather data...</Text>
    </View>
  );
};
