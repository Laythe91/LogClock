import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store";
import { selectMyEventsWithFilter } from "../eventsSelectors";
import { RootStackParamList } from "../../../types/Event";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EventCard from "../../calendar/components/EventCard";
// Assure-toi d'importer ton type

type EventsRouteProp = RouteProp<RootStackParamList, "Events">;

type NavProp = NativeStackNavigationProp<RootStackParamList, "Events">;

const EventsScreen = () => {
  const route = useRoute<EventsRouteProp>();
  const { filter } = route.params;
  console.log(route.params);

  console.log(filter);

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
                filter,
              })
            }
          >
            <Text style={styles.titleEvent}>{item.title}</Text>
            <Text>{item.description}</Text>
            <EventCard
              start={item.dateStart}
              end={item.dateEnd}
              allDay={item.allDay}
            />
          </Pressable>
        )}
      />
      {filter === "created" && (
        <Pressable
          onPress={() => navigation.navigate("EventCreate")}
          style={({ pressed }) => [styles.fab, pressed && styles.buttonPressed]}
        >
          <MaterialIcons name="add" size={28} color="white" />
        </Pressable>
      )}
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
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.94 }],
  },
  fab: {
    position: "absolute",
    bottom: 90, // au-dessus de la tab bar
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "royalblue",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
