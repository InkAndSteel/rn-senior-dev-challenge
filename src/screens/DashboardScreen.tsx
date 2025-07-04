import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { logout } from "src/store/authSlice";
import { useAppDispatch } from "src/store/hooks";
import { styles } from "src/theme";

export const DashboardScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weather Dashboard</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Welcome to Health Environment Tracker!</Text>
          <Text style={styles.placeholderSubtext}>Weather data and recommendations will appear here.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Weather</Text>
          <View style={styles.card}>
            <Text style={styles.bodyText}>Loading weather data...</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity Recommendations</Text>
          <View style={styles.card}>
            <Text style={styles.bodyText}>Recommendations will be generated based on weather conditions.</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

