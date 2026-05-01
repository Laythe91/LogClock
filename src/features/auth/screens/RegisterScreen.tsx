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
import Ionicons from "@expo/vector-icons/Ionicons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "react-redux"; // Import pour Redux
import { RootState } from "../../../core/store"; // Ajuste le chemin selon ta structure

const RegisterScreen = () => {
  const { current, translations } = useSelector(
    (state: RootState) => state.locales,
  );
  const t = translations[current];

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const schema = Yup.object().shape({
    userName: Yup.string()
      .required(t.errors.userNameRequired)
      .matches(/^\S*$/, t.errors.noSpaces)
      .min(3, t.errors.userNameTooShort),
    email: Yup.string()
      .email(t.errors.emailInvalid)
      .required(t.errors.emailRequired),
    password: Yup.string()
      .required(t.errors.passRequired)
      .min(6, t.errors.passTooShort),
    confirmPassword: Yup.string()
      .required(t.errors.passRequired)
      .oneOf([Yup.ref("password")], t.errors.passMustMatch),
  });

  const {
    control,
    handleSubmit,
    clearErrors, // <-- On récupère clearErrors ici
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit", // On valide au clic, et on nettoie manuellement
  });

  const onSubmit = (data: any) => {
    console.log("Données envoyées :", data);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            <View style={styles.logo}>
              <Image
                style={styles.image}
                source={require("../../../assets/LogclockLogo3.png")}
              />
              <Text style={styles.welcomeText}>Log & Clock</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.title}>{t.SignUpTitle}</Text>

              <View style={styles.inputs}>
                {/* NOM D'UTILISATEUR */}
                <Controller
                  control={control}
                  name="userName"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder={t.UserNamePlaceholder}
                      style={[
                        styles.textInput,
                        errors.userName && styles.inputError,
                      ]}
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={(text) => {
                        onChange(text);
                        clearErrors("userName"); // <-- Efface l'erreur userName
                      }}
                      autoCapitalize="none"
                    />
                  )}
                />
                {errors.userName && (
                  <Text style={styles.errorText}>
                    {errors.userName.message}
                  </Text>
                )}

                {/* EMAIL */}
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
                        clearErrors("email"); // <-- Efface l'erreur email
                      }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  )}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}

                {/* MOT DE PASSE */}
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <View
                      style={[
                        styles.inputContainer,
                        errors.password && styles.inputError,
                      ]}
                    >
                      <TextInput
                        placeholder={t.passwordPlaceholder}
                        style={styles.textInputWithIcon}
                        placeholderTextColor="#999"
                        value={value}
                        onChangeText={(text) => {
                          onChange(text);
                          clearErrors("password"); // <-- Efface l'erreur password
                        }}
                        secureTextEntry={!showPassword}
                      />
                      <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                          name={showPassword ? "eye" : "eye-off"}
                          size={22}
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

                {/* CONFIRMATION MOT DE PASSE */}
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, value } }) => (
                    <View
                      style={[
                        styles.inputContainer,
                        errors.confirmPassword && styles.inputError,
                      ]}
                    >
                      <TextInput
                        placeholder={t.confirmPasswordPlaceholder}
                        style={styles.textInputWithIcon}
                        placeholderTextColor="#999"
                        value={value}
                        onChangeText={(text) => {
                          onChange(text);
                          clearErrors("confirmPassword"); // <-- Efface l'erreur confirmPassword
                        }}
                        secureTextEntry={!showConfirmPassword}
                      />
                      <Pressable
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <Ionicons
                          name={showConfirmPassword ? "eye" : "eye-off"}
                          size={22}
                          color="#666"
                        />
                      </Pressable>
                    </View>
                  )}
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>

              <View style={styles.buttons}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      transform: [{ scale: pressed ? 0.95 : 1 }], // 0.95 c'est souvent plus naturel que 0.9
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                  onPress={handleSubmit(onSubmit)}
                >
                  <View style={styles.connect}>
                    <Text style={styles.textConnect}>
                      {t.finishCreateAccount}
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 20 },
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
  inputs: { marginBottom: 20 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    paddingRight: 15,
  },
  textInputWithIcon: { flex: 1, padding: 15, color: "#000" },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    color: "#000",
  },
  inputError: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginBottom: 10 },
  buttons: { alignItems: "center", marginTop: 20 },
  connect: {
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
  },
  textConnect: { color: "white", fontWeight: "bold", fontSize: 16 },
});

export default RegisterScreen;
