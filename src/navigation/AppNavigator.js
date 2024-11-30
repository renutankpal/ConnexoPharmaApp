import React, { useEffect } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Notifications from '../screens/Notifications';
import EmployeeForm from '../components/EmployeeForm';
import { DrawerContent } from '../components/DrawerContent';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
// Authentication stack
function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

// Drawer navigator with additional screens
function DrawerNavigator() {
  return (
    <View style={{ flex: 1 }}>
      {/* Gradient Background */}
        {/* Drawer Navigator */}
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            drawerStyle: {
              backgroundColor: 'transparent', // Transparent to show gradient
              width: 280,
            },
            headerShown: false, // Disable headers for individual screens
          }}
        >
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          <Drawer.Screen name="Notifications" component={Notifications} />
        </Drawer.Navigator>
    </View>
  );
}
export default function AppNavigator() {

  return (
    <NavigationContainer>
      <View style={styles.statusBarContainer}>
        <LinearGradient
          colors={['#4274DA', '#00BFFF']}
          style={styles.statusBarGradient}
        />
        <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
      </View>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Dashboard" component={DrawerNavigator} />
        {/* <Stack.Screen name="Dashboard" component={DashboardScreen} /> */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="EmployeeForm" component={EmployeeForm} />
        {/* Auth stack */}
        {/* <Stack.Screen name="Auth" component={AuthStack} /> */}
        {/* Main drawer navigator */}
        {/* <Stack.Screen name="Main" component={DrawerNavigator} /> */}


      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  statusBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: StatusBar.currentHeight || 24,
    zIndex: 1,
  },
  gradient: {
    flex: 1,
    backgroundColor: 'transparent', 
  },
  statusBarGradient: {
    flex: 1,
  },
});