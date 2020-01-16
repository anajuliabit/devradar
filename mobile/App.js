import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/routes';
import Main from './src/pages/Main';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40ef" />
      <Routes />
    </>
  );
}
