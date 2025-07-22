import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Svg, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');
const bgImage = require('../../assets/images/matrjyoti/image18.png');  // Background image path

// circle constants
const SIZE = 180;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * RADIUS;
const WEEK = 22;
const TOTAL = 40;
const PROG = WEEK / TOTAL;
const OFFSET = CIRC * (1 - PROG);

export default function ReportScreen() {
  const navigation = useNavigation();
  
  const reports = [
    {
      id: '1',
      icon: 'scan-outline',
      title: 'Ultrasound Scan',
      date: '25 March 2025',
      next: '-',
    },
    {
      id: '2',
      icon: 'flask-outline',
      title: 'Blood Sugar',
      date: '25 March 2025',
      next: '-',
    },
    {
      id: '3',
      icon: 'document-text-outline',
      title: 'PHR',
      date: 'View all health records',
      next: '›',
      onPress: () => navigation.navigate('PHR'),
    },
  ];

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
        {/* Progress Circle */}
        <View style={styles.circleBox}>
          <Svg width={SIZE} height={SIZE}>
            <Circle
              stroke="#FFE5CC"
              fill="none"
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              strokeWidth={STROKE}
            />
            <Circle
              stroke="#F57C00"
              fill="none"
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              strokeWidth={STROKE}
              strokeDasharray={`${CIRC} ${CIRC}`}
              strokeDashoffset={OFFSET}
              strokeLinecap="round"
            />
          </Svg>
          <View style={styles.insideCircle}>
            <Text style={styles.weekNum}>{WEEK}</Text>
            <Text style={styles.weekLabel}>Week of {TOTAL}</Text>
          </View>
        </View>

        {/* Due Date */}
        <Text style={styles.due}>Estimated due date: October 6, 2025!!</Text>

        {/* Section Header */}
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>My Pregnancy Report</Text>
          <TouchableOpacity>
            <Text style={styles.viewMore}>View more ›</Text>
          </TouchableOpacity>
        </View>

        {/* Report Cards */}
        {reports.map(r => (
          <TouchableOpacity 
            key={r.id} 
            style={styles.card}
            onPress={r.onPress || (() => {})}
            activeOpacity={r.onPress ? 0.8 : 1}
          >
            <View style={styles.left}>
              <Icon 
                name={r.icon} 
                size={28} 
                color={r.title === 'PHR' ? '#000000' : '#F57C00'} 
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.cardTitle}>
                  {r.title}
                </Text>
                <Text style={styles.cardDate}>
                  {r.title === 'PHR' ? r.date : `Collected on ${r.date}`}
                </Text>
              </View>
            </View>
            <Text style={[
              styles.next,
              r.title === 'PHR' && { color: '#4CAF50', fontSize: 24, marginTop: -5 }
            ]}>
              {r.next}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Videos & Novels */}
        <View style={[styles.headerRow, { marginTop: 32 }]}>
          <Text style={styles.sectionTitle}>Videos & Novels</Text>
        </View>
          <View style={styles.placeholder} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: { 
    flex: 1, 
    // backgroundColor: 'rgba(255, 243, 224, 0.9)' 
  },
  scroll: { alignItems: 'center', paddingVertical: 24 },
  circleBox: { width: SIZE, height: SIZE, justifyContent: 'center', alignItems: 'center' },
  insideCircle: { position: 'absolute', alignItems: 'center' },
  weekNum: { fontSize: 32, fontWeight: '700', color: '#000' },
  weekLabel: { fontSize: 16, color: '#000' },
  due: { marginTop: 12, color: '#000', fontSize: 14, textAlign: 'center' },
  headerRow: {
    width: width - 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#000' },
  viewMore: { fontSize: 14, color: '#888' },
  card: {
    width: width - 32,
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  left: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#000' },
  cardDate: { fontSize: 14, color: '#555', marginTop: 4 },
  next: { fontSize: 14, color: '#555' },
  placeholder: {
    width: width - 32,
    height: 140,
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    marginTop: 12,
  },
});
