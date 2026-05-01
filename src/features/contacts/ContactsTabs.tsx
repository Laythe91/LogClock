import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ContactsScreen from "./screens/ContactsScreen";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

const ContactsTabs = createBottomTabNavigator({
  screenOptions: {
    tabBarStyle: {
      backgroundColor: "royalblue",
    },
    headerShown: false,
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "black",
  },
  screens: {
    Accepted: {
      screen: ContactsScreen,
      // On passe le filtre ici
      initialParams: { filter: "accepted" },
      options: {
        tabBarLabel: "Amis",
        tabBarIcon: ({ size, color }) => (
          <FontAwesome6 name="person-circle-check" size={size} color={color} />
        ),
      },
    },
    Pending: {
      screen: ContactsScreen,
      // On passe le filtre ici
      initialParams: { filter: "pending" },
      options: {
        tabBarLabel: "En attente",
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="pending" size={size} color={color} />
        ),
      },
    },
    Blocked: {
      screen: ContactsScreen,
      // On passe le filtre ici
      initialParams: { filter: "blocked" },
      options: {
        tabBarLabel: "Bloqué",
        tabBarIcon: ({ size, color }) => (
          <FontAwesome6 name="person-circle-minus" size={size} color={color} />
        ),
      },
    },
  },
});

export default ContactsTabs;
