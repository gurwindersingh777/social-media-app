import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // whenever the token changes, fetch the current user
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/auth/me", {headers: { Authorization: `Bearer ${token}` }})
        .then((res) => setUser(res.data.user))
      .catch((err) => {
        console.error("Auth verification failed because:", err.response?.data || err.message);
        logout(); 
      });
    }
  }, [token])

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};