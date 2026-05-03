import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";

const EventItem = ({ event, onPress }: any) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{event.title}</Text>

      <Text style={styles.date}>
        {new Date(event.dateStart).toLocaleString()}
      </Text>

      <Text style={styles.creator}>Créé par : {event.creatorId}</Text>
    </Pressable>
  );
};

export default EventItem;

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  date: { color: "gray", marginTop: 5 },
  creator: { marginTop: 5, fontSize: 12, color: "#666" },
});
