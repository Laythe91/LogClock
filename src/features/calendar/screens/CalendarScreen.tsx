import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ListRenderItem,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../../core/hook"; // Ajuste le chemin
import { Calendar, LocaleConfig } from "react-native-calendars";
import { RootState } from "../../../core/store";
import { useAppDispatch } from "../../../core/hook";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import "dayjs/locale/en";
import "dayjs/locale/ja";
import "dayjs/locale/ar"; // arabe
import "dayjs/locale/zh"; // chinois
import "dayjs/locale/ko"; // coréen
import "dayjs/locale/ru"; // russe
import "dayjs/locale/hi";
import { AppEvent, RootStackParamList } from "../../../types/Event";
import { eventsAdapter } from "../../events/eventsSlice";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { setLocale } from "../../locales/localesSlice"; // ton slice Redux pour les langues
import { LocaleKey } from "../../locales/localesSlice";
import EventCard from "../components/EventCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const screenWidth = Dimensions.get("window").width;
const dayWidth = (screenWidth - 32) / 8; // 32 = padding total du container

type NavProp = NativeStackNavigationProp<RootStackParamList, "Events">;

type MarkedDates = {
  [date: string]: {
    selected?: boolean;
    marked?: boolean;
    selectedColor?: string;
    dotColor?: string;
  };
};

const CalendarScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavProp>();

  const selectAllEvents = eventsAdapter.getSelectors(
    (state: RootState) => state.events,
  ).selectAll;

  const events = useSelector(selectAllEvents);

  // Ou on peut déstructurer pour récupérer plusieurs choses
  const { current, translations, timezone } = useAppSelector(
    (state) => state.locales,
  );

  const t = translations[current]; // Notre dictionnaire de langue

  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD"),
  );

  // Mettre à jour DayJS quand la langue change
  useEffect(() => {
    dayjs.locale(current);
    // On force LocaleConfig à utiliser la langue actuelle
    LocaleConfig.defaultLocale = current;
  }, [current]);

  // Filtrer les événements pour la date sélectionnée
  const eventsForSelectedDate = events.filter((ev) => {
    const selected = dayjs(selectedDate);

    const start = dayjs(ev.dateStart).startOf("day");
    const end = dayjs(ev.dateEnd).endOf("day");

    return (
      (selected.isAfter(start) && selected.isBefore(end)) ||
      selected.isSame(start, "day") ||
      selected.isSame(end, "day")
    );
  });

  const eventsByDate: Record<string, AppEvent[]> = {};

  events.forEach((ev) => {
    let current = dayjs(ev.dateStart).startOf("day");
    const end = dayjs(ev.dateEnd).startOf("day");

    while (current.isBefore(end) || current.isSame(end, "day")) {
      const key = current.format("YYYY-MM-DD");

      if (!eventsByDate[key]) {
        eventsByDate[key] = [];
      }

      eventsByDate[key].push(ev);

      current = current.add(1, "day");
    }
  });
  // Préparer les dates marquées
  const markedDates: MarkedDates = {};

  events.forEach((ev) => {
    let current = dayjs(ev.dateStart).startOf("day");
    const end = dayjs(ev.dateEnd).startOf("day");

    while (current.isBefore(end) || current.isSame(end, "day")) {
      const key = current.format("YYYY-MM-DD");

      markedDates[key] = {
        ...(markedDates[key] || {}),
        marked: true,
        dotColor: "#1E90FF",
      };

      current = current.add(1, "day");
    }
  });

  // Marquer la date sélectionnée
  markedDates[selectedDate] = {
    ...(markedDates[selectedDate] || {}),
    selected: true,
    selectedColor: "#1E90FF",
  };

  const themeCustom = {
    backgroundColor: "#ffffff",
    textMonthFontSize: 20,
    calendarBackground: "#ffffff",
    textSectionTitleColor: "#2d4150",
    textDayHeaderFontSize: 15, // ✅ ICI    selectedDayBackgroundColor: "#00adf5",
    selectedDayTextColor: "#ffffff",
    todayTextColor: "#00adf5",
    dayTextColor: "#2d4150",
    textDisabledColor: "#dd99ee",
    monthTextColor: "#1E90FF", // Couleur du nom du mois
  };

  const renderItem2: ListRenderItem<AppEvent> = ({ item }) => {
    return (
      <View style={styles.eventCard}>
        <Text style={styles.eventTitle}>{item.title}</Text>

        <EventCard
          start={item.dateStart}
          end={item.dateEnd}
          allDay={item.allDay}
        />

        {item.description && <Text>{item.description}</Text>}
      </View>
    );
  };

  const renderItem: ListRenderItem<AppEvent> = ({ item }) => {
    return (
      <Pressable
        style={styles.eventCard}
        onPress={() =>
          navigation.navigate("EventDetails", {
            eventId: item.id,
          })
        }
      >
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text>{item.description}</Text>
        <EventCard
          start={item.dateStart}
          end={item.dateEnd}
          allDay={item.allDay}
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        key={current} // Crucial : Force le re-render complet pour changer les noms des jours
        hideExtraDays={true}
        firstDay={1}
        markedDates={markedDates}
        theme={themeCustom}
        enableSwipeMonths={true}
        renderArrow={(direction) => (
          <Text style={{ fontSize: 20, color: "#1E90FF", fontWeight: "bold" }}>
            {direction === "left" ? "<" : ">"}
          </Text>
        )}
        dayComponent={({ date, state }) => {
          if (!date) return null;

          const isSelected = date.dateString === selectedDate;

          const eventsForThisDay = eventsByDate[date.dateString] || [];
          return (
            <TouchableOpacity
              style={[styles.dayContainer, isSelected && styles.selectedDay]}
              onPress={() => setSelectedDate(date.dateString)}
              disabled={state === "disabled"}
            >
              <Text
                style={[
                  styles.dayText,
                  state === "today" && styles.todayText,
                  state === "disabled" && styles.disabledText,
                  isSelected && styles.selectedText,
                ]}
              >
                {date.day}
              </Text>
              <View style={styles.numberEventContainer}>
                <Text
                  style={[
                    styles.dayText,
                    state === "today" && styles.todayText,
                    state === "disabled" && styles.disabledText,
                    isSelected && styles.selectedText,
                  ]}
                >
                  {eventsForThisDay.length > 0 &&
                    `${eventsForThisDay.length} ${
                      eventsForThisDay.length === 1
                        ? t.common.event
                        : t.common.events
                    }`}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <Text style={styles.dateHeader}>
        {/* On force dayjs à utiliser 'current' juste pour ce calcul */}
        {dayjs(selectedDate).locale(current).format("dddd, D MMMM YYYY")}
      </Text>

      <FlatList
        data={eventsForSelectedDate}
        keyExtractor={(ev) => ev.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <Text style={{ fontSize: 17, textAlign: "center", marginBottom: 10 }}>
            {t.events.calendar.eventListHeader} {/* <--- TRADUCTION ICI */}
          </Text>
        }
        ListEmptyComponent={
          <Text style={styles.noEventText}>
            {t.events.calendar.noEvent} {/* <--- TRADUCTION ICI */}
          </Text>
        }
        extraData={current}
      />

      <Pressable
        onPress={() => navigation.navigate("EventCreate", { selectedDate })}
        style={({ pressed }) => [styles.fab, pressed && styles.buttonPressed]}
      >
        <MaterialIcons name="add" size={28} color="white" />
      </Pressable>
    </SafeAreaView>
  );
};

export default CalendarScreen;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
  },

  monthText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1E90FF",
    marginBottom: 6,
    textAlign: "center",
  },
  dateHeader: { fontSize: 18, fontWeight: "bold", marginVertical: 12 },
  eventCard: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    elevation: 2,
  },
  eventTitle: { fontSize: 16, fontWeight: "600" },
  eventTime: { fontSize: 14, color: "#555" },
  noEventText: { fontStyle: "italic", color: "#888", marginTop: 8 },

  dayContainer: {
    width: dayWidth,
    height: dayWidth,
    borderWidth: 2,
    borderColor: "#333",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
  },
  numberEventContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDay: { backgroundColor: "#1E90FF" },
  dayText: { fontSize: 10, color: "#333" },
  selectedText: { color: "white", fontWeight: "bold" },
  todayText: { color: "#FF6347", fontWeight: "bold" },
  disabledText: { color: "#ccc" },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.94 }],
  },
  fab: {
    position: "absolute",
    bottom: 90, // au-dessus de la tab bar
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "royalblue",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
