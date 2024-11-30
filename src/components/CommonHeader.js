import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const CommonHeader = ({
  title,
  onMenuPress,
  onBackPress, // Handler for back button
  onRightPress,
  onLanguagePress, // Handler for language selection
  showBackIcon = false, // Conditional prop
  showLangIcon = false, // Conditional prop
  rightIconName = 'notifications-outline',
}) => {
  return (
    <View style={styles.headerContainer}>
      <LinearGradient
        colors={['#4274DA', '#00BFFF']}
        style={styles.statusBarGradient}
      >
        <StatusBar
          translucent
          backgroundColor="transparent" // Transparent background for status bar
          barStyle="light-content" // White text/icons for dark backgrounds
        />
      </LinearGradient>

      {/* Header Content */}
      <LinearGradient
        colors={['#4274DA', '#00BFFF']} // Gradient colors
        style={styles.headerContent}
      >
        {showBackIcon ? (
          <TouchableOpacity onPress={onBackPress}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => onMenuPress && onMenuPress()}>
            <Icon name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>

        {/* Right Actions */}
        <View style={styles.rightActions}>
        {showLangIcon ? (

          <TouchableOpacity onPress={onRightPress}>
            <Icon name={rightIconName} size={24} color="#fff" />
          </TouchableOpacity>
        ):(
          <TouchableOpacity onPress={onLanguagePress} style={styles.languageButton}>
            <Icon name="language" size={24} color="#fff" />
          </TouchableOpacity>
        )
      }
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  statusBarGradient: {
    height: StatusBar.currentHeight || (Platform.OS === 'ios' ? 20 : 20),
  },
  headerContent: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButton: {
    marginLeft: 10,
  },
});

export default CommonHeader;
