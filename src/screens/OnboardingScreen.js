import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import vidhyagxp_logo from '../assets/vidhyagxp_logo.png';

export default function OnboardingScreen({ navigation }) {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const onboardingRef = useRef(null);
    let autoScrollTimer = useRef(null);

    const colors = ['#ba6715', '#f8b195'];

    // Done button component
    const Done = () => (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => Linking.openURL('https://medicef.mydemosoftware.com/')}
        >
            <LinearGradient colors={colors} style={styles.gradientButtons}>
                <Text style={styles.buttonText}>Done</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    // Skip button component
    const Skip = () => (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('EmployeeForm')}
            // onPress={() => Linking.openURL('https://medicef.mydemosoftware.com/')}
        >
            <LinearGradient colors={colors} style={styles.gradientButtons}>
                <Text style={styles.buttonText}>Skip</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    // Next button component
    const Next = () => (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
                clearInterval(autoScrollTimer.current); // Stop auto-scroll on manual navigation
                const nextPage = currentPage + 1;
                onboardingRef.current?.goToPage(nextPage);
                setCurrentPage(nextPage);
            }}        >
            <LinearGradient colors={colors} style={styles.gradientButtons}>
                <Text style={styles.buttonText}>Next</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    // Effect for auto-scrolling the onboarding screens
    const startAutoScroll = () => {
        autoScrollTimer.current = setInterval(() => {
            setCurrentPage((prevPage) => {
                const nextPage = prevPage + 1;
                if (nextPage < 3) {
                    onboardingRef.current?.goToPage(nextPage);
                    return nextPage;
                } else {
                    clearInterval(autoScrollTimer.current);
                    return prevPage;
                }
            });
        }, 3000);
    };

    // Start auto-scroll when onboarding starts
    useEffect(() => {
        if (showOnboarding) startAutoScroll();

        return () => {
            clearInterval(autoScrollTimer.current); // Cleanup timer
        };
    }, [showOnboarding]);

    const handleGetStarted = () => {
        setShowOnboarding(true);
    };

    return (
        <View style={styles.container}>
            {!showOnboarding ? (
                <ImageBackground
                    source={require('../assets/BG.jpg')}
                    style={styles.imageBackground}
                >
                    <Animatable.Image
                        animation="zoomInUp"
                        duration={2000}
                        source={vidhyagxp_logo}
                        style={styles.logo2}
                        resizeMode="contain"
                    />
                      <Text style={styles.welcomeTitle}>Welcome to VidyaGxP</Text>
                      <Text style={styles.welcomeSubtitle1}>Data informs, wisdom discerns</Text>

                       <View style={styles.welcomeContainer}>
                   
                        <Text style={styles.welcomeSubtitle}>
                            Empowering your journey through cutting-edge IT education and expertise.
                        </Text>

                        <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
                            <LinearGradient colors={colors} style={styles.gradientButton}>
                                <Text style={styles.buttonText}>Get Started</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            ) : (
                // Onboarding Screens
                <Onboarding
                    ref={onboardingRef}
                    DotComponent={({ isLight, selected }) => {
                        let backgroundColor = selected ? '#ba6715' : 'rgba(0, 0, 0, 0.3)';
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
                    }}
                    NextButtonComponent={Next}
                    SkipButtonComponent={Skip}
                    DoneButtonComponent={Done}
                    pages={[
                        {
                            backgroundColor: '#fff',
                            image: <Image source={require('../assets/onboard2.jpg')} />,
                            title: 'Welcome to VidyaGxP Digital Transformation',
                            subtitle: 'Empowering your journey through cutting-edge IT education and expertise.',
                        },
                        {
                            backgroundColor: '#ffffff',
                            image: <Image source={require('../assets/onboard1.png')} />,
                            title: 'Begin your learning journey and unlock a world of knowledge',
                            subtitle: 'Explore our comprehensive courses designed to transform your skills and career.',
                        },
                        {
                            backgroundColor: '#ffffff',
                            image: <Image source={require('../assets/onboards.png')} style={{ width: 300, height: 300 }} />,
                            title: 'Dive into a seamless learning experience with VidyaGxP Digital Transformation',
                            subtitle: "Experience interactive learning with expert-led courses and progress tracking",
                        },
                    ]}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo2: { width: 250, height: 150, marginTop: 75 },

    welcomeContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20,
    },
    welcomeTitle: {
        fontSize: 30,
        color: '#ba6715',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    welcomeSubtitle1: {
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
        marginBottom: 1,
    },

    welcomeSubtitle: {
        fontSize: 16,
        color: '#ba6715',
        textAlign: 'center',
        marginBottom: 1,
    },
    getStartedButton: {
        borderRadius: 10,
        overflow: 'hidden',
        margin: 5,
    },
    gradientButtons: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 5,
    },
    gradientButton: {
        paddingHorizontal: 70,
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 55,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
});
