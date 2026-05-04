import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DATA from "../../data";
import { FullUserData } from "../../types/User";
import { useSelector } from "react-redux";
import { RootState } from "../../core/store";
import { selectInvitedEventsCount } from "../events/eventsSelectors";

const ProfileScreen = () => {
  // ✅ userId vient maintenant de Redux (auth)
  const userId = useSelector((state: RootState) => state.auth.userId);

  if (!userId) {
    return null;
  }

  const rawUserBase = DATA.users.find((u) => u.id === userId);
  const rawUserProfile = DATA.userProfiles.find((p) => p.id === userId);

  if (!rawUserBase || !rawUserProfile) {
    return null;
  }

  const user = {
    ...rawUserBase,
    ...rawUserProfile,
  } as unknown as FullUserData;

  // ✅ EVENTS (safe, inchangé)

  const totalEvents = useSelector(selectInvitedEventsCount);

  // ✅ FRIENDS (structure map userId -> status)
  const friendsCount = Object.values(user.contactsStatusCache ?? {}).filter(
    (status) => status === "accepted",
  ).length;

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image source={{ uri: user.profileImage }} style={styles.avatar} />

          <Text style={styles.name}>
            {user.firstName} {user.lastName}
          </Text>

          <Text style={styles.email}>{user.email}</Text>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{friendsCount}</Text>
            <Text style={styles.statLabel}>Amis</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalEvents}</Text>
            <Text style={styles.statLabel}>Événements</Text>
          </View>
        </View>

        {/* CONTACT */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Contact</Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              📱 {user.phone ?? "Non renseigné"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { alignItems: "center", paddingVertical: 20 },
  header: { alignItems: "center", marginBottom: 30 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "royalblue",
  },
  name: { fontSize: 24, fontWeight: "bold", marginTop: 15, color: "#333" },
  email: { fontSize: 16, color: "gray" },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  statBox: { flex: 1, alignItems: "center" },
  statNumber: { fontSize: 20, fontWeight: "bold", color: "royalblue" },
  statLabel: { color: "gray" },
  separator: { width: 1, backgroundColor: "#eee", height: "100%" },
  infoSection: { width: "90%", marginTop: 25 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  infoCard: { backgroundColor: "white", padding: 15, borderRadius: 10 },
  infoText: { fontSize: 16, color: "#444" },
});

export default ProfileScreen;
