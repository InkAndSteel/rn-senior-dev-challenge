import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { clearError, registerUser } from "src/store/authSlice";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { styles } from "src/theme";
import { AuthStackParamList } from "src/types/navigation";

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Register">;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      Alert.alert(t("common.error"), error);
      dispatch(clearError());
    }
  }, [error, dispatch, t]);

  const handleNavigateToLogin = useCallback(() => {
    navigation.navigate("Login");
  }, [navigation]);

  const handleRegister = useCallback(async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert(t("common.error"), t("auth.fillAllFields"));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t("common.error"), t("auth.passwordsDoNotMatch"));
      return;
    }

    if (password.length < 6) {
      Alert.alert(t("common.error"), t("auth.passwordTooShort"));
      return;
    }

    const result = await dispatch(registerUser({ email, password }));
    if (registerUser.fulfilled.match(result)) {
      Alert.alert(t("common.success"), t("auth.accountCreatedSuccessfully"), [
        { text: t("common.ok"), onPress: handleNavigateToLogin }
      ]);
    }
  }, [email, password, confirmPassword, dispatch, handleNavigateToLogin, t]);

  const buttonStyle = useMemo(() => {
    return isLoading ? styles.buttonDisabled : styles.button;
  }, [isLoading]);

  const buttonText = useMemo(() => {
    return isLoading ? t("auth.creatingAccount") : t("app.createAccount");
  }, [isLoading, t]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.centeredContent}>
        <Text style={styles.title}>{t("app.createAccount")}</Text>
        <Text style={styles.subtitle}>{t("app.joinApp")}</Text>

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

        <TextInput
          style={styles.input}
          placeholder={t("auth.confirmPassword")}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={buttonStyle} onPress={handleRegister} disabled={isLoading}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={handleNavigateToLogin}>
          <Text style={styles.linkText}>{t("auth.alreadyHaveAccount")}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
