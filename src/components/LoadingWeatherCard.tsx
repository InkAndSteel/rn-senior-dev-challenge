import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, View } from "react-native";
import { colors, styles } from "src/theme";

export const LoadingWeatherCard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.loadingCard}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loadingText}>{t("weather.loadingWeatherData")}</Text>
    </View>
  );
};
