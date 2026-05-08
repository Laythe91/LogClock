import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "../../styles/eventForm.styles";

type Props = {
  label: string;
  value: number;

  onPressDate: () => void;
  onPressTime?: () => void;

  error?: string;

  hideTime?: boolean;
};

const FormDateTimeField = ({
  label,
  value,
  onPressDate,
  onPressTime,
  error,
  hideTime,
}: Props) => {
  const current = new Date(value);

  return (
    <View style={{ marginBottom: 16 }}>
      <Text>{label}</Text>

      <View style={styles.TextRow}>
        <Text style={styles.halfText}>Date</Text>
        {!hideTime && <Text style={styles.halfText}>Heure</Text>}
      </View>

      <View style={styles.dateRow}>
        <Pressable style={styles.halfBtn} onPress={onPressDate}>
          <Text>{current.toLocaleDateString()}</Text>
        </Pressable>

        {!hideTime && (
          <Pressable style={styles.halfBtn} onPress={onPressTime}>
            <Text>
              {current.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Pressable>
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default FormDateTimeField;
