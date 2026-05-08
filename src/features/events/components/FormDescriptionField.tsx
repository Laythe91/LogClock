import React from "react";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native";
import { styles } from "../styles/eventForm.styles";

const FormDescriptionField = ({ control }: any) => {
  return (
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
  );
};

export default FormDescriptionField;
