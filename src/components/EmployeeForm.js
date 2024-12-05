import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import CommonHeader from '../components/CommonHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';

const EmployeeForm = ({ navigation }) => {
  const [locationOpen, setLocationOpen] = useState(false);
  const [prefixOpen, setPrefixOpen] = useState(false);
  const [prefix, setPrefix] = useState(null);
  const [location, setLocation] = useState(null);
  const [prefixes] = useState([
    { label: 'Permanent Workers', value: 'site_a' },
    { label: 'Permanent staff', value: 'site_b' },
    { label: 'Other Separately', value: 'site_c' },
  ]);
  const [locations] = useState([
    { label: 'P1 (Indore Location)', value: 'site_a' },
    { label: 'P2 (Pithampur Location)', value: 'site_b' },
    { label: 'P4 (Ujjain Location)', value: 'site_c' },
    { label: 'C1 (China Plant)', value: 'site_d' },
  ]);

  const [genderOpen, setGenderOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [genders] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ]);

  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(false);
    setDob(currentDate);
  };

  const handleSubmit = () => {
    console.log('Form Submitted', { location, gender, dob,description });
    navigation.navigate('Settings');
   // navigation.goBack();
  };

  const [description, setDescription] = useState('');
  const [listening, setListening] = useState(false);

  // Initialize Voice handlers
  React.useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      setListening(true);
      await Voice.start('en-US');
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      setListening(false);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setListening(false);
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  const onSpeechResults = (event) => {
    const recognizedText = event.value?.[0] || '';
    setDescription((prev) => (prev ? `${prev} ${recognizedText}` : recognizedText));
    setListening(false);
  };

  const onSpeechError = (error) => {
    console.error('Speech recognition error:', error);
    setListening(false);
  };

  const readTextAloud = () => {
    if (description) {
      Tts.speak(description);
    } else {
      Tts.speak('The description box is empty.');
    }
  };



  return (
    <View style={{ flex: 1 }}>
      <CommonHeader
        title="New Employee"
        showBackIcon={true}
        showLangIcon={false}
        onBackPress={() => navigation.goBack()}
        onRightPress={() => navigation.navigate('Notifications')}
      />
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.formTitle}>Employee Form</Text>

        <View style={{ zIndex: 3000 }}>
          <DropDownPicker
            open={locationOpen}
            value={location}
            items={locations}
            setOpen={setLocationOpen}
            setValue={setLocation}
            placeholder="Select Site/Location"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>

        <View style={{ zIndex: 2000 }}>
          <DropDownPicker
            open={prefixOpen}
            value={prefix}
            items={prefixes}
            setOpen={setPrefixOpen}
            setValue={setPrefix}
            placeholder="Enter Your Selection Here"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>

        <TextInput style={styles.formInput} placeholder="Employee ID" />
        <TextInput style={styles.formInput} placeholder="Employee Name" />

        <View style={{ zIndex: 1000 }}>
          <DropDownPicker
            open={genderOpen}
            value={gender}
            items={genders}
            setOpen={setGenderOpen}
            setValue={setGender}
            placeholder="Select Gender"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>

        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
          <Text style={styles.datePickerText}>
            DOB: {dob.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
        {/* <TextInput style={styles.formInput} numberOfLines={3} placeholder="Short Discription:" /> */}
 {/* Description Section */}
 <View style={styles.descriptionContainer}>
  <View style={styles.inputWithIcons}>
    <TextInput
      style={styles.formInputWithIcons}
      placeholder="Short Description:"
      value={description}
      onChangeText={setDescription}
      multiline={true}
      numberOfLines={3}
    />
    <View style={styles.iconContainer}>
      <TouchableOpacity
        onPress={listening ? stopListening : startListening}
        style={styles.speakerIcon}
      >
        <Text style={styles.iconText}>{listening ? '🛑 Stop' : '🎙️ Speak'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={readTextAloud} style={styles.speakerIcon}>
        <Text style={styles.iconText}>🔊 Listen</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>

        <CustomButton title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  inputWithIcons: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  formInputWithIcons: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 10,
    marginRight: 10, 
    textAlignVertical: 'top', 
  },
  iconContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  speakerIcon: {
    padding: 10,
    backgroundColor: '#eaeaea',
    borderRadius: 5,
    marginBottom: 10, // Space between icons
  },
  iconText: {
    fontSize: 16,
    color: '#555',
  },
      dropdown: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
  datePicker: {
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  datePickerText: {
    fontSize: 16,
    color: '#555',
  },
});

export default EmployeeForm;
