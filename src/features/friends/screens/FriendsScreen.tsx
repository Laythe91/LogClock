import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  Pressable,
  Text,
} from "react-native";
import DATA from "../../../data";
import { useState } from "react";
import FriendCard from "../components/FriendCard";
import FriendItem from "./FriendItem";
import { useRoute } from "@react-navigation/native";
import { Friend, FriendFilter } from "../../../types/Friend";
import { useSelector } from "react-redux";
import { selectFilteredFriends } from "../friendsSlice";
import { RootState } from "../../../core/store";
import { SafeAreaView } from "react-native-safe-area-context";

const FriendsScreen = () => {
  const route = useRoute<any>();
  const { filter } = route.params; // "accepted", "pending" ou "blocked"
  // Pour tes logs, ils apparaîtront maintenant à chaque changement d'onglet
  console.log(`Route ====== ${route.params.filter}`);

  // On utilise le sélecteur qu'on a créé
  const filteredFriends = useSelector((state: RootState) =>
    selectFilteredFriends(state, filter),
  );

  // Pour tes logs, ils apparaîtront maintenant à chaque changement d'onglet
  console.log(`[Redux] Onglet: ${filter}, Nb: ${filteredFriends.length}`);

  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenFriend = (friend: Friend) => {
    setSelectedFriend(friend);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FriendItem friend={item} onPress={() => handleOpenFriend(item)} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Aucun utilisateur dans cette catégorie.
          </Text>
        }
      />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setModalVisible(false)}
          />
          <FriendCard
            friend={selectedFriend}
            onClose={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Fond noir semi-transparent
    justifyContent: "center", // Centre la card verticalement
    alignItems: "center", // Centre la card horizontalement
    padding: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
});
