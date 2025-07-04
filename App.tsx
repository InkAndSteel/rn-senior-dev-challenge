import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { RootNavigator } from "src/navigation/RootNavigator";
import { store } from "src/store";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
};

registerRootComponent(App);
