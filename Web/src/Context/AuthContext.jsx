import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

let user = null;
try {
  user = JSON.parse(localStorage.getItem("user"));
} catch (error) {
  console.error("Error parsing user from localStorage:", error);
}

const INITIAL_STATE = {
  currentUser: user || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    console.log("Current user:", state.currentUser);
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
