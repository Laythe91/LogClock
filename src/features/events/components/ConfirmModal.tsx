import React from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store";

type ActionType = "accept" | "decline" | "delete";

type Props = {
  visible: boolean;
  action: ActionType | null;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmModal = ({ visible, action, onCancel, onConfirm }: Props) => {
  const { current, translations } = useSelector(
    (state: RootState) => state.locales,
  );

  const t = translations[current];

  const getText = () => {
    switch (action) {
      case "delete":
        return t.events.modal.confirmDeleteEvent;

      case "accept":
        return t.events.modal.confirmAccept;

      case "decline":
        return t.events.modal.confirmDecline;

      default:
        return "";
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>{t.events.modal.confirmation}</Text>

          <Text style={styles.text}>{getText()}</Text>

          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.cancelBtn,
                pressed && styles.pressed,
              ]}
              onPress={onCancel}
            >
              <Text>{t.common.cancel}</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.confirmBtn,
                pressed && styles.pressed,
              ]}
              onPress={onConfirm}
            >
              <Text style={{ color: "white" }}>{t.common.confirm}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },

  text: {
    marginBottom: 20,
    color: "#333",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  cancelBtn: {
    flex: 1,
    padding: 10,
    backgroundColor: "#bdc3c7",
    borderRadius: 6,
    alignItems: "center",
  },

  confirmBtn: {
    flex: 1,
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 6,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.97 }],
  },
});

export default ConfirmModal;
