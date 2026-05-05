import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store";
import { ParticipantStatus, RootStackParamList } from "../../../types/Event";
import EventParticipantItem from "../components/EventParticipantsItem";
import {
  selectEventFullDetails,
  selectParticipantsByStatus,
} from "../eventsSelectors";

type EventDetailsRoute = RouteProp<RootStackParamList, "EventDetails">;

const EventDetailsScreen = () => {
  const currentUserId = useSelector((state: RootState) => state.auth.userId);
  if (!currentUserId) return null;

  const route = useRoute<EventDetailsRoute>();
  const { eventId, filter } = route.params;

  const isInvitedView = filter === "invited";
  const isOwnerView = filter === "created";

  const [activeStatus, setActiveStatus] = useState<
    ParticipantStatus | undefined
  >(undefined);

  const tabs: { label: string; value?: ParticipantStatus }[] = [
    { label: "All", value: undefined },
    { label: "Going", value: "accepted" },
    { label: "Maybe", value: "pending" },
    { label: "Declined", value: "declined" },
  ];

  const event = useSelector((state: RootState) =>
    selectEventFullDetails(state, eventId),
  );

  const participants = useSelector((state: RootState) =>
    selectParticipantsByStatus(state, eventId, activeStatus),
  );

  if (!event) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>

      <Text>Créé par : {event.creator?.name}</Text>
      <Text>Date début : {event.dateStart}</Text>
      <Text>Date fin : {event.dateEnd}</Text>

      {/* TABS */}
      <View style={styles.tabs}>
        {tabs.map((tab) => {
          const isActive = activeStatus === tab.value;

          return (
            <Pressable
              key={tab.label}
              onPress={() => setActiveStatus(tab.value)}
              style={({ pressed }) => [
                styles.tabItem,
                {
                  backgroundColor: isActive ? "#0F5FCC" : "#1E90FF",
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* LIST */}
      <Text style={styles.subtitle}>Participants :</Text>

      <FlatList
        data={participants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventParticipantItem
            item={item}
            currentUserId={currentUserId}
            canLeave={isInvitedView}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontWeight: "bold",
    marginTop: 20,
  },

  participant: {
    marginTop: 5,
  },

  tabs: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 8,
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 6,
  },

  tabText: {
    color: "white",
  },

  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EventDetailsScreen;
