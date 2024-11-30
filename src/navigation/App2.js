import React,{useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Notifications from '../screens/Notifications';
import { DrawerContent } from '../components/DrawerContent';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

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
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: true, // To display headers for drawer screens
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  );
}
export default function AppNavigator() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 250);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
       // initialRouteName="Login"
        screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} /> */}
        {/* Auth stack */}
        <Stack.Screen name="Auth" component={AuthStack} />
        {/* Main drawer navigator */}
        <Stack.Screen name="Main" component={DrawerNavigator} />
        {/* <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} /> */}
      </Stack.Navigator>
      {/* <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Signup" component={SignupScreen} />
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
}