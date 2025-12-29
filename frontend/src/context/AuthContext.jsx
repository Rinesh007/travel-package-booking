import { createContext, useContext, useEffect, useState } from "react";
import api, { setAccessToken as setAxiosAccessToken } from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Refresh access token on app load
  useEffect(() => {
  const refreshAccessToken = async () => {
    try {
      // 1️⃣ Refresh access token
      const res = await api.post("/auth/refresh-token");
      const newAccessToken = res.data.data.accessToken;

      setAxiosAccessToken(newAccessToken);

      // 2️⃣ Fetch user profile
      const meRes = await api.get("/auth/me");
      setUser(meRes.data.data);
    } catch {
      setUser(null);
      setAxiosAccessToken(null);
    } finally {
      setLoading(false);
    }
  };

  refreshAccessToken();
}, []);


  const login = (newAccessToken, userData) => {
    setAxiosAccessToken(newAccessToken);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore error
    } finally {
      setAxiosAccessToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
