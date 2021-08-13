import React from 'react';
import { MainProvider } from './context/MainContext';

import MainCode from './MainCode';

export default function App() {
  return (
    <MainProvider>
      <MainCode />
    </MainProvider>
  );
}
