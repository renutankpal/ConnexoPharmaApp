import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
       <AppNavigator />
    </GestureHandlerRootView>
  );
};

export default App;
