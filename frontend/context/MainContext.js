import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  return (
    <MainContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
