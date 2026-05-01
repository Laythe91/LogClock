import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  Pressable,
  Text,
} from "react-native";
import { useState } from "react";
import ContactCard from "../components/ContactCard";
import ContactItem from "./ContactItem";
import { useRoute } from "@react-navigation/native";
import { Contact, ContactStatus } from "../../../types/Contact";
import { useSelector } from "react-redux";
import { selectContactsByFilter } from "../contactsSelectors";
import { RootState } from "../../../core/store";
import { SafeAreaView } from "react-native-safe-area-context";

const ContactsScreen = () => {
  const route = useRoute<any>();
  const { filter } = route.params; // "accepted", "pending" ou "blocked"
  // Pour tes logs, ils apparaîtront maintenant à chaque changement d'onglet
  console.log(`Route ====== ${route.params.filter}`);

  // On utilise le sélecteur qu'on a créé
  const filteredContacts = useSelector((state: RootState) =>
    selectContactsByFilter(state, filter),
  );

  // Pour tes logs, ils apparaîtront maintenant à chaque changement d'onglet
  console.log(`[Redux] Onglet: ${filter}, Nb: ${filteredContacts.length}`);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenContact = (contact: Contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactItem contact={item} onPress={() => handleOpenContact(item)} />
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
          <ContactCard
            contact={selectedContact}
            onClose={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ContactsScreen;

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
