import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

export default function AuthForm({ isLogin, onsubmit, ceredentialsIsValid }) {
  const [entredEmail, setEntredEmail] = useState("");
  const [entredPassword, setEntredPassword] = useState("");
  const [entredConfirmEmail, setEntredConfirmEmail] = useState("");
  const [entredConfirmPassword, setEntredConfirmPassword] = useState("");

  const {
    email: emailIsInValid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInValid,
    confirmPassword: passwordDontMatch,
  } = ceredentialsIsValid;
  console.log(
    emailIsInValid,
    emailsDontMatch,
    passwordIsInValid,
    passwordDontMatch
  );
  function submitHandler() {
    onsubmit({
      email: entredEmail,
      confirmEmail: entredConfirmEmail,
      password: entredPassword,
      confirmPassword: entredConfirmPassword,
    });
  }
  function updateInput(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEntredEmail(enteredValue);
        break;
      case "password":
        setEntredPassword(enteredValue);
        break;
      case "confirmEmail":
        setEntredConfirmEmail(enteredValue);
        break;
      case "confirmPassword":
        setEntredConfirmPassword(enteredValue);
        break;
    }
  }
  return (
    <View>
      <Input
        label="Email"
        keyboardType="email-address"
        onUpdateValue={updateInput.bind(this, "email")}
        value={entredEmail}
        isInValid={emailIsInValid}
      />
      {!isLogin && (
        <Input
          label="Email Doğrula"
          keyboardType="email-address"
          onUpdateValue={updateInput.bind(this, "confirmEmail")}
          value={entredConfirmEmail}
          isInValid={emailsDontMatch}
        />
      )}

      <Input
        label="Şifre"
        secure
        onUpdateValue={updateInput.bind(this, "password")}
        value={entredPassword}
        isInValid={passwordIsInValid}
      />
      {!isLogin && (
        <Input
          label="Şifre Doğrula"
          secure
          onUpdateValue={updateInput.bind(this, "confirmPassword")}
          value={entredConfirmPassword}
          isInValid={passwordDontMatch}
        />
      )}
      <View style={styles.buttons}>
        <Button onPress={submitHandler}>
          {isLogin ? "Giriş Yap" : "Kaydol"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 10,
  },
});
