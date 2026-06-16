"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api, { setAccessToken, clearAccessToken } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.post("/auth/refresh")
      .then(({ data }) => {
        setAccessToken(data.accessToken);
        return api.get("/users/me");
      })
      .then(({ data }) => setUser(data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setAccessToken(data.accessToken);
    const { data: userData } = await api.get("/users/me");
    setUser(userData);
  }, []);

  const register = useCallback(async (name, email, password, role, phone, address) => {
    const { data } = await api.post("/auth/register", { name, email, password, role, phone, address });
    setAccessToken(data.accessToken);
    const { data: userData } = await api.get("/users/me");
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    await api.post("/auth/logout").catch(() => { });
    clearAccessToken();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};