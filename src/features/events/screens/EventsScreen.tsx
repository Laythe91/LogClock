import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store";
import { selectFilteredEvents } from "../eventsSelectors";
import { useRoute } from "@react-navigation/native";

const EventsScreen = () => {
  const route = useRoute<any>();
  const { filter } = route.params;

  const events = useSelector((state: RootState) =>
    selectFilteredEvents(state, filter),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{filter.toUpperCase()}</Text>

      <Text>{events.length} événements</Text>
    </View>
  );
};
export default EventsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 10,
  },
});
