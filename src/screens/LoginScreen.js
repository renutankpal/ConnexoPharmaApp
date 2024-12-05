import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import vidhyagxp_logo from '../assets/vidhyagxp_logo.png';
import medicef_logo from '../assets/medicef_logo.png';
import loginBG from '../assets/loginBG.jpeg';
import { Checkbox } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [emailBorderColor, setEmailBorderColor] = useState('#ccc');
    const [passwordBorderColor, setPasswordBorderColor] = useState('#ccc');
    const [borderColor, setBorderColor] = useState('#ccc');

    const [roleBorderColor, setRoleBorderColor] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Employee', value: 'employee' },
    ]);
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);

    const startListening = async () => {
        try {
            setIsListening(true);
            Voice.onSpeechResults = (event) => {
                if (event.value) {
                    const transcribedText = event.value[0];
                    setText(transcribedText);
                    Tts.speak(transcribedText); // Speak the transcribed text
                }
            };
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    };

    const stopListening = async () => {
        try {
            await Voice.stop();
            setIsListening(false);
        } catch (e) {
            console.error(e);
        }
    };


    const navigation = useNavigation();
    const handleFocus = () => setBorderColor('#1E90FF');
    const handleBlur = () => setBorderColor(value ? '#1E90FF' : '#ccc');

    const handleEmailChange = (value) => {
        setEmail(value);
        setEmailBorderColor(value ? '#1E90FF' : '#ccc');
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        setPasswordBorderColor(value ? '#1E90FF' : '#ccc');
    };

    return (
        <ImageBackground source={loginBG} style={styles.background}>

            <View style={styles.container}>
                <View style={styles.subcontainer}>
                    <View style={{ flexDirection: 'row', alignItem: 'center', justifyContent: 'space-between' }}>
                        <Animatable.Image
                            animation="zoomInUp"
                            duration={2000}
                            source={medicef_logo}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Animatable.Image
                            animation="zoomInUp"
                            duration={2000}
                            source={vidhyagxp_logo}
                            style={styles.logo2}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.welcomeTxt}>Welcome To Admin-Console</Text>
                    <Text style={styles.text}>Transcribed Text: {text}</Text>
                    <CustomButton
                        title={isListening ? "Stop Listening" : "Start Listening"} 
                        onPress={isListening ? stopListening : startListening} />

                    <View style={[styles.inputContainer, { emailBorderColor }]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#666"
                            value={email}
                            onChangeText={handleEmailChange}
                        // onFocus={handleFocus}
                        //  onBlur={handleBlur}
                        />
                        <Icon name="email" size={24} color="#666" style={styles.icon} />
                    </View>
                    <View style={[styles.inputContainer, { passwordBorderColor }]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#666"
                            value={password}
                            onChangeText={handlePasswordChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            secureTextEntry

                        />
                        <Icon name="lock" size={24} color="#666" style={styles.icon} />
                    </View>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Select Role"
                        style={styles.dropdown}
                        dropDownContainerStyle={[styles.dropdownContainer]}
                    />
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => setChecked(!checked)}
                            color="blue"
                        />
                        <Text style={styles.checkboxText}>Remember me</Text>
                    </View>
                    <CustomButton
                        title="Login"
                        onPress={() => {
                            if (value === 'admin') {
                                navigation.navigate('AdminDashboard', { role: value });
                            } else if (value === 'user') {
                                navigation.navigate('Dashboard', { role: value });
                            } else {
                                alert('Please select a valid role.');
                            }
                        }}
                        style={{ width: '100%', marginVertical: 20 }}
                    />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: { flex: 1, justifyContent: 'center', alignItem: 'center' },
    subcontainer: { backgroundColor: '#ffffff', width: '95%', alignItem: 'center', padding: 10, justifyContent: 'center', alignSelf: 'center', borderRadius: 10 },
    logo: { width: 150, height: 100, marginHorizontal: 5, marginVertical: 10 },
    logo2: { width: 170, height: 100, marginHorizontal: 5, marginVertical: 10 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '90%',
        alignSelf: 'center',

    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    // input: {
    //     width: '90%',
    //     padding: 12,
    //     alignSelf: 'center',
    //     color:'#000000',
    //     justifyContent:'center',
    //     borderWidth: 1.5,
    //     borderRadius: 5,
    //     marginBottom: 20,
    // },
    dropdown: {
        //  borderColor: '#ccc',
        width: '90%',
        alignSelf: 'center',
        color: '#000000',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderRadius: 5,
        marginBottom: 10,
    },
    dropdownContainer: {
        // borderColor: '#ccc',
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',

    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    checkboxText: {
        marginLeft: 8,
        color: '#000',
        fontSize: 16,
    },
    welcomeTxt: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        marginVertical: 20,
    },
});
