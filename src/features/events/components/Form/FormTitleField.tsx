import React from "react";
import { Controller } from "react-hook-form";
import { TextInput, Text } from "react-native";
import { styles } from "../../styles/eventForm.styles";

export const FormTitleField = ({ control, errors, t }: any) => {
  return (
    <Controller
      control={control}
      name="title"
      render={({ field: { value, onChange } }) => (
        <>
          <TextInput
            placeholder={t.events.form.descriptionPlaceholder}
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
  );
};

export default FormTitleField;
