import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icons } from "../../assets/icons/Icons";
import DropShadow from "react-native-drop-shadow";
import { color } from "../../assets/colors/Colors";
import { ms } from "react-native-size-matters";
import Button from "../Button";

import { useTranslation } from "react-i18next";

const AppointmentCard = ({
  doctorImage,
  doctorName,
  specialization,
  degree,
  experience,
  rating,
  location,
  distance,
  availability,
  cost,
  onBookPress,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { t } = useTranslation();
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={doctorImage} style={styles.doctorImage} />
        <View style={styles.infoContainer}>
          <View style={styles.infoTextContainer}>
            <Text style={styles.name}>{doctorName}</Text>
            <Text style={styles.specialization}>{specialization}</Text>
            <Text style={styles.degree}>{degree}</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.detail}>{experience}</Text>
              <Text style={styles.rating}>{rating}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
          >
            <Image
              source={isFavorited ? Icons.heart_fill : Icons.heart_icon}
              style={styles.favoriteIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.iconContainer}>
          <Image source={Icons.location_appointment} style={styles.icon} />
        </View>
        <View style={styles.textRow}>
          <View>
            <Text style={styles.locationText}>{location}</Text>
            <Text style={styles.locationText}>{distance}</Text>
          </View>
          <Text style={styles.costText}>{cost}</Text>
        </View>
      </View>

      <View style={styles.secondInfoRow}>
        <View style={styles.iconContainer}>
          <Image source={Icons.house_appointment} style={styles.icon} />
        </View>
        <View style={styles.textRow}>
          <View>
            <Text style={styles.availableText}>{t("available_at")}</Text>
            <Text style={styles.availableText}>{availability}</Text>
          </View>
          <Button
            title={t("book_appointment")}
            backgroundColor={color.colorPrimary}
            textStyle={styles.buttonText}
            buttonStyle={styles.buttonStyle}
            onPress={onBookPress}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "#00000025",
    elevation: 3,
  },
  imageContainer: {
    flexDirection: "row",
    gap: 15,
  },
  doctorImage: {
    height: 70,
    width: 70,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  infoTextContainer: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontFamily: "medium",
    fontSize: ms(14),
    color: color.black,
  },
  specialization: {
    color: color.appointment_black,
    fontSize: ms(10),
    fontFamily: "regular",
  },
  degree: {
    color: color.appointment_black,
    fontSize: ms(10),
    fontFamily: "regular",
  },
  detailsContainer: {
    flexDirection: "row",
    gap: 15,
  },
  detail: {
    color: color.appointment_black,
    fontSize: ms(10),
    fontFamily: "medium",
  },
  rating: {
    color: color.appointment_green,
    fontSize: ms(10),
    fontFamily: "medium",
  },
  favoriteButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  favoriteIcon: {
    width: 20,
    height: 20,
  },
  infoRow: {
    marginTop: 25,

    flexDirection: "row",
  },
  secondInfoRow: {
    marginTop: 10,

    flexDirection: "row",
  },
  iconContainer: {
    width: ms(15),
    height: ms(15),
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: ms(10),
    height: ms(12),
  },
  textRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginStart: 2,
  },
  locationText: {
    color: color.appointment_grey,
    fontSize: ms(11),
    fontFamily: "regular",
  },
  costText: {
    color: color.black,
    fontSize: ms(12),
    fontFamily: "bold",
  },
  availableText: {
    color: color.appointment_grey,
    fontSize: ms(11),
    fontFamily: "regular",
  },
  buttonText: {
    fontSize: 12,
    color: color.white,
  },
  buttonStyle: {
    paddingHorizontal: 20,
    marginStart: 0,
    marginBottom: 0,
    marginEnd: 0,
    height: 35,
  },
});

export default AppointmentCard;
