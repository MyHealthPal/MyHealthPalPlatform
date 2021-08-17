import React, { createContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
export const Stack = createStackNavigator();
export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [gradient, setGradient] = useState(["#f62e4a", "#ff8d4f"]);
  const fetchPath = "http://192.168.2.15:5000/";

  return (
    <MainContext.Provider
      value={{
        theme,
        setTheme,
        gradient,
        fetchPath,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
