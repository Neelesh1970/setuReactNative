import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { updateSelectedDate } from '../../../features/booktest/booktestSlice';
import { useDispatch } from 'react-redux';

const getUpcoming7Days = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dates = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date();
    currentDate.setDate(today.getDate() + i); 

    const month = monthsOfYear[currentDate.getMonth()];
    const day = String(currentDate.getDate()).padStart(2, '0'); 
    const weekday = daysOfWeek[currentDate.getDay()];

    dates.push({
      month,
      day,
      weekday,
      id: i, 
    });
  }

  return dates;
};


const DateCard = ({ item, isActive, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Card style={[styles.card, isActive && styles.activeCard]}>
      <View style={styles.cardContent}>
        <Text style={styles.month}>{item.month}</Text>
        <Text style={styles.day}>{item.day}</Text>
        <Text style={styles.weekday}>{item.weekday}</Text>
      </View>
    </Card>
  </TouchableOpacity>
);

const AvailableDates = () => {
  const [selectedDate, setSelectedDate] = useState(null); 
  const dates = getUpcoming7Days();
  const dispatch = useDispatch()

  const handleDateSelect = (item) => {
    setSelectedDate(item?.id);
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthNumber = String(monthsOfYear.indexOf(item?.month) + 1).padStart(2, '0');
  
    console.log('handleDateSelect',`${item?.day}.${item?.month}.${item?.weekday}`) 
    // const date= `${item?.day}.${item?.month}.${item?.weekday}`
    const today = new Date();
    const year = today.getFullYear();
    const date = `${year}-${monthNumber}-${item?.day.padStart(2, '0')}`;
    console.log('date',date) 
    dispatch(updateSelectedDate({data :date}))
  };

  return (
    <View>
      <FlatList
        data={dates}
        renderItem={({ item }) => (
          <DateCard
            item={item}
            isActive={selectedDate === item.id} 
            onPress={() => handleDateSelect(item)} 
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 60,
    height: 100,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 4,
    borderWidth:1,
    borderColor:'#000'
  },
  activeCard: {
    backgroundColor: '#c2c6cf', 
  },
  cardContent: {
    alignItems: 'center',
  },
  month: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weekday: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AvailableDates;
