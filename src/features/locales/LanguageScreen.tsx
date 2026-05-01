import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setLocale, LocaleKey } from "./localesSlice";

export interface LanguageOption {
  id: LocaleKey;
  label: string;
  flag: string;
}

// --- Liste des langues pour l'interface de sélection ---
export const languages: LanguageOption[] = [
  { id: "fr", label: "Français", flag: "🇫🇷" },
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "ar", label: "العربية", flag: "🇸🇦" },
  { id: "ja", label: "日本語", flag: "🇯🇵" },
  { id: "zh", label: "中文", flag: "🇨🇳" },
  { id: "ko", label: "한국어", flag: "🇰🇷" },
  { id: "ru", label: "Русский", flag: "🇷🇺" },
  { id: "hi", label: "हिन्दी", flag: "🇮🇳" },
];

const LanguageScreen = () => {
  const dispatch = useDispatch();

  // 1. On récupère current, timezone ET translations depuis le store
  const { current, timezone, translations } = useSelector(
    (state: any) => state.locales,
  );

  // 2. On pointe sur les traductions de la langue actuelle
  const t = translations[current];

  return (
    <View style={styles.container}>
      {/* 3. On remplace les textes en dur par les variables du slice */}
      <Text style={styles.title}>{t.langSelect}</Text>

      <Text style={styles.subtitle}>{t.langSelect}</Text>

      <FlatList
        data={languages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.item,
              current === item.id && styles.selectedItem,
              {
                // L'effet de scale et d'opacité s'ajoute ici
                transform: [{ scale: pressed ? 0.95 : 1 }],
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={() => dispatch(setLocale(item.id as LocaleKey))}
          >
            <Text>
              {item.flag} {item.label}
            </Text>
            {current === item.id && <Text>✅</Text>}
          </Pressable>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.info}>{t.timezoneInfo} :</Text>

        {/* Si timezone est vide ou null, on affiche le message d'erreur traduit */}
        <Text style={[styles.timezoneText, !timezone && { color: "red" }]}>
          {timezone || t.timezoneError}
        </Text>

        <Text style={styles.hint}>{t.timezoneDetail}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 10 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 1,
    borderColor: "#4b4949",
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedItem: { borderColor: "#0b53c2", backgroundColor: "#f0f5ff" },
  footer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  info: { fontSize: 14, color: "#333" },
  timezoneText: { fontWeight: "bold", color: "#0b53c2", marginVertical: 5 },
  hint: { fontSize: 12, color: "#999", fontStyle: "italic" },
});

export default LanguageScreen;
