import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../core/store";

import { Contact } from "../../../types/Contact";
import { blockUser, unblockUser, deleteContact } from "../contactsThunk";
import { selectContactStatus } from "../contactsSelectors";

import ConfirmModal, { ContactAction } from "./ConfirmModal";

interface ContactCardProps {
  contact: Contact | null;
  onClose: () => void;
}

const ContactCard = ({ contact, onClose }: ContactCardProps) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState<ContactAction | null>(null);

  if (!contact) return null;

  const status = useSelector((state: RootState) =>
    selectContactStatus(state, contact.id),
  );

  const isBlocked = status === "blocked";

  const openConfirm = (type: ContactAction) => {
    setAction(type);
    setVisible(true);
  };

  const handleConfirm = () => {
    if (!action) return;

    if (action === "delete") {
      dispatch(deleteContact(contact.id) as any);
    }

    if (action === "block") {
      dispatch(blockUser(contact.id) as any);
    }

    if (action === "unblock") {
      dispatch(unblockUser(contact.id) as any);
    }

    setVisible(false);
    onClose();
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: contact.profileImage }} style={styles.bigAvatar} />

      <Text style={styles.fullName}>
        {contact.firstName} {contact.lastName}
      </Text>

      <Text style={styles.detailText}>📧 {contact.email}</Text>
      <Text style={styles.detailText}>📞 {contact.phone}</Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.deleteButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => openConfirm("delete")}
        >
          <Text style={styles.buttonText}>Supprimer</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            isBlocked ? styles.unblockButton : styles.blockButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => openConfirm(isBlocked ? "unblock" : "block")}
        >
          <Text style={styles.buttonText}>
            {isBlocked ? "Débloquer" : "Bloquer"}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.closeButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={onClose}
        >
          <Text style={styles.buttonText}>Fermer</Text>
        </Pressable>
      </View>

      {/* 🔥 ICI TON MODAL EXISTANT */}
      <ConfirmModal
        visible={visible}
        action={action}
        contactName={`${contact.firstName} ${contact.lastName}`}
        onCancel={() => setVisible(false)}
        onConfirm={handleConfirm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },

  bigAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#1E90FF",
  },

  fullName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },

  detailText: {
    fontSize: 16,
    color: "#666",
    marginVertical: 4,
  },

  buttonContainer: {
    marginTop: 25,
    width: "100%",
    gap: 12,
  },

  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  blockButton: {
    backgroundColor: "#ffb300",
  },

  unblockButton: {
    backgroundColor: "#4caf50",
  },

  deleteButton: {
    backgroundColor: "#e53935",
  },

  closeButton: {
    backgroundColor: "#eee",
  },

  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 15,
  },

  deleteButtonText: {
    fontWeight: "700",
    color: "white",
    fontSize: 15,
  },

  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
});

export default ContactCard;
