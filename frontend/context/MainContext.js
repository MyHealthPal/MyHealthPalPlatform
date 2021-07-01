import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [gradient, setGradient] = useState(['#f62e4a', '#ff8d4f']);

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
