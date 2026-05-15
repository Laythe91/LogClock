import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { ParticipantStatus } from "../../../types/Event";

type Props = {
  item: {
    id: string;
    name: string;
    status: ParticipantStatus;
  };
  currentUserId: string;
  canLeave: boolean;
};

const statusColor = {
  accepted: "#2ecc71",
  pending: "#f1c40f",
  declined: "#e74c3c",
};

const EventParticipantItem = ({ item, currentUserId, canLeave }: Props) => {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const showLeaveButton = canLeave && item.id === currentUserId;
  return (
    <View style={styles.card}>
      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
      </View>

      {/* Status */}
      <View
        style={[styles.badge, { backgroundColor: statusColor[item.status] }]}
      >
        <Text style={styles.badgeText}>{item.status}</Text>
      </View>

      {/* BUTTON */}
      {showLeaveButton && (
        <Pressable style={styles.leaveButton}>
          <Text style={styles.leaveText}>Se retirer</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  avatarText: {
    color: "white",
    fontWeight: "bold",
  },

  info: {
    flex: 1,
  },

  name: {
    fontWeight: "bold",
    fontSize: 14,
  },

  role: {
    fontSize: 12,
    color: "gray",
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  leaveButton: {
    marginLeft: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#e74c3c",
    borderRadius: 6,
  },

  leaveText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default EventParticipantItem;
