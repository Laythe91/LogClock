import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store";
import { ParticipantStatus, RootStackParamList } from "../../../types/Event";
import EventParticipantItem from "../components/EventParticipantsItem";
import {
  selectEventFullDetails,
  selectParticipantsByStatus,
} from "../eventsSelectors";
import ConfirmModal from "../components/ConfirmModal";
import { getEventRole } from "../hooks/useEventRole";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import EventCard from "../../calendar/components/EventCard";

type EventDetailsRoute = RouteProp<RootStackParamList, "EventDetails">;
type Nav = NativeStackNavigationProp<RootStackParamList, "EventCreate">;

type ConfirmAction = "accept" | "decline" | "delete";

const EventDetailsScreen = () => {
  const route = useRoute<EventDetailsRoute>();
  const { eventId } = route.params;
  const currentUserId = useSelector((state: RootState) => state.auth.userId);
  const event = useSelector((state: RootState) =>
    selectEventFullDetails(state, eventId),
  );
  const navigation = useNavigation<Nav>();
  console.log(`EVENT ID : ${eventId}`);

  if (!event) return null;
  if (!currentUserId) return null;

  const [activeStatus, setActiveStatus] = useState<
    ParticipantStatus | undefined
  >(undefined);

  const participants = useSelector((state: RootState) =>
    selectParticipantsByStatus(state, eventId, activeStatus),
  );
  const [modalVisible, setModalVisible] = useState(false);

  const [pendingAction, setPendingAction] = useState<ConfirmAction | null>(
    null,
  );

  const role = getEventRole(event, currentUserId);

  const isInvitedView = role.isInvited;
  const isOwnerView = role.isOwner;

  // 🔥 séparation current user / autres
  const currentUserParticipant = role.myStatus;

  const handleStatusPress = (status: "accepted" | "declined") => {
    if (!currentUserParticipant) return;

    if (currentUserParticipant === status) return;

    const actionMap = {
      accepted: "accept",
      declined: "decline",
    } as const;

    openConfirm(actionMap[status]);
  };

  const openConfirm = (action: typeof pendingAction) => {
    console.log("OPEN MODAL:", action);
    setPendingAction(action);
    setModalVisible(true);
  };

  const confirmAction = () => {
    if (!pendingAction) return;

    console.log("ACTION:", pendingAction);

    // 👉 ici tu feras tes dispatch / API

    setModalVisible(false);
    setPendingAction(null);
  };

  const tabs: { label: string; value?: ParticipantStatus }[] = [
    { label: "All", value: undefined },
    { label: "Going", value: "accepted" },
    { label: "Maybe", value: "pending" },
    { label: "Declined", value: "declined" },
  ];
  /*        <EventCard
          start={item.dateStart}
          end={item.dateEnd}
          allDay={item.allDay}
        />*/
  const otherParticipants = participants.filter((p) => p.id !== currentUserId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>

      <Text>Créé par : {event.creator?.name}</Text>
      <EventCard
        start={event.dateStart}
        end={event.dateEnd}
        allDay={event.allDay}
      />

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

      {/* OWNER CARD */}
      {isOwnerView && (
        <View style={styles.ownerCard}>
          <Text style={styles.ownerTitle}>Gestion de l’événement</Text>

          <View style={styles.ownerActions}>
            <Pressable
              style={({ pressed }) => [
                styles.ownerBtn,
                styles.editBtn,
                pressed && styles.ownerPressed,
              ]}
              onPress={() =>
                navigation.navigate("EventCreate", {
                  eventId,
                })
              }
            >
              <Text style={styles.ownerText}>Modifier</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.ownerBtn,
                styles.deleteBtn,
                pressed && styles.ownerPressed,
              ]}
              onPress={() => {
                openConfirm("delete");
              }}
            >
              <Text style={styles.ownerText}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* 👤 TON BLOC (UNIQUEMENT SI INVITED) */}
      {isInvitedView && currentUserParticipant && (
        <View style={styles.myCard}>
          <Text style={styles.myTitle}>Ma participation</Text>

          {/* SELECTOR */}
          <View style={styles.selector}>
            <Pressable
              onPress={() => handleStatusPress("accepted")}
              style={({ pressed }) => [
                styles.option,
                currentUserParticipant === "accepted"
                  ? styles.optionAccepted
                  : styles.optionInactive,
                pressed && styles.optionPressed,
              ]}
            >
              <Text style={styles.optionText}>Accepté</Text>
            </Pressable>

            <Pressable
              onPress={() => handleStatusPress("declined")}
              style={({ pressed }) => [
                styles.option,
                currentUserParticipant === "declined"
                  ? styles.optionDeclined
                  : styles.optionInactive,
                pressed && styles.optionPressed,
              ]}
            >
              <Text style={styles.optionText}>Refusé</Text>
            </Pressable>
          </View>

          {/* pending */}
          {currentUserParticipant === "pending" && (
            <Text style={styles.pendingText}>En attente de réponse</Text>
          )}
        </View>
      )}

      {/* LIST */}
      <Text style={styles.subtitle}>Participants :</Text>

      <FlatList
        data={isInvitedView || isOwnerView ? otherParticipants : participants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventParticipantItem
            item={item}
            currentUserId={currentUserId}
            canLeave={isInvitedView}
          />
        )}
      />

      <ConfirmModal
        visible={modalVisible}
        action={pendingAction}
        onCancel={() => setModalVisible(false)}
        onConfirm={confirmAction}
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
    color: "#E0E0E0",
    fontWeight: "bold",
  },

  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },

  // 👤 MY CARD
  myCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },

  myTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  // SELECTOR
  selector: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#ecf0f1",
  },

  option: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },

  optionText: {
    fontWeight: "bold",
    color: "white",
  },

  // 🟢 accepté actif
  optionAccepted: {
    backgroundColor: "#2ecc71",
  },

  // 🔴 refusé actif
  optionDeclined: {
    backgroundColor: "#e74c3c",
  },

  // ⚪ inactif (gris)
  optionInactive: {
    backgroundColor: "#bdc3c7",
  },

  pendingText: {
    marginTop: 8,
    color: "#999",
    fontStyle: "italic",
  },
  ownerCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },

  ownerTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  ownerActions: {
    flexDirection: "row",
    gap: 10,
  },

  ownerBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },

  editBtn: {
    backgroundColor: "#3498db",
  },

  deleteBtn: {
    backgroundColor: "#e74c3c",
  },

  ownerText: {
    color: "white",
    fontWeight: "bold",
  },
  optionPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.97 }],
  },
  ownerPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.97 }],
  },
});
export default EventDetailsScreen;
