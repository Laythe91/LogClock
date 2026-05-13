import React from "react";
import { Modal, FlatList, Pressable, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "../../styles/eventForm.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/store";

type Props = {
  visible: boolean;

  setVisible: (v: boolean) => void;

  watch: any;

  setValue: any;

  contacts: any[];
};

const FormParticipantsModal = ({
  visible,
  setVisible,
  watch,
  setValue,
  contacts,
}: Props) => {
  const participants = watch("participants") ?? [];
  const { current, translations } = useSelector(
    (state: RootState) => state.locales,
  );

  const t = translations[current];

  const toggle = (id: string) => {
    const updated = participants.includes(id)
      ? participants.filter((p: string) => p !== id)
      : [...participants, id];

    setValue("participants", updated, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.modal}>
        <Text style={styles.title}>{t.events.form.participantsTitle}</Text>

        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const selected = participants.includes(item.id);

            return (
              <Pressable
                style={[
                  styles.contact,

                  selected && {
                    backgroundColor: "#cce5ff",
                  },
                ]}
                onPress={() => toggle(item.id)}
              >
                <Text>
                  {item.firstName} {item.lastName}
                </Text>

                <Text>{selected ? "✔" : ""}</Text>
              </Pressable>
            );
          }}
        />

        <Pressable style={styles.submit} onPress={() => setVisible(false)}>
          <Text style={{ color: "white" }}>{t.common.validate}</Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

export default FormParticipantsModal;
