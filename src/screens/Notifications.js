import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CommonHeader from '../components/CommonHeader';
const notifications = [
  {
    id: '1',
    title: 'New Course Available',
    description: 'A new course "React Native Basics" has been added.',
    time: '2 hours ago',
    icon: 'school',
  },
  {
    id: '2',
    title: 'Profile Update',
    description: 'Your profile was updated successfully.',
    time: '1 day ago',
    icon: 'school',
  },
  {
    id: '3',
    title: 'Discount Alert',
    description: 'Get 20% off on your next course purchase!',
    time: '3 days ago',
    icon: 'school',
  },
];

const Notifications = ({navigation}) => {
  const renderNotification = ({ item }) => (
    <View style={styles.card}>
      <Icon name={item.icon} size={30} color="#4c669f" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CommonHeader
        title="Notifications"
        showBackIcon={true}
        onBackPress={() => navigation.goBack()}  
        onRightPress={() => navigation.navigate('Notifications')}
      />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  //  paddingHorizontal: 16,
  //  paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
});
