import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

import { Friend } from "../../../types/Friend";

interface FriendCardProps {
  friend: Friend | null;
  onClose: () => void;
}

const FriendCard = ({ friend, onClose }: FriendCardProps) => {
  if (!friend) return null; // Sécurité si aucun ami n'est sélectionné

  return (
    <View style={styles.card}>
      <Image source={{ uri: friend.profileImage }} style={styles.bigAvatar} />

      <Text style={styles.fullName}>
        {friend.firstName} {friend.lastName}
      </Text>
      <Text style={styles.detailText}>📧 {friend.email}</Text>
      <Text style={styles.detailText}>📞 {friend.phone}</Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.closeButton]}
          onPress={onClose}
        >
          <Text style={styles.buttonText}>Fermer</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FriendCard;

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
  },
  button: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#eee",
  },
  buttonText: {
    fontWeight: "600",
    color: "#333",
  },
});
