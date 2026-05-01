import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store";
import { selectUserById } from "../../contacts/contactsSelectors";
import { RootStackParamList } from "../../../core/navigation/types";

type EventDetailsRoute = RouteProp<RootStackParamList, "EventDetails">;

const EventDetailsScreen = () => {
  const route = useRoute<EventDetailsRoute>();
  const { eventId } = route.params;

  const event = useSelector(
    (state: RootState) => state.events.entities[eventId],
  );

  const creator = useSelector((state: RootState) =>
    event ? selectUserById(state, event.creatorId) : undefined,
  );

  // 👇 on transforme participants en array (propre pour FlatList)
  const participants = useMemo(() => {
    if (!event) return [];

    return Object.entries(event.participants).map(([userId, status]) => ({
      userId,
      status,
    }));
  }, [event]);

  const users = useSelector((state: RootState) => state.contacts.allProfiles);

  const getUser = (id: string) => users.find((u) => u.id === id);

  if (!event) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>

      <Text>
        Créé par : {creator?.firstName} {creator?.lastName}
      </Text>

      <Text>Date : {event.dateStart}</Text>

      <Text style={styles.subtitle}>Participants :</Text>

      <FlatList
        data={participants}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => {
          const user = getUser(item.userId);

          return (
            <Text style={styles.participant}>
              {user?.firstName} → {item.status}
            </Text>
          );
        }}
      />
    </View>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  section: { marginTop: 10, fontSize: 14 },
  subtitle: { marginTop: 20, fontWeight: "bold" },
  participant: { marginTop: 5 },
});
