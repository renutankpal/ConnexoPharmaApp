import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import logo from '../assets/logo.jpg';

export default function SignupScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailBorderColor, setEmailBorderColor] = useState('#ccc'); 
    const [passwordBorderColor, setPasswordBorderColor] = useState('#ccc'); 
    const navigation = useNavigation(); 

    const handleEmailChange = (value) => {
        setEmail(value);
        setEmailBorderColor(value ? '#1E90FF' : '#ccc'); 
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        setPasswordBorderColor(value ? '#1E90FF' : '#ccc');     };

    return (
        <View style={styles.container}>
            <Animatable.Image
                animation="zoomInUp"
                duration={2000}
                source={logo}
                style={styles.logo}
                resizeMode="contain"
            />
            <TextInput
                style={[styles.input, { borderColor: emailBorderColor }]} // Dynamically change the border color
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
            />
            <TextInput
                style={[styles.input, { borderColor: passwordBorderColor }]} // Dynamically change the border color
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={handlePasswordChange}
            />
            <CustomButton
                title="Signup"
                onPress={() => navigation.navigate('Login')}
                style={{ width: '100%' }} 
            />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
               <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', padding: 20 },
    logo: { width: 200, height: 150, marginVertical: 20 },
    input: { 
        width: '100%', 
        padding: 15, 
        borderWidth: 1, 
        borderRadius: 5, 
        marginBottom: 10,
    },
    button: { backgroundColor: '#1E90FF', padding: 15, borderRadius: 5 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    link: { marginTop: 15, color: '#1E90FF' },
});
