import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store";
import { selectUserById } from "../../contacts/contactsSelectors";
import { RootStackParamList } from "../../../types/Event";
import { selectEventFullDetails } from "../eventsSelectors";

type EventDetailsRoute = RouteProp<RootStackParamList, "EventDetails">;

const EventDetailsScreen = () => {
  const route = useRoute<EventDetailsRoute>();
  const { eventId } = route.params;

  const event = useSelector((state: RootState) =>
    selectEventFullDetails(state, eventId),
  );

  if (!event) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>

      <Text>Créé par : {event.creator?.name}</Text>

      <Text>Date : {event.dateStart}</Text>

      <Text style={styles.subtitle}>Participants :</Text>

      <FlatList
        data={event.participants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.participant}>
            {item.name} → {item.status}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontWeight: "bold", marginTop: 20 },
  participant: { marginTop: 5 },
});

export default EventDetailsScreen;
