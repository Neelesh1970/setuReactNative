// src/Screens/GovernmentSchemes/SchemeOverviewScreen.js

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

// Scheme data mapped by scheme ID
const SCHEME_DATA = {
  // PMJDY - Banking
  '6': {
    title: 'Pradhan Mantri Jan Dhan Yojana (PMJDY)',
    launchedBy: 'Ministry of Finance, Government of India',
    image: require('../../assets/images/scheme.png'),
    objective: 'To ensure financial inclusion by providing universal access to banking facilities, especially for the economically weaker sections and those in rural areas.',
    features: [
      { id: 'f1', icon: '🏦', title: 'Zero Balance Account', subtitle: 'No minimum balance required' },
      { id: 'f2', icon: '💳', title: 'Rupay Debit Card', subtitle: 'Free with inbuilt accident insurance' },
      { id: 'f3', icon: '💰', title: 'Overdraft Facility', subtitle: 'Up to ₹10,000 after 6 months' },
      { id: 'f4', icon: '🛡️', title: 'Accident Insurance', subtitle: '₹1 lakh (₹2 lakh post-2018)' },
      { id: 'f5', icon: '🔒', title: 'Life Insurance', subtitle: '₹30,000 for eligible holders' },
      { id: 'f6', icon: '🔄', title: 'Direct Benefit Transfers (DBT)', subtitle: 'LPG, pensions, scholarships, etc.' },
    ],
    impact: [
      { indicator: 'Total PMJDY Accounts', figure: 'Over 49 crore' },
      { indicator: 'Total Deposits', figure: '₹2.08 lakh crore+' },
      { indicator: 'Rupay Cards Issued', figure: '33.98 crore+' },
    ],
    applyUrl: 'https://pmjdy.gov.in/apply',
    learnMoreUrl: 'https://pmjdy.gov.in/learn-more',
  },
  
  // Mukhyamantri Swasthya Yojana - Health
  'msy': {
    title: 'Mukhyamantri Swasthya Yojana',
    launchedBy: 'State Government',
    image: require('../../assets/images/scheme.png'),
    objective: 'To provide comprehensive health insurance coverage to the residents of the state, especially the economically weaker sections.',
    features: [
      { id: 'f1', icon: '🏥', title: 'Health Insurance', subtitle: 'Coverage up to ₹5 lakhs per family' },
      { id: 'f2', icon: '👨‍⚕️', title: 'Cashless Treatment', subtitle: 'At empaneled hospitals' },
      { id: 'f3', icon: '👨‍👩‍👧‍👦', title: 'Family Coverage', subtitle: 'Up to 5 members per family' },
      { id: 'f4', icon: '💊', title: 'Pre-existing Diseases', subtitle: 'Covered from day one' },
      { id: 'f5', icon: '👵', title: 'Senior Citizen Care', subtitle: 'Special provisions for elderly' },
      { id: 'f6', icon: '🚑', title: 'Emergency Care', subtitle: '24/7 emergency services' },
    ],
    impact: [
      { indicator: 'Total Beneficiaries', figure: 'Over 2 crore' },
      { indicator: 'Hospitals Empaneled', figure: '500+' },
      { indicator: 'Total Claims Settled', figure: '₹500+ crore' },
    ],
    applyUrl: 'https://pmjay.gov.in',
    learnMoreUrl: 'https://pmjay.gov.in',
  },
  
  // PM-KISAN - Agriculture
  '1': {
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    launchedBy: 'Ministry of Agriculture, Government of India',
    image: require('../../assets/images/scheme.png'),
    objective: 'To provide income support of ₹6,000 per year to all farmer families across the country.',
    features: [
      { id: 'f1', icon: '💰', title: 'Income Support', subtitle: '₹6,000 per year' },
      { id: 'f2', icon: '🔄', title: 'Installments', subtitle: '3 installments of ₹2,000 each' },
      { id: 'f3', icon: '👨‍🌾', title: 'Landholding Farmers', subtitle: 'All eligible farmers' },
      { id: 'f4', icon: '🏦', title: 'Direct Benefit Transfer', subtitle: 'Amount credited to bank account' },
      { id: 'f5', icon: '📱', title: 'eKYC Required', subtitle: 'Mandatory for payment' },
    ],
    impact: [
      { indicator: 'Total Beneficiaries', figure: '11 crore+' },
      { indicator: 'Amount Disbursed', figure: '₹2.5+ lakh crore' },
      { indicator: 'Covered States/UTs', figure: 'All 28 states & 8 UTs' },
    ],
    applyUrl: 'https://pmkisan.gov.in',
    learnMoreUrl: 'https://pmkisan.gov.in',
  },
  
  // Default scheme (if ID not found)
  default: {
    title: 'Government Scheme',
    launchedBy: 'Government of India',
    image: require('../../assets/images/scheme.png'),
    objective: 'Details about this scheme will be available soon.',
    features: [],
    impact: [],
    applyUrl: '#',
    learnMoreUrl: '#',
  },
};

const SchemeOverviewScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const schemeId = params?.schemeId || '6'; // Default to PMJDY if no ID provided
  const scheme = SCHEME_DATA[schemeId] || SCHEME_DATA.default;

  useEffect(() => {
    navigation.setOptions({ title: scheme.title });
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header row */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Government Schemes</Text>
          <TouchableOpacity onPress={() => {/* share */}}>
            <Text style={styles.shareIcon}>📄</Text>
          </TouchableOpacity>
        </View>

        {/* Scheme Title */}
        <Text style={styles.titleRow}>🏦 {scheme.title}</Text>
        <Text style={styles.launched}>✅ Launched By {scheme.launchedBy}</Text>

        {/* Image */}
        <Image source={scheme.image} style={styles.image} />

        {/* Objective */}
        <View style={styles.objectiveBox}>
          <Text style={styles.objectiveTitle}>🎯 Objective</Text>
          <Text style={styles.objectiveText}>{scheme.objective}</Text>
        </View>

        {/* Key Features */}
        <Text style={styles.sectionTitle}>🔑 Key Features</Text>
        <View style={styles.featuresGrid}>
          {scheme.features.map(f => (
            <View key={f.id} style={styles.featureCard}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureSubtitle}>{f.subtitle}</Text>
            </View>
          ))}
        </View>

        {/* Impact Table */}
        <Text style={styles.sectionTitle}>Scheme Impact (as of 2023)</Text>
        <View style={styles.table}>
          <View style={[styles.row, styles.rowHeader]}>
            <Text style={[styles.cell, styles.cellHeader]}>INDICATOR</Text>
            <Text style={[styles.cell, styles.cellHeader, styles.cellLast]}>FIGURE</Text>
          </View>
          {scheme.impact.map((r,i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.cell}>{r.indicator}</Text>
              <Text style={[styles.cell, styles.cellLast]}>{r.figure}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.applyBtn}
          onPress={() => Linking.openURL(scheme.applyUrl)}
        >
          <Text style={styles.applyBtnText}>Apply for {scheme.title.split(' ')[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.learnBtn}
          onPress={() => Linking.openURL(scheme.learnMoreUrl)}
        >
          <Text style={styles.learnBtnText}>Learn More</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 16, paddingBottom: 40 },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backIcon: { fontSize: 24, color: '#4A6F44' },
  headerTitle: { flex:1, textAlign:'center', fontSize:18, fontWeight:'600', color:'#234522' },
  shareIcon: { fontSize:20, color:'#4A6F44' },

  titleRow: { fontSize:18, fontWeight:'600', color:'#234522', marginBottom:4 },
  launched: { fontSize:13, color:'#4A6F44', marginBottom:12 },

  image: {
    width:'100%',
    height:220,
    borderRadius:12,
    marginBottom:16,
    backgroundColor:'#eee'
  },

  objectiveBox: {
    backgroundColor:'#F0F8FF',
    borderRadius:10,
    padding:12,
    marginBottom:20,
  },
  objectiveTitle: { fontSize:14, fontWeight:'600', marginBottom:6 },
  objectiveText: { fontSize:14, color:'#444', lineHeight:20 },

  sectionTitle: { fontSize:16, fontWeight:'600', marginBottom:12 },
  featuresGrid: { flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between', marginBottom:20 },
  featureCard: { width:'48%', backgroundColor:'#F7F9FC', borderRadius:10, padding:12, marginBottom:12 },
  featureIcon:{ fontSize:18, marginBottom:6 },
  featureTitle:{ fontSize:14, fontWeight:'600', marginBottom:4 },
  featureSubtitle:{ fontSize:13, color:'#666' },

  table: { borderWidth:1, borderColor:'#ddd', borderRadius:8, overflow:'hidden', marginBottom:20 },
  row:{ flexDirection:'row' },
  rowHeader:{ backgroundColor:'#f0f0f0' },
  cell:{ flex:1, padding:10, borderRightWidth:1, borderRightColor:'#ddd' },
  cellLast:{ borderRightWidth:0 },
  cellHeader:{ fontWeight:'600', fontSize:13 },

  applyBtn: {
    backgroundColor:'#16A34A',
    borderRadius:8,
    paddingVertical:14,
    alignItems:'center',
    marginBottom:12,
  },
  applyBtnText:{ color:'#fff', fontSize:16, fontWeight:'600' },

  learnBtn:{
    borderWidth:1,
    borderColor:'#2563EB',
    borderRadius:8,
    paddingVertical:12,
    alignItems:'center',
  },
  learnBtnText:{ color:'#2563EB', fontSize:16, fontWeight:'600' },
});

export default SchemeOverviewScreen;
