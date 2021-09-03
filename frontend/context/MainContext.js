import React, { createContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
export const Stack = createStackNavigator();
export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [gradient, setGradient] = useState(["#f62e4a", "#ff8d4f"]);
  const fetchPath = "http://192.168.2.15:5000/";

  const [updateVaccines, setUpdateVaccines] = useState(false);
  const [updatePrescriptions, setUpdatePrescriptions] = useState(false);

  return (
    <MainContext.Provider
      value={{
        theme,
        setTheme,
        gradient,
        fetchPath,
        updateVaccines,
        setUpdateVaccines,
        updatePrescriptions,
        setUpdatePrescriptions,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
