import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { LanguageProvider } from "src/localization";
import "src/localization/i18n";
import { RootNavigator } from "src/navigation/RootNavigator";
import { store } from "src/store";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <RootNavigator />
        <StatusBar style="auto" />
      </LanguageProvider>
    </Provider>
  );
};

registerRootComponent(App);
