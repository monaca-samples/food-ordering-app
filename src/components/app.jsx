import React from 'react';

import { App, View } from 'framework7-react';

import routes from '../js/routes';
import { AppContextProvider } from './AppContext';

export default () => {
  const f7params = {
    routes,
    name: 'My App',
    id: 'com.myapp.test',
  };
  return (
    <>
      <App {...f7params} pushState="true">
        <AppContextProvider>
          <View main url="/" />
        </AppContextProvider>
      </App>
    </>
  );
};
