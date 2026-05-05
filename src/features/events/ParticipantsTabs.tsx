import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  FontAwesome6,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import EventsScreen from "./screens/EventsScreen";

const EventsTabs = createMaterialTopTabNavigator({
  screenOptions: {
    tabBarStyle: {
      backgroundColor: "royalblue",
    },
    headerShown: false,
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "black",
  },
  screens: {
    Created: {
      screen: EventsScreen,
      // On passe le filtre ici
      initialParams: { filter: "created" },
      options: {
        tabBarLabel: "Créé",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="receipt-text-send"
            size={24}
            color={color}
          />
        ),
      },
    },
    Invited: {
      screen: EventsScreen,
      // On passe le filtre ici
      initialParams: { filter: "invited" },
      options: {
        tabBarLabel: "Invité",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="receipt-text-arrow-left"
            size={24}
            color={color}
          />
        ),
      },
    },
  },
});

export default EventsTabs;
