import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleNavigateToLogin = useCallback(() => {
    navigation.navigate("Login");
  }, [navigation]);

  const handleRegister = useCallback(async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    const result = await dispatch(registerUser({ email, password }));
    if (registerUser.fulfilled.match(result)) {
      Alert.alert("Success", "Account created successfully!", [{ text: "OK", onPress: handleNavigateToLogin }]);
    }
  }, [email, password, confirmPassword, dispatch, handleNavigateToLogin]);

  const buttonStyle = useMemo(() => {
    return isLoading ? styles.buttonDisabled : styles.button;
  }, [isLoading]);

  const buttonText = useMemo(() => {
    return isLoading ? "Creating Account..." : "Create Account";
  }, [isLoading]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.centeredContent}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join Health Environment Tracker</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={buttonStyle} onPress={handleRegister} disabled={isLoading}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={handleNavigateToLogin}>
          <Text style={styles.linkText}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
