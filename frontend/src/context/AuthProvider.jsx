import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  let initialAuthUser = null;

  try {
    const storedUser = localStorage.getItem("Users");
    // Ensure storedUser is defined and valid JSON before parsing
    initialAuthUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to parse auth user from localStorage:", error);
    initialAuthUser = null; // Fallback to null if parsing fails
  }

  const [authUser, setAuthUser] = useState(initialAuthUser);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
