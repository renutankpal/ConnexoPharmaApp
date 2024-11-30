import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomButton = ({ title, onPress, colors = ['#4274DA', '#00BFFF'], style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, style]}>
      <LinearGradient colors={colors} style={styles.button}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', 

  },
});

export default CustomButton;
