import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store";

const LoginScreen = () => {
  const { current, translations } = useSelector(
    (state: RootState) => state.locales,
  );
  const t = translations[current];

  const [showPassword, setShowPassword] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(t.errors.emailInvalid)
      .required(t.errors.emailRequired),
    password: Yup.string()
      .required(t.errors.passRequired)
      .min(6, t.errors.passTooShort),
  });

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    console.log("Données formatées :", data);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // Permet de cliquer sur les boutons même si le clavier est ouvert
        >
          <View style={styles.container}>
            {/* LOGO */}
            <View style={styles.logo}>
              <Image
                style={styles.image}
                source={require("../../../assets/LogclockLogo3.png")}
              />
              <Text style={styles.welcomeText}>{t.welcome}</Text>
            </View>

            {/* FORMULAIRE */}
            <View style={styles.formContainer}>
              <Text style={styles.title}>{t.loginTitle}</Text>

              <View style={styles.inputs}>
                {/* CHAMP EMAIL */}
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder={t.emailPlaceholder}
                      style={[
                        styles.textInput,
                        errors.email && styles.inputError,
                      ]}
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={(text) => {
                        onChange(text);
                        clearErrors("email");
                      }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  )}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}

                {/* CHAMP PASSWORD AVEC OEIL */}
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <View
                      style={[
                        styles.passwordContainer,
                        errors.password && styles.inputError,
                      ]}
                    >
                      <TextInput
                        placeholder={t.passwordPlaceholder}
                        style={styles.passwordInput}
                        placeholderTextColor="#999"
                        value={value}
                        onChangeText={(text) => {
                          onChange(text);
                          clearErrors("password");
                        }}
                        secureTextEntry={!showPassword}
                      />
                      <Pressable
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                      >
                        <Ionicons
                          name={showPassword ? "eye" : "eye-off"}
                          size={24}
                          color="#666"
                        />
                      </Pressable>
                    </View>
                  )}
                />
                {errors.password && (
                  <Text style={styles.errorText}>
                    {errors.password.message}
                  </Text>
                )}
              </View>

              {/* BOUTONS CONNEXION */}
              <View style={styles.buttonsGroup}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      transform: [{ scale: pressed ? 0.95 : 1 }], // 0.95 c'est souvent plus naturel que 0.9
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                >
                  <View style={[styles.connectButton]}>
                    <Text style={styles.textConnect}>{t.connectButton}</Text>
                  </View>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    {
                      transform: [{ scale: pressed ? 0.95 : 1 }], // 0.95 c'est souvent plus naturel que 0.9
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                >
                  <Text style={styles.forgetPassText}>{t.forgotPassword}</Text>
                </Pressable>
              </View>
            </View>

            {/* SECTION BAS DE PAGE (Créer compte) */}
            <View style={styles.footer}>
              <Pressable
                style={({ pressed }) => [
                  {
                    transform: [{ scale: pressed ? 0.95 : 1 }], // 0.95 c'est souvent plus naturel que 0.9
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <View style={styles.buttonStyle}>
                  <Text style={styles.textSignUp}>{t.createAccount}</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20, // Espace en bas pour le dernier bouton
  },
  logo: { alignItems: "center", marginTop: 20 },
  image: { width: 120, height: 120, resizeMode: "contain" },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
    color: "#333",
  },
  formContainer: { marginTop: 20 },
  title: { fontSize: 20, marginBottom: 20, fontWeight: "600" },
  inputs: { marginBottom: 15 },

  // Style de base des inputs
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    color: "#000",
    fontSize: 16,
  },

  // Modulaire : Container Password
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    color: "#000",
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },

  inputError: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginBottom: 10 },

  buttonsGroup: { alignItems: "center", marginTop: 10 },
  connectButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginBottom: 15,
  },
  textConnect: { color: "white", fontWeight: "bold", fontSize: 16 },
  forgetPassText: { color: "#666", marginBottom: 20 },

  // Footer modulaire (remplace le position absolute)
  footer: {
    flex: 1, // Prend tout l'espace restant pour pousser vers le bas
    justifyContent: "flex-end", // Pousse le contenu vers le bas du conteneur
    marginTop: 40, // Sécurité minimum
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: "#1E90FF",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  textSignUp: { color: "#1E90FF", fontWeight: "bold" },
});

export default LoginScreen;
