import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { NativeModules } from 'react-native';

const App = () => {
  const [isVPNConnected, setIsVPNConnected] = useState(false);
  const [isVPNChecked, setIsVPNChecked] = useState(false); // Ensure VPN status is checked before rendering

  useEffect(() => {
    const interval = setInterval(() => {
      checkVPNStatus();
    }, 5000); // Check every 5 seconds

    checkVPNStatus(); // Initial check
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const checkVPNStatus = async () => {
    try {
      const isConnected = await NativeModules.VpnDetector.isVpnConnected();
      console.log('VPN status:', isConnected);
      setIsVPNConnected(isConnected);
      setIsVPNChecked(true);

      if (isConnected) {
        showVPNAlert();
      }
    } catch (error) {
      console.error('Error checking VPN status:', error);
      setIsVPNChecked(true); // Ensure app doesn't get stuck on loading if there's an error
    }
  };

  const showVPNAlert = () => {
    Alert.alert(
      'VPN Detected',
      'Please disable your VPN to use this app.',
      [
        {
          text: 'Exit',
          onPress: () => BackHandler.exitApp(),
          style: 'destructive',
        },
      ],
      { cancelable: false } // Prevent dismissing the alert without action
    );
  };

  if (!isVPNChecked) {
    return null; 
  }

  // Exit if VPN is connected
  if (isVPNConnected) {
    return null;
  }

  // Render the app if VPN is not connected
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
};

export default App;
