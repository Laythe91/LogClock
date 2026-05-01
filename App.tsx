import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";
import { store } from "./src/core/store";
import CalendarScreen from "./src/features/calendar/screens/CalendarScreen";
import LoginScreen from "./src/features/auth/screens/LoginScreen";
import LanguageScreen from "./src/features/locales/LanguageScreen";
import { createStaticNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import RegisterScreen from "./src/features/auth/screens/RegisterScreen";
import ContactsScreen from "./src/features/contacts/screens/ContactsScreen";
import ContactsTabs from "./src/features/contacts/ContactsTabs";
import { DrawerActions } from "@react-navigation/native";
import ProfileScreen from "./src/features/user/UserScreen";
import EventsTabs from "./src/features/events/EventsTabs";

const MainTabs = createBottomTabNavigator({
  screenOptions: {
    /*   headerStyle: { backgroundColor: colors.lightBrown },
    headerTintColor: colors.white,
    tabBarActiveTintColor:
      Platform.OS === "ios" ? colors.lightBrown : colors.white,
    tabBarInactiveTintColor:
      Platform.OS === "ios" ? colors.darkGrey : colors.white,
      
    // Modification ici :*/
    tabBarStyle: {
      backgroundColor: "royalblue",
    },
  },
  screens: {
    Language: {
      screen: LanguageScreen,
      options: {
        title: "Membres",
        headerShown: false,
        tabBarLabel: "Language",
        tabBarActiveTintColor: "white", // sélectionné
        tabBarInactiveTintColor: "black", // non sélectionné
        /*        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="home" size={size} color={color} />
        ),*/
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="language" size={size} color={color} />
        ),
      },
    },
    Login: {
      screen: LoginScreen,
      options: {
        title: "Membres",
        headerShown: false,
        tabBarLabel: "Login",
        tabBarActiveTintColor: "white", // sélectionné
        tabBarInactiveTintColor: "black", // non sélectionné
        /*        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="home" size={size} color={color} />
        ),*/
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="login" size={size} color={color} />
        ),
      },
    },
    Register: {
      screen: RegisterScreen,
      options: {
        title: "Membres",
        headerShown: false,
        tabBarLabel: "Sign-Up",
        tabBarActiveTintColor: "white", // sélectionné
        tabBarInactiveTintColor: "black", // non sélectionné
        /*        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="home" size={size} color={color} />
        ),*/
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="account-circle" size={size} color={color} />
        ),
      },
    },

    Likes: {
      screen: CalendarScreen,
      options: {
        title: "Calendrier",
        tabBarLabel: "Calendrier",
        tabBarActiveTintColor: "white", // sélectionné
        tabBarInactiveTintColor: "black", // non sélectionné
        /*        headerStyle: {
          backgroundColor:
            Platform.OS === "ios" ? colors.lightBrown : colors.darkGrey,
        },
        // 2. On définit la couleur du texte du titre (optionnel)
        headerTintColor: Platform.OS === "ios" ? colors.white : colors.white,
        tabBarLabel: "Sélection",
        tabBarStyle: {
          backgroundColor:
            Platform.OS === "ios" ? colors.white : colors.darkGrey,
        },
        */
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="calendar-month" size={size} color={color} />
        ),
      },
    },
    Contacts: {
      screen: ContactsScreen,
      options: {
        title: "Contacts",
        tabBarLabel: "Contacts",
        tabBarActiveTintColor: "white", // sélectionné
        tabBarInactiveTintColor: "black", // non sélectionné
        /*        headerStyle: {
          backgroundColor:
            Platform.OS === "ios" ? colors.lightBrown : colors.darkGrey,
        },
        // 2. On définit la couleur du texte du titre (optionnel)
        headerTintColor: Platform.OS === "ios" ? colors.white : colors.white,
        tabBarLabel: "Sélection",
        tabBarStyle: {
          backgroundColor:
            Platform.OS === "ios" ? colors.white : colors.darkGrey,
        },
        */
        tabBarIcon: ({ size, color }) => (
          <FontAwesome5 name="user-contacts" size={size} color={color} />
        ),
      },
    },
  },
});

/*headerLeftContainerStyle: {
      paddingLeft: 15, // Donne de l'air à gauche
      transform: [{ scale: 1.5 }],
    },*/

const MyDrawer = createDrawerNavigator({
  // Utilise ":" ici, pas "="
  screenOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: "royalblue" },
    headerTitleAlign: "center",
    headerTintColor: "white",
    headerTitleStyle: { color: "white", fontSize: 25 },
    headerLeft: ({ tintColor }) => (
      <MaterialIcons
        name="menu"
        size={35}
        color={tintColor}
        style={{ marginLeft: 15 }}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    ),
  }),

  screens: {
    Contacts: {
      screen: ContactsTabs,
      options: {
        title: "Amis",
        drawerIcon: ({ color }) => (
          <MaterialIcons
            name="supervised-user-circle"
            size={24}
            color={color}
          />
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      options: {
        title: "My profile",
        drawerIcon: ({ color }) => (
          <MaterialIcons name="account-circle" size={24} color={color} />
        ),
      },
    },
    Events: {
      screen: EventsTabs,
      options: {
        title: "Events",
        drawerIcon: ({ color }) => (
          <MaterialIcons name="event-note" size={24} color={color} />
        ),
      },
    },
    Faq: {
      screen: MainTabs,
      options: {
        title: "TabTEST",
        drawerIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="account-box-outline"
            size={24}
            color={color}
          />
        ),
      },
    },
  },
});

const RootStack = MyDrawer;

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
