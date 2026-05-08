import React, { useState } from "react";
import { Switch, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../eventsThunks";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema } from "../schemas/event.schema";
import { selectContactsByFilter } from "../../contacts/contactsSelectors";
import { RootState } from "../../../core/store";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import FormTitleField from "../components/FormTitleField";
import FormDescriptionField from "../components/FormDescriptionField";
import FormDateTimeField from "../components/FormDateTimeField";
import FormParticipantsButton from "../components/FormParticipantsButton";
import FormSubmitButton from "../components/FormSubmitButton";

import { styles } from "../styles/eventForm.styles";
import FormParticipantsModal from "../components/FormParticipantsModal";

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

      <FormTitleField control={control} errors={errors} />

      <FormDescriptionField control={control} />

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

      <FormDateTimeField
        label="Début"
        value={watch("dateStart")}
        onPressDate={() => openPicker("dateStart", "date")}
        onPressTime={() => openPicker("dateStart", "time")}
        error={errors.dateStart?.message}
      />

      <FormDateTimeField
        label="Fin"
        value={watch("dateEnd")}
        onPressDate={() => openPicker("dateEnd", "date")}
        onPressTime={() => openPicker("dateEnd", "time")}
        error={errors.dateEnd?.message}
      />

      <FormParticipantsButton
        count={participants?.length ?? 0}
        onPress={() => setModalVisible(true)}
      />

      <FormSubmitButton onPress={handleSubmit(onSubmit)} />

      <FormParticipantsModal
        visible={modalVisible}
        setVisible={setModalVisible}
        watch={watch}
        setValue={setValue}
        contacts={contacts}
      />

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

export default EventFormScreen;
