import { NavigationContainer } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { databaseService } from "src/database";
import { AppNavigator } from "src/navigation/AppNavigator";
import { AuthNavigator } from "src/navigation/AuthNavigator";
import { useAppSelector } from "src/store/hooks";

export const RootNavigator: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const initDatabase = useCallback(async () => {
    try {
      await databaseService.init();
      setIsInitialized(true);
    } catch (error) {
      console.error("Database initialization failed:", error);
    }
  }, []);

  useEffect(() => {
    initDatabase();
  }, [initDatabase]);

  const navigator = useMemo(() => {
    if (!isInitialized) return null;

    return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
  }, [isAuthenticated, isInitialized]);

  return <NavigationContainer>{navigator}</NavigationContainer>;
};
