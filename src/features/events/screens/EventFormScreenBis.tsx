import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Switch,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../eventsThunks";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//import { eventSchema } from "./eventForm.schema";
import { selectContactsByFilter } from "../../contacts/contactsSelectors";
import { RootState } from "../../../core/store";
import * as yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";

export const eventSchema = yup.object({
  title: yup.string().required().min(3),

  description: yup.string().notRequired(),

  allDay: yup.boolean().required(),

  dateStart: yup
    .number()
    .required("Date de début obligatoire")
    .test(
      "not-in-past",
      "La date de début ne peut pas être dans le passé",
      (value) => {
        if (!value) return false;

        return value >= Date.now();
      },
    ),

  dateEnd: yup
    .number()
    .required("Date de fin obligatoire")
    .test(
      "is-after-start",
      "La fin doit être après le début",
      function (value) {
        return value >= this.parent.dateStart;
      },
    ),

  participants: yup.array().of(yup.string()).required(),

  location: yup.object({
    lat: yup.number().required(),
    lng: yup.number().required(),
    address: yup.string().notRequired(),
  }),
});

export type FormValues = {
  title: string;
  description?: string; // ✅ IMPORTANT: optionnel
  allDay: boolean;
  dateStart: number;
  dateEnd: number;
  participants: string[];
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
};

const EventFormScreen = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) =>
    selectContactsByFilter(state, "accepted"),
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");

  const [currentField, setCurrentField] = useState<"dateStart" | "dateEnd">(
    "dateStart",
  );

  const openPicker = (
    field: "dateStart" | "dateEnd",
    mode: "date" | "time",
  ) => {
    setCurrentField(field);
    setPickerMode(mode);
    setPickerVisible(true);
  };

  const updateDate = (field: "dateStart" | "dateEnd", selected: Date) => {
    const current = new Date(watch(field));

    current.setFullYear(selected.getFullYear());
    current.setMonth(selected.getMonth());
    current.setDate(selected.getDate());

    setValue(field, current.getTime(), {
      shouldValidate: true,
    });
  };

  const updateTime = (field: "dateStart" | "dateEnd", selected: Date) => {
    const current = new Date(watch(field));

    current.setHours(selected.getHours());
    current.setMinutes(selected.getMinutes());

    setValue(field, current.getTime(), {
      shouldValidate: true,
    });
  };

  const now = Date.now();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(eventSchema) as any,
    defaultValues: {
      title: "",
      description: "",
      allDay: false,
      dateStart: now + 5 * 60 * 1000,
      dateEnd: now + 60 * 60 * 1000,
      participants: [],
      location: {
        lat: 48.8566,
        lng: 2.3522,
      },
    },
  });

  const allDay = watch("allDay");
  const participants = watch("participants");

  const toggleParticipant = (id: string) => {
    const current = participants ?? [];

    const updated = current.includes(id)
      ? current.filter((p) => p !== id)
      : [...current, id];

    setValue("participants", updated, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = (data: FormValues) => {
    const start = new Date(data.dateStart);
    const end = new Date(data.dateEnd);

    if (data.allDay) {
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    }

    dispatch(
      createEvent({
        ...data,
        dateStart: start.getTime(),
        dateEnd: end.getTime(),
      }) as any,
    );
    reset();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Créer un événement</Text>

      {/* TITLE */}
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange } }) => (
          <>
            <TextInput
              placeholder="Titre"
              value={value}
              onChangeText={onChange}
              style={styles.input}
            />
            {errors.title && (
              <Text style={styles.error}>{errors.title.message}</Text>
            )}
          </>
        )}
      />

      {/* DESCRIPTION */}
      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange } }) => (
          <TextInput
            placeholder="Description"
            value={value ?? ""}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />

      {/* ALL DAY */}
      <View style={styles.row}>
        <Text>All day</Text>
        <Controller
          control={control}
          name="allDay"
          render={({ field: { value, onChange } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />
      </View>

      {/* DATES */}
      {!allDay && (
        <View>
          <Text>Début</Text>
          <View style={styles.TextRow}>
            <Text style={styles.halfText}>Date</Text>
            <Text style={styles.halfText}>Heure</Text>
          </View>
          <View style={styles.dateRow}>
            <Pressable
              style={styles.halfBtn}
              onPress={() => openPicker("dateStart", "date")}
            >
              <Text>{new Date(watch("dateStart")).toLocaleDateString()}</Text>
            </Pressable>

            <Pressable
              style={styles.halfBtn}
              onPress={() => openPicker("dateStart", "time")}
            >
              <Text>
                {new Date(watch("dateStart")).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Pressable>
          </View>
          {errors.dateStart && (
            <Text style={styles.error}>{errors.dateStart.message}</Text>
          )}
          <Text>Fin</Text>
          <View style={styles.TextRow}>
            <Text style={styles.halfText}>Date</Text>
            <Text style={styles.halfText}>Heure</Text>
          </View>

          <View style={styles.dateRow}>
            <Pressable
              style={styles.halfBtn}
              onPress={() => openPicker("dateEnd", "date")}
            >
              <Text>{new Date(watch("dateEnd")).toLocaleDateString()}</Text>
            </Pressable>

            <Pressable
              style={styles.halfBtn}
              onPress={() => openPicker("dateEnd", "time")}
            >
              <Text>
                {new Date(watch("dateEnd")).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Pressable>
          </View>
          {errors.dateEnd && (
            <Text style={styles.error}>{errors.dateEnd.message}</Text>
          )}
        </View>
      )}

      {/* PARTICIPANTS */}
      <Pressable style={styles.btn} onPress={() => setModalVisible(true)}>
        <Text>Choisir participants ({participants?.length ?? 0})</Text>
      </Pressable>

      {/* SUBMIT */}
      <Pressable style={styles.submit} onPress={handleSubmit(onSubmit)}>
        <Text style={{ color: "white" }}>Créer événement</Text>
      </Pressable>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={styles.modal}>
          <Text style={styles.title}>Participants</Text>

          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const selected = participants?.includes(item.id);

              return (
                <Pressable
                  style={[
                    styles.contact,
                    selected && { backgroundColor: "#cce5ff" },
                  ]}
                  onPress={() => toggleParticipant(item.id)}
                >
                  <Text>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text>{selected ? "✔" : ""}</Text>
                </Pressable>
              );
            }}
          />

          <Pressable
            style={styles.submit}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: "white" }}>Valider</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>

      {pickerVisible && (
        <DateTimePicker
          value={new Date(watch(currentField))}
          mode={pickerMode}
          display="default"
          onValueChange={(event) => {
            const timestamp = event.nativeEvent.timestamp;

            if (!timestamp) {
              setPickerVisible(false);
              return;
            }

            const selectedDate = new Date(timestamp);

            if (pickerMode === "date") {
              updateDate(currentField, selectedDate);
            } else {
              updateTime(currentField, selectedDate);
            }

            setPickerVisible(false);
          }}
          onDismiss={() => {
            setPickerVisible(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: { padding: 12, backgroundColor: "#eee", borderRadius: 8 },
  submit: {
    padding: 14,
    backgroundColor: "royalblue",
    alignItems: "center",
    borderRadius: 8,
  },
  modal: { flex: 1, padding: 16 },
  contact: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  error: { color: "red", marginTop: 4 },
  dateRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  TextRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },

  halfBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
    alignItems: "center",
  },
  halfText: {
    flex: 1,
    padding: 12,
    backgroundColor: "royalblue",
    borderRadius: 8,
    alignItems: "center",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default EventFormScreen;
