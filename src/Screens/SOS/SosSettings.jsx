import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SosNavbar } from "./Components";
import { ms, s, vs } from "react-native-size-matters";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SosSettings = () => {
  const navigation = useNavigation();

  const cards = [
    {
      title: "Register a New Contact",
      icon: "person-add",
      onPress: () => navigation.navigate("SosAddContact"),
    },
    {
      title: "View All Registered Contacts",
      icon: "people-outline",
      onPress: () => navigation.navigate("RegisteredContacts"),
    },
    {
      title: "Edit Profile",
      icon: "person-circle-outline",
      onPress: () => navigation.navigate("SosPersonalInformation"),
    },
    {
      title: "Top Up Plans",
      icon: "wallet-outline",
      onPress: () => navigation.navigate("SosPlan"),
    },
  ];
  const bottomMenuItems = [
    { icon: "rate-review", label: "Rate Us" },
    { icon: "contact-support", label: "Support" },
    { icon: "info-outline", label: "Info" },
  ];

  return (
    <View style={styles.container}>
      <SosNavbar
        navText="Settings"
        backPress={() => {
          navigation.goBack();
        }}
        iconButtons={[
          {
            icon: "document-text-outline",
            label: "Logs",
            onPress: () => navigation.navigate("Logs"),
          },
        ]}
      />
      <View style={styles.settingsGrid}>
        {cards.map((card, index) => (
          <SettingsCard
            key={index}
            icon={card.icon}
            title={card.title}
            onPress={card.onPress}
          />
        ))}
      </View>
      {/*<View style={styles.bottomMenu}>
        {bottomMenuItems.map((item, index) => (
          <BottomMenuCol
            key={index}
            ionIconName={item.icon}
            text={item.label}
          />
        ))}
      </View> */}
    </View>
  );
};

export default SosSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  settingsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: s(10),
    padding: ms(20),
    flex: 1,
  },
  settingCard: {
    borderWidth: s(1),
    borderColor: "#B1A6A6",
    borderRadius: s(8),
    paddingVertical: vs(16),
    paddingHorizontal: s(12),
    backgroundColor: "#FFFFFF",
    marginBottom: vs(8),
    alignItems: "center",
    gap: s(10),
    width: "47%",
  },
  navigateButton: {
    backgroundColor: "#2372B5",
    width: "100%",
    alignItems: "center",
    borderRadius: s(6),
    paddingVertical: vs(2),
  },
  cardTitle: {
    fontSize: s(12),
    color: "#1C1C1C",
    fontWeight: 500,
    textAlign: "center",
  },
  bottomMenu: {
    backgroundColor: "#1C57A5",
    paddingTop: vs(16),
    paddingBottom: vs(10),
    paddingHorizontal: s(30),
    borderTopLeftRadius: s(16),
    borderTopRightRadius: s(16),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomMenuColumn: {
    alignItems: "center",
    gap: s(5),
  },
  bottomText: {
    color: "#FCFCFC",
    fontSize: s(13),
    fontWeight: 500,
  },
});

const SettingsCard = ({ icon, title, onPress }) => {
  return (
    <View style={styles.settingCard}>
      <Ionicons name={icon} size={s(40)} color="#2372B5" />
      <Text style={styles.cardTitle}>{title}</Text>
      <TouchableOpacity style={styles.navigateButton} onPress={onPress}>
        <Ionicons name="arrow-forward" size={s(24)} color="#fcfcfc" />
      </TouchableOpacity>
    </View>
  );
};

const BottomMenuCol = ({ ionIconName, text }) => {
  return (
    <TouchableOpacity style={styles.bottomMenuColumn}>
      <MaterialIcons name={ionIconName} size={s(24)} color="#fcfcfc" />
      <Text style={styles.bottomText}>{text}</Text>
    </TouchableOpacity>
  );
};
