import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AdminDashboard from '../screens/AdminDashboard';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Notifications from '../screens/Notifications';
import EmployeeForm from '../components/EmployeeForm';
import { DrawerContent } from '../components/DrawerContent';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Drawer navigator with additional screens
function DrawerNavigator({ route, navigation }) {
  const role = route?.params?.role;

  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} role={role} />}
        initialRouteName={role === 'admin' ? 'AdminDashboard' : 'DashboardScreen'}
        screenOptions={{ headerShown: false }}
      >
        {role === 'admin' ? (
          <Drawer.Screen name="AdminDashboard" component={AdminDashboard} />
        ) : (
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        )}
        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
        <Drawer.Screen name="Notifications" component={Notifications} />
        <Drawer.Screen name="EmployeeForm" component={EmployeeForm} />
      </Drawer.Navigator>
    </View>
  );
}

export default function AppNavigator({route}) {
  const role = route?.params?.role || 'admin';

  return (
    <NavigationContainer>
      <View style={styles.statusBarContainer}>
        <LinearGradient
          colors={['#ba6715', '#f8b195']}
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
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="AdminDashboard" component={DrawerNavigator} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="EmployeeForm" component={EmployeeForm} />

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