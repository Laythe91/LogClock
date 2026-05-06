import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store";
import { ParticipantStatus, RootStackParamList } from "../../../types/Event";
import EventParticipantItem from "../components/EventParticipantsItem";
import ConfirmModal from "../components/ConfirmModal";

import {
  selectEventFullDetails,
  selectParticipantsByStatus,
} from "../eventsSelectors";

type EventDetailsRoute = RouteProp<RootStackParamList, "EventDetails">;

const STATUS_OPTIONS = [
  { value: "accepted", label: "Accepté" },
  { value: "declined", label: "Refusé" },
];

type ConfirmAction = "accept" | "decline" | "delete";

const EventDetailsScreen = () => {
  const currentUserId = useSelector((state: RootState) => state.auth.userId);
  if (!currentUserId) return null;

  const route = useRoute<EventDetailsRoute>();
  const { eventId, filter } = route.params;
  const event = useSelector((state: RootState) =>
    selectEventFullDetails(state, eventId),
  );

  const participants = useSelector((state: RootState) =>
    selectParticipantsByStatus(state, eventId, activeStatus),
  );

  const isInvitedView = filter === "invited";
  const isOwnerView = filter === "created";

  // 🔥 séparation current user / autres
  const currentUserParticipant = participants.find(
    (p) => p.id === currentUserId,
  );

  const otherParticipants = participants.filter((p) => p.id !== currentUserId);

  const [activeStatus, setActiveStatus] = useState<
    ParticipantStatus | undefined
  >(undefined);

  const [modalVisible, setModalVisible] = useState(false);

  const [pendingAction, setPendingAction] = useState<ConfirmAction | null>(
    null,
  );

  const openConfirm = (action: ConfirmAction) => {
    console.log("OPEN MODAL:", action);
    setPendingAction(action);
    setModalVisible(true);
  };

  const handleStatusPress = (status: "accepted" | "declined") => {
    if (!currentUserParticipant) return;

    if (currentUserParticipant.status === status) return;

    const actionMap = {
      accepted: "accept",
      declined: "decline",
    } as const;

    openConfirm(actionMap[status]);
  };

  const confirmAction = () => {
    if (!pendingAction) return;

    console.log("ACTION:", pendingAction);

    // 👉 ici tu feras tes dispatch / API

    setModalVisible(false);
    setPendingAction(null);
  };

  console.log("MODAL:", modalVisible);

  const tabs: { label: string; value?: ParticipantStatus }[] = [
    { label: "All", value: undefined },
    { label: "Going", value: "accepted" },
    { label: "Maybe", value: "pending" },
    { label: "Declined", value: "declined" },
  ];

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

      {/* OWNER CARD */}
      {isOwnerView && (
        <View style={styles.ownerCard}>
          <Text style={styles.ownerTitle}>Gestion de l’événement</Text>

          <View style={styles.ownerActions}>
            <Pressable
              style={[styles.ownerBtn, styles.editBtn]}
              onPress={() => console.log("EDIT EVENT")}
            >
              <Text style={styles.ownerText}>Modifier</Text>
            </Pressable>

            <Pressable
              style={[styles.ownerBtn, styles.deleteBtn]}
              onPress={() => openConfirm("delete")}
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
                currentUserParticipant.status === "accepted"
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
                currentUserParticipant.status === "declined"
                  ? styles.optionDeclined
                  : styles.optionInactive,
                pressed && styles.optionPressed,
              ]}
            >
              <Text style={styles.optionText}>Refusé</Text>
            </Pressable>
          </View>

          {/* pending */}
          {currentUserParticipant.status === "pending" && (
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
  optionPressed: {
    opacity: 0.6,
    transform: [{ scale: 0.97 }],
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
});
export default EventDetailsScreen;
