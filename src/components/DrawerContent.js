import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import UserProfile from '../assets/UserProfile.png';
import medicef_logo from '../assets/medicef_logo.png';

export function DrawerContent(props) {
  const [activeItem, setActiveItem] = useState('');
  const [searchText, setSearchText] = useState('');

  const role = props.role || 'user'; 

  const adminMenuItems = [
    { label: 'Admin Home', icon: 'home-outline', screen: 'AdminDashboard' },
    { label: 'Profile', icon: 'person-outline', screen: 'ProfileScreen' },
    { label: 'Notifications', icon: 'notifications-outline', screen: 'Notifications' },
    { label: 'Manage Employees', icon: 'account-multiple-outline', screen: 'EmployeeManagement' },
  ];

  const employeeMenuItems = [
    { label: 'Home', icon: 'home-outline', screen: 'Dashboard' },
    { label: 'User Management', icon: 'person-outline', screen: 'ProfileScreen' },
    { label: 'User Monitoring', icon: 'notifications-outline', screen: 'Notifications' },
    { label: 'Dividion & Process', icon: 'document-text-outline', screen: 'EmployeeForm' },
  ];
  const menuItems = role === 'admin' ? adminMenuItems : employeeMenuItems;


  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#00BFFF', '#4274DA',]}
        style={{ flex: 1 }}
      >

        <DrawerContentScrollView {...props}>
          {/* <View style={styles.drawerHeader}>
            <Image source={UserProfile} style={styles.profileImage} />
            <Text style={styles.userName}>Welcome, User</Text>
          </View> */}
<View style={styles.drawerHeader}>
    {role == 'admin' ? (
      <>
        <Image source={UserProfile} style={styles.profileImage} />
        </>
    ) : (
      <>
        <Image source={medicef_logo} style={styles.adminLogo} />
        {/* <Text style={styles.userName}>Welcome, User</Text> */}
      </>
    )}
  </View>

  {role == 'admin' ? (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search items"
        placeholderTextColor="#666"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <Icon name="magnify" size={20} color="#666" style={styles.searchIcon} />
    </View>
  ):(
    <>
    </>
  )}
          {/* Custom Drawer Items */}
          {/* {menuItems
    .filter((item) =>
      role === 'admin'
        ? item.label.toLowerCase().includes(searchText.toLowerCase())
        : true
    )
    .map((item, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.drawerItem,
          activeItem === item.screen && styles.activeDrawerItem,
        ]}
        onPress={() => {
          setActiveItem(item.screen);
          props.navigation.navigate(item.screen);
        }}
      >
        <Icon
          name={item.icon}
          size={22}
          color={activeItem === item.screen ? '#fff' : '#333'}
        />
        <Text
          style={[
            styles.drawerItemLabel,
            activeItem === item.screen && styles.activeDrawerItemLabel,
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    ))} */}
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.drawerItem,
                activeItem === item.screen && styles.activeDrawerItem,
              ]}
              onPress={() => {
                setActiveItem(item.screen);
                props.navigation.navigate(item.screen);
              }}
            >
              <Icon name={item.icon} size={22} color={activeItem === item.screen ? '#fff' : '#333'} />
              <Text
                style={[
                  styles.drawerItemLabel,
                  activeItem === item.screen && styles.activeDrawerItemLabel,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </DrawerContentScrollView>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            setActiveItem('');
            props.navigation.navigate('Login');
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  drawerHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  adminLogo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    color: '#333',
  },
  searchIcon: {
    marginLeft: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  drawerItemLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
    color: '#333',
  },
  activeDrawerItem: {
   // backgroundColor: '#1E90FF',
    backgroundColor: '#1E90FF',
  },
  activeDrawerItemLabel: {
    color: '#fff',
  },
  logoutButton: {
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  logoutText: {
    color: '#FF6347',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
