import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';
import Main from './src/pages/Main';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40ef" />
      <Routes />
    </>
  );
}
