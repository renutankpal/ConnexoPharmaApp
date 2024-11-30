import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import UserProfile from '../assets/UserProfile.png';
import CustomButton from '../components/CustomButton';
export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image source={UserProfile} style={styles.avatar} />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john.doe@example.com</Text>

      <CustomButton
        title="Edit Profile"
        onPress={() => navigation.navigate('Dashboard')}
        style={{ width: '90%' }}
      />


      <TouchableOpacity style={[styles.button, styles.logoutButton]}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa', padding: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold' },
  email: { fontSize: 16, color: '#666', marginBottom: 20 },
  button: { backgroundColor: '#1E90FF', padding: 15, borderRadius: 8, margin: 10, width: '90%', alignItems: 'center' },
  logoutButton: { backgroundColor: '#dc3545' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
