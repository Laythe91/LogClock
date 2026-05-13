import React from "react";
import { Pressable, Text } from "react-native";
import { styles } from "../../styles/eventForm.styles";

type Props = {
  count: number;
  onPress: () => void;
  t: any;
};

const FormParticipantsButton = ({ count, t, onPress }: Props) => {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      <Text>
        {t.events.form.chooseParticipants} ({count})
      </Text>
    </Pressable>
  );
};

export default FormParticipantsButton;
