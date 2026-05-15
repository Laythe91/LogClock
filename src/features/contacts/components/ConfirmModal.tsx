import React from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  action: ContactAction | null;
  contactName?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

// src/features/contacts/components/ContactConfirmModal.tsx

export type ContactAction = "delete" | "block" | "unblock";

const getMessage = (action: ContactAction | null, name?: string) => {
  switch (action) {
    case "delete":
      return `Supprimer ${name} de tes contacts ?`;

    case "block":
      return `Bloquer ${name} ?`;

    case "unblock":
      return `Débloquer ${name} ?`;

    default:
      return "";
  }
};

const ConfirmModal = ({
  visible,
  action,
  contactName,
  onCancel,
  onConfirm,
}: Props) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Confirmation</Text>

          <Text style={styles.text}>{getMessage(action, contactName)}</Text>

          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.cancelBtn,
                pressed && styles.pressed,
              ]}
              onPress={onCancel}
            >
              <Text>Annuler</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.confirmBtn,
                pressed && styles.pressed,
              ]}
              onPress={onConfirm}
            >
              <Text style={{ color: "white" }}>Confirmer</Text>
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
