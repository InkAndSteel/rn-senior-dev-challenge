import { createStackNavigator } from "@react-navigation/stack";
import { DashboardScreen } from "src/screens/DashboardScreen";
import { AppStackParamList } from "src/types/navigation";

const Stack = createStackNavigator<AppStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
};
