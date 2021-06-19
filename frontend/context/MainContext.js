import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [gradient, setGradient] = useState(['#FC3636', '#E52883']);

  return (
    <MainContext.Provider
      value={{
        theme,
        setTheme,
        gradient,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
