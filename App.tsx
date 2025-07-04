import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { RootNavigator } from "src/navigation/RootNavigator";

export const App: React.FC = () => {
  return (
    <>
      <RootNavigator />
      <StatusBar style="auto" />
    </>
  );
};

registerRootComponent(App);
