import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { clearError, loginUser } from "src/store/authSlice";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { styles } from "src/theme";
import { AuthStackParamList } from "src/types/navigation";

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Login">;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      Alert.alert(t("common.error"), error);
      dispatch(clearError());
    }
  }, [error, dispatch, t]);

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      Alert.alert(t("common.error"), t("auth.fillAllFields"));
      return;
    }

    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      Alert.alert(t("common.success"), t("auth.loginSuccessful"));
    }
  }, [email, password, dispatch, t]);

  const handleNavigateToRegister = useCallback(() => {
    navigation.navigate("Register");
  }, [navigation]);

  const buttonStyle = useMemo(() => {
    return isLoading ? styles.buttonDisabled : styles.button;
  }, [isLoading]);

  const buttonText = useMemo(() => {
    return isLoading ? t("auth.signingIn") : t("auth.signIn");
  }, [isLoading, t]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.centeredContent}>
        <Text style={styles.title}>{t("app.title")}</Text>
        <Text style={styles.subtitle}>{t("app.signInToAccount")}</Text>

        <TextInput
          style={styles.input}
          placeholder={t("auth.email")}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder={t("auth.password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={buttonStyle} onPress={handleLogin} disabled={isLoading}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={handleNavigateToRegister}>
          <Text style={styles.linkText}>{t("auth.dontHaveAccount")}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
