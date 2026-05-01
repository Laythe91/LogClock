import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Contact } from "../../../types/Contact";

interface ContactItemProps {
  contact: Contact;
  onPress: () => void;
}

const ContactItem = ({ contact, onPress }: ContactItemProps) => {
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
      <Image source={{ uri: contact.profileImage }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>
          {contact.firstName} {contact.lastName}
        </Text>
        <Text style={styles.email}>{contact.email}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
};

export default ContactItem;

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
