import { NavigationContainer } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { AppNavigator } from "./AppNavigator";
import { AuthNavigator } from "./AuthNavigator";

export const RootNavigator: React.FC = () => {
  const [isAuthenticated] = useState(false);

  const navigator = useMemo(() => {
    return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
  }, [isAuthenticated]);

  return <NavigationContainer>{navigator}</NavigationContainer>;
};
