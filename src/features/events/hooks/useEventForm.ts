import { View, Text } from "react-native";
import { useState } from "react";

const useEventForm = () => {
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

  return {
    modalVisible,
    setModalVisible,

    pickerVisible,
    setPickerVisible,

    pickerMode,

    currentField,

    openPicker,
  };
};

export default useEventForm;
