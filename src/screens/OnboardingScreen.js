import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Button } from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';

export default function OnboardingScreen({ navigation }) {

    const Square = ({ isLight, isgradient, selected }) => {
        let backgroundColor;
        if (isLight) {
            backgroundColor = selected ? '#4274DA' : 'rgba(0, 0, 0, 0.3)';
        } else {
            backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
        }
        return (
            <View
                style={{
                    width: 8,
                    height: 8,
                    marginHorizontal: 3,
                    backgroundColor,
                }}
            />
        );
    };

    const backgroundColor = isLight => (isLight ? '#4274DA' : 'lightblue');
    const color = isgradient => ['#4274DA', '#00BFFF'];
    const colors = ['#4274DA', '#00BFFF'];
    const Done = ({ isLight, ...props }) => (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('Login')}
        >
            <LinearGradient colors={colors} style={styles.gradientButton}>
                <Text style={styles.buttonText}>Done</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    const Skip = ({ isLight, isgradient, skipLabel, ...props }) => (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('Login')}
        >
            <LinearGradient colors={colors} style={styles.gradientButton}>
                <Text style={styles.buttonText}>Skip</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    const Next = ({ isLight, colors = ['#4274DA', '#00BFFF'], navigation, ...props }) => (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('Login')}
            {...props}
        >
            <LinearGradient colors={colors} style={styles.gradientButton}>
                <Text style={styles.buttonText}>Next</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            <Onboarding
                DotComponent={Square}
                NextButtonComponent={Next}
                SkipButtonComponent={Skip}
                DoneButtonComponent={Done}
                // onPress={() => navigation.navigate('Login')}

                pages={[
                    {
                        backgroundColor: '#fff',
                        image: <Image source={require('../assets/Onboarding1.png')} />,
                        title: 'Welcome to Connexo IT Group',
                        subtitle: 'Empowering your journey through cutting-edge IT education and expertise.',
                      //  titleStyles: { color: 'blue' } // set default color for the title

                    },
                    {
                        backgroundColor: '#ffffff',
                        image: <Image source={require('../assets/Onboarding4.png')} />,
                        title: 'Begin your learning journey and unlock a world of knowledge',
                        subtitle: 'Explore our comprehensive courses designed to transform your skills and career.',
                    },
                    {
                        backgroundColor: '#ffffff',
                        image: <Image source={require('../assets/Onboarding2.png')} />,
                        title: 'Dive into a seamless learning experience with Connexo IT Group',
                        subtitle: "Experience interactive learning with expert-led courses and progress tracking",
                    },
                ]}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', },
    slide: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 0 },
    image: { width: 200, height: 200, marginBottom: 0 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
    description: { fontSize: 15, textAlign: 'center', marginTop: 10 },
    button: { backgroundColor: '#1E90FF', padding: 10, borderRadius: 8, position: 'absolute', bottom: 50, width: '80%', alignSelf: 'center' },
    buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', },
    buttonContainer: {
        borderRadius: 10,
        overflow: 'hidden', // Ensures the gradient doesn't spill out of the button's radius
        marginHorizontal: 5,
    },
    gradientButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
});
