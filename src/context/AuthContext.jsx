import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("healthyDietUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("healthyDietToken") || null
  );

  const login = (userData, userToken) => {
    localStorage.setItem(
      "healthyDietUser",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "healthyDietToken",
      userToken
    );

    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    localStorage.removeItem("healthyDietUser");
    localStorage.removeItem("healthyDietToken");

    setUser(null);
    setToken(null);
  };

  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}