import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import CommonHeader from '../components/CommonHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

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
    console.log('Form Submitted', { location, gender, dob });
    navigation.goBack();
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
