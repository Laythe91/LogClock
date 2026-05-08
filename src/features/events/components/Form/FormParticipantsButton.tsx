import React from "react";
import { Pressable, Text } from "react-native";
import { styles } from "../../styles/eventForm.styles";

type Props = {
  count: number;
  onPress: () => void;
};

const FormParticipantsButton = ({ count, onPress }: Props) => {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      <Text>Choisir participants ({count})</Text>
    </Pressable>
  );
};

export default FormParticipantsButton;
