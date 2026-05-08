import React from "react";
import { Pressable, Text } from "react-native";
import { styles } from "../styles/eventForm.styles";

const FormSubmitButton = ({ onPress }: any) => {
  return (
    <Pressable style={styles.submit} onPress={onPress}>
      <Text style={{ color: "white" }}>Créer événement</Text>
    </Pressable>
  );
};

export default FormSubmitButton;
