// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { I18nextProvider } from 'react-i18next';
import i18n from '../Utils/i18n';
import { Provider } from 'react-redux';
import store from '../Store';
import Toast from 'react-native-toast-message';``
import { DrawerNavigator } from './Drawer';

const App = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <DrawerNavigator />
          <Toast />
        </NavigationContainer>
      </I18nextProvider>
    </Provider>
  );
};

export default App;