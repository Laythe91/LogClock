import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import EventsScreen from "./screens/EventsScreen";

const EventsTabs = createBottomTabNavigator({
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
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="add-task" size={size} color={color} />
        ),
      },
    },
    Invited: {
      screen: EventsScreen,
      // On passe le filtre ici
      initialParams: { filter: "invited" },
      options: {
        tabBarLabel: "Invité",
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="add" size={size} color={color} />
        ),
      },
    },
  },
});

export default EventsTabs;
