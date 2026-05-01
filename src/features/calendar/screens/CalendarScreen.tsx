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
import { Event } from "../../../types/Event";
import { addEvent } from "../../events/eventsSlice";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { setLocale } from "../../locales/localesSlice"; // ton slice Redux pour les langues
import { LocaleKey } from "../../locales/localesSlice";

const screenWidth = Dimensions.get("window").width;
const dayWidth = (screenWidth - 32) / 8; // 32 = padding total du container

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
  const events: Event[] = useSelector(
    (state: RootState) => state.events.events,
  );
  // appliquer la locale AVANT le render
  /*if (locales[current]) {
    LocaleConfig.locales["custom"] = locales[current];
    LocaleConfig.defaultLocale = "custom";
    dayjs.locale(current);
  }*/

  // Ou on peut déstructurer pour récupérer plusieurs choses
  const { current, translations, timezone } = useAppSelector(
    (state) => state.locales,
  );

  const t = translations[current]; // Notre dictionnaire de langue

  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD"),
  );

  // Mettre à jour la locale du calendrier et dayjs
  /* useEffect(() => {
    if (locales[current]) {
      LocaleConfig.locales["custom"] = locales[current];
      LocaleConfig.defaultLocale = "custom";
      dayjs.locale(current); // pour formater correctement les jours et mois
    }
  }, [current, locales]);*/

  // Mettre à jour DayJS quand la langue change
  useEffect(() => {
    dayjs.locale(current);
    // On force LocaleConfig à utiliser la langue actuelle
    LocaleConfig.defaultLocale = current;
  }, [current]);

  useEffect(() => {
    // On vérifie si les IDs de test existent déjà avant de dispatcher
    const alreadyHasMocks = events.some((ev) => ev.id === "1" || ev.id === "2");

    if (!alreadyHasMocks) {
      dispatch(
        addEvent({
          id: "1",
          title: "Réunion Aujourd'hui",
          dateStart: dayjs().hour(13).minute(0).second(0).toISOString(),
          dateEnd: dayjs().hour(14).minute(0).second(0).toISOString(),
          description: "Test calendrier pour aujourd'hui",
          participants: [],
        }),
      );
      dispatch(
        addEvent({
          id: "2",
          title: "Réunion dans une semaine",
          dateStart: dayjs()
            .add(1, "week")
            .hour(13)
            .minute(0)
            .second(0)
            .toISOString(),
          dateEnd: dayjs()
            .add(1, "day")
            .hour(19)
            .minute(0)
            .second(0)
            .toISOString(),
          description: "Test calendrier pour la semaine prochaine",
          participants: [],
        }),
      );
    }
  }, [dispatch, events]);

  // Filtrer les événements pour la date sélectionnée
  const eventsForSelectedDate = events.filter(
    (ev) => dayjs(ev.dateStart).format("YYYY-MM-DD") === selectedDate,
  );

  const eventsByDate: Record<string, Event[]> = {};

  events.forEach((ev) => {
    const key = dayjs(ev.dateStart).format("YYYY-MM-DD");
    if (!eventsByDate[key]) eventsByDate[key] = [];
    eventsByDate[key].push(ev);
  });

  // Préparer les dates marquées
  const markedDates: MarkedDates = {};
  events.forEach((ev) => {
    const dateKey = dayjs(ev.dateStart).format("YYYY-MM-DD");
    if (markedDates[dateKey]) {
      markedDates[dateKey] = {
        ...markedDates[dateKey],
        marked: true,
        dotColor: "#1E90FF",
      };
    } else {
      markedDates[dateKey] = { marked: true, dotColor: "#1E90FF" };
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

  const renderItem: ListRenderItem<Event> = ({ item }) => {
    return (
      <View style={styles.eventCard}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventTime}>
          {dayjs(item.dateStart).format("HH:mm")} -{" "}
          {dayjs(item.dateEnd).format("HH:mm")}
        </Text>
        {item.description && <Text>{item.description}</Text>}
      </View>
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
                      eventsForThisDay.length === 1 ? "Event" : "Events"
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
            {t.eventListHeader} {/* <--- TRADUCTION ICI */}
          </Text>
        }
        ListEmptyComponent={
          <Text style={styles.noEventText}>
            {t.noEvent} {/* <--- TRADUCTION ICI */}
          </Text>
        }
        extraData={current}
      />
    </SafeAreaView>
  );
};

export default CalendarScreen;

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  languageSwitcher: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  langButton: {
    marginHorizontal: 8,
    padding: 6,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#aaa",
  },
  langText: { color: "#333" },
  langSelected: {
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#1E90FF",
    paddingHorizontal: 4,
    borderRadius: 4,
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
});
