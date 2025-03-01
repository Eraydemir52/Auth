import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function Input({
  label,
  keyboardType,
  onUpdateValue,
  value,
  secure,
  isInValid,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInValid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInValid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        onChangeText={onUpdateValue}
        value={value}
        secureTextEntry={secure}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 3,
  },
  labelInvalid: {
    color: "red",
  },
  input: {
    backgroundColor: "pink",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: "red",
  },
});
