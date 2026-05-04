import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store";
import { selectMyEventsWithFilter } from "../eventsSelectors";
import { RootStackParamList } from "../../../types/Event";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EventFilter } from "../../../types/Event";
// Assure-toi d'importer ton type

type EventsRouteProp = RouteProp<RootStackParamList, "Events">;

type NavProp = NativeStackNavigationProp<RootStackParamList, "Events">;

const EventsScreen = () => {
  const route = useRoute<EventsRouteProp>();
  const { filter } = route.params;

  const events = useSelector((state: RootState) =>
    selectMyEventsWithFilter(state, filter),
  );

  const navigation = useNavigation<NavProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EVENTS</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate("EventDetails", {
                eventId: item.id,
              })
            }
          >
            <Text style={styles.titleEvent}>{item.title}</Text>
            <Text>{item.description}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};
export default EventsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: {
    padding: 12,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  titleEvent: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
