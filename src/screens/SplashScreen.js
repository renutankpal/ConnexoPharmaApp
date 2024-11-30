import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import logo from '../assets/logo.jpg';
import medicef_logo from '../assets/medicef_logo.png';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 5000); // Navigate to Onboarding after 3 seconds
    return () => clearTimeout(timer); // Cleanup timeout
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Adding animation */}
      <Animatable.Image
        animation="zoomInUp"
        duration={5000}
        source={medicef_logo}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' },
  logo: { width: 300, height: 200 },
});
