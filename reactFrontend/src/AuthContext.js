// AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );

  const contextValue = {
    token: authToken,
    setAuthToken: (token) => {
      setAuthToken(token);
      localStorage.setItem("authToken", token);
    },
    logout: () => {
      setAuthToken(null);
      localStorage.removeItem("authToken");
    },
    login: async (username, password) => {
      try {
          // API call to login a user
        const response = await fetch("http://127.0.0.1:8000/login/", {
          // API call to login a user

          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        const token = data.token;

        // Set the received token in the context
        contextValue.setAuthToken(token);
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
