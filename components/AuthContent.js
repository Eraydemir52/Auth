import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AuthForm from "./AuthForm";
import ButtonWhite from "./ButtonWhite";
import { useNavigation } from "@react-navigation/native";
export default function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();
  //ilk başta hata almamıs için false veriyoruz
  const [ceredentialsIsValid, setCeredentialsIsValid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });
  //input verileri validate etme
  function submitHandler(ceredentials) {
    console.log(ceredentials);
    let { confirmEmail, confirmPassword, email, password } = ceredentials;

    email = email.trim(); //sağdan soldak boşkul istemiyorum
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailIsAreEquel = email === confirmEmail;
    const passwordIsAreEquel = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailIsAreEquel || !passwordIsAreEquel))
    ) {
      Alert.alert("Hops!", "Lütfen girdiğiniz değerleri kontrol ediniz!");
      setCeredentialsIsValid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailIsAreEquel,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordIsAreEquel,
      });
      return;
    }
    onAuthenticate({ email, password });
  }
  function switchScreen() {
    if (isLogin) {
      navigation.navigate("Signup");
    } else {
      navigation.navigate("Login");
    }
  }
  return (
    <View style={styles.container}>
      <AuthForm
        ceredentialsIsValid={ceredentialsIsValid}
        isLogin={isLogin}
        onsubmit={submitHandler}
      />
      <View>
        <ButtonWhite onPress={switchScreen}>
          {isLogin ? "Yeni Kullanıcı Oluştur" : "Giriş Yap"}
        </ButtonWhite>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blueviolet",
    marginTop: 50,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});
