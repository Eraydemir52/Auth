import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});
function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setAuthToken(storedToken);
      }
    }
    fetchToken();
  }, []);
  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token); //Asncstoreda tokene kaydediyor
  }
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }
  const value = {
    token: authToken,
    isAuthenticated: !!authToken, //eğer authtoken deeri varsa true döner yoksa false döner !! işaretiyle yaptık
    authenticate: authenticate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContextProvider;
