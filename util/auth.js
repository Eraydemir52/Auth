import axios from "axios";

const API_KEY = "AIzaSyCRsrE70TGKvngvEQIGRtCZIX7FYgK-Ds8";
//cevap gelene kadar patlamaması için async yapıyoruz
async function authenticate(mode, email, password) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );

  //   console.log(response.data);
  const token = response.data.idToken;
  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
