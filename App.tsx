import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import config from './aws-exports';
import Amplify from '@aws-amplify/core';
import { ToastProvider } from 'react-native-toast-notifications'
import { Provider } from 'react-redux'
import store from './store'

Amplify.configure(config);

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <Provider store={ store }>
          <ToastProvider>
            <SafeAreaProvider>
              <Navigation colorScheme={'light'} />
            </SafeAreaProvider>
          </ToastProvider>
        </Provider>
      </>
    );
  }
}