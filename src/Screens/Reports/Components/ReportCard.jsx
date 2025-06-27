import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ms, s, vs } from "react-native-size-matters";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const IconText = ({ iconName, text }) => {
  return (
    <View style={styles.iconTextBody}>
      <MaterialCommunityIcons name={iconName} size={s(15)} color={"#2372B5"} />
      <Text ellipsizeMode="tail" numberOfLines={1} tyle={styles.iconText}>
        {text || ""}
      </Text>
    </View>
  );
};

const ReportCard = ({ item }) => {
  const navigation = useNavigation();
  const { title, ReportType, createdAt } = item;
  const { name, iconURL } = ReportType;
  const dateObj = new Date(createdAt);
  const time = dateObj.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const date = `${dateObj.getDate().toString().padStart(2, "0")}-${(
    dateObj.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${dateObj.getFullYear()}`;

  const handleViewReport = () => {
    navigation.navigate("ViewReportScreen", { report: item });
  };

  return (
    <TouchableOpacity onPress={handleViewReport}>
      <View style={styles.cardBody}>
        <View style={styles.imageBody}>
          <Image source={{ uri: iconURL }} style={styles.imageStyle} />
        </View>
        <View style={styles.reportDetailBody}>
          <View style={styles.reportDetailRow}>
            <Text
              style={styles.titleText}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {title || ""}
            </Text>
          </View>
          <IconText text={name} iconName="office-building-outline" />
          <View style={styles.iconTextRow}>
            <IconText text={time} iconName="clock-outline" />
            <IconText text={date} iconName="calendar-month-outline" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  cardBody: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 6,
    padding: ms(10),
    flexDirection: "row",
    gap: s(10),
  },
  imageBody: {
    height: s(70),
    width: s(60),
  },
  imageStyle: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 6,
  },
  reportDetailBody: {
    flex: 1,
    justifyContent: "space-between",
    gap: vs(5),
  },
  reportDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    color: "#2372B5",
    fontSize: s(14),
    fontWeight: "600",
  },
  iconTextBody: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(4),
  },
  iconText: {
    color: "#333333",
    fontSize: s(12),
  },
  iconTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
  },
  optionPopupBody: {
    backgroundColor: "#ffffff",
    elevation: 2,
    position: "absolute",
    top: 0,
    right: s(30),
    zIndex: 10000,
    borderRadius: 4,
  },
  optionButton: {
    paddingVertical: vs(8),
    paddingHorizontal: s(20),
  },
  optionButtonBorder: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
  },
  optionText: {
    color: "#1C57A5",
    fontSize: s(11),
    fontWeight: 500,
  },
});
