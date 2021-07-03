import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [gradient, setGradient] = useState(['#f62e4a', '#ff8d4f']);
  const fetchPath = 'http://10.0.0.120:5000/';

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
