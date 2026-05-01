import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FriendsScreen from "./screens/FriendsScreen";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

const FriendsTabs = createBottomTabNavigator({
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
      screen: FriendsScreen,
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
      screen: FriendsScreen,
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
      screen: FriendsScreen,
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

export default FriendsTabs;
