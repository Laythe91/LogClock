import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Friend } from "../../../types/Friend";

interface FriendItemProps {
  friend: Friend;
  onPress: () => void;
}

const FriendItem = ({ friend, onPress }: FriendItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          transform: [{ scale: pressed ? 0.98 : 1 }],
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Image source={{ uri: friend.profileImage }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>
          {friend.firstName} {friend.lastName}
        </Text>
        <Text style={styles.email}>{friend.email}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
};

export default FriendItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "white",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  email: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  arrow: {
    fontSize: 24,
    color: "#ccc",
    marginLeft: 10,
  },
});
