import React from "react";
import { Pressable, Text } from "react-native";
import { styles } from "../../styles/eventForm.styles";

const FormSubmitButton = ({ onPress, label }: any) => {
  return (
    <Pressable style={styles.submit} onPress={onPress}>
      <Text style={{ color: "white" }}>{label}</Text>
    </Pressable>
  );
};

export default FormSubmitButton;
