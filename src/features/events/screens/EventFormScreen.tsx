import React, { useEffect, useState } from "react";
import { Switch, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent } from "../eventsThunks";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema } from "../schemas/event.schema";
import { selectContactsByFilter } from "../../contacts/contactsSelectors";
import { RootState } from "../../../core/store";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import FormTitleField from "../components/Form/FormTitleField";
import FormDescriptionField from "../components/Form/FormDescriptionField";
import FormDateTimeField from "../components/Form/FormDateTimeField";
import FormParticipantsButton from "../components/Form/FormParticipantsButton";
import FormSubmitButton from "../components/Form/FormSubmitButton";
import { useRoute } from "@react-navigation/native";

import { styles } from "../styles/eventForm.styles";
import FormParticipantsModal from "../components/Form/FormParticipantsModal";
import { selectEventFullDetails } from "../eventsSelectors";
import { AppEvent, ParticipantStatus } from "../../../types/Event";

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
  const route = useRoute<any>();

  const selectedDate = route.params?.selectedDate;
  const eventId = route.params?.eventId;
  const currentUserId = route.params?.currentUserId;

  const { current, translations } = useSelector(
    (state: RootState) => state.locales,
  );

  const t = translations[current];

  const event = useSelector((state: RootState) =>
    eventId ? selectEventFullDetails(state, eventId) : null,
  );
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

  //const now = Date.now();

  const baseDate = selectedDate ? new Date(selectedDate) : new Date();

  baseDate.setMinutes(baseDate.getMinutes() + 5);

  const startDate = new Date(baseDate);

  const endDate = new Date(baseDate);
  endDate.setHours(endDate.getHours() + 1);

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
      dateStart: startDate.getTime(),
      dateEnd: endDate.getTime(),
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

    const uniqueParticipants = [
      ...new Set([...data.participants, currentUserId]),
    ];

    const participantsMap = uniqueParticipants.reduce(
      (acc, userId) => {
        acc[userId] = userId === currentUserId ? "accepted" : "pending";

        return acc;
      },
      {} as Record<string, ParticipantStatus>,
    );

    const payload: Partial<AppEvent> = {
      ...data,
      participants: participantsMap,
      dateStart: start.getTime(),
      dateEnd: end.getTime(),
    };

    if (eventId) {
      dispatch(updateEvent(eventId, payload) as any);
    } else {
      dispatch(createEvent(payload as any) as any);
    }

    console.log(payload);

    reset();
  };

  useEffect(() => {
    if (event) {
      reset({
        title: event.title,
        description: event.description ?? "",
        allDay: event.allDay ?? false,
        dateStart: event.dateStart,
        dateEnd: event.dateEnd,
        participants: event.participants?.map((p) => p.id) ?? [],
        location: event.location ?? {
          lat: 48.8566,
          lng: 2.3522,
        },
      });
    }
  }, [event]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {eventId ? t.events.form.editTitle : t.events.form.createTitle}
      </Text>

      <FormTitleField control={control} errors={errors} t={t} />

      <FormDescriptionField control={control} t={t} />

      {/* ALL DAY */}
      <View style={styles.row}>
        <Text>{t.events.form.allDay}</Text>
        <Controller
          control={control}
          name="allDay"
          render={({ field: { value, onChange } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />
      </View>

      {/* DATE */}
      {allDay ? (
        <FormDateTimeField
          label={t.common.date}
          value={watch("dateStart")}
          onPressDate={() => openPicker("dateStart", "date")}
          hideTime
          error={errors.dateStart?.message}
          t={t}
        />
      ) : (
        <>
          <FormDateTimeField
            label={t.events.form.start}
            value={watch("dateStart")}
            onPressDate={() => openPicker("dateStart", "date")}
            onPressTime={() => openPicker("dateStart", "time")}
            error={errors.dateStart?.message}
            t={t}
          />

          <FormDateTimeField
            label={t.events.form.end}
            value={watch("dateEnd")}
            onPressDate={() => openPicker("dateEnd", "date")}
            onPressTime={() => openPicker("dateEnd", "time")}
            error={errors.dateEnd?.message}
            t={t}
          />
        </>
      )}

      <FormParticipantsButton
        count={participants?.length ?? 0}
        t={t}
        onPress={() => setModalVisible(true)}
      />

      <FormSubmitButton
        onPress={handleSubmit(onSubmit)}
        label={eventId ? t.events.form.editButton : t.events.form.createButton}
      />

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
