import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { logout } from "src/store/authSlice";
import { useAppDispatch } from "src/store/hooks";

export const DashboardScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weather Dashboard</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Welcome to Health Environment Tracker!</Text>
          <Text style={styles.placeholderSubtext}>Weather data and recommendations will appear here.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Weather</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Loading weather data...</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity Recommendations</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Recommendations will be generated based on weather conditions.</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333"
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6
  },
  logoutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600"
  },
  content: {
    flex: 1,
    padding: 20
  },
  placeholder: {
    alignItems: "center",
    marginBottom: 32
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 8
  },
  placeholderSubtext: {
    fontSize: 16,
    color: "#666",
    textAlign: "center"
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center"
  }
});
