import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { ms } from "react-native-size-matters";
import { color } from "../../assets/colors/Colors";
import LoginHeader from "../../Components/LoginHeader";
import { useTranslation } from "react-i18next";
import { Icons } from "../../assets/icons/Icons";
import DropShadow from "react-native-drop-shadow";
import { screenWidth } from "../../Utils/utils";
import moment from "moment";
function Schedule({ mainNavigation }) {
  const { t } = useTranslation();
  const data = [
    {
      isHeader: true,
      header_name: "Upcoming Appointment",
    },
    {
      isHeader: false,
      appointment_type: "GENERAL CHECK UP",
      appointment_date: "2024-09-05 13:00:00",
      hospital_name: "Jupiter Hospital",
      doctor_name: "Dr. Shruti Kedia ",
      appointment_status: "CONFIRMED",
      appointment_image: Icons.my_schedule_1,
    },
    {
      isHeader: false,
      appointment_type: "CHEST X-RAY",
      appointment_date: "2024-09-05 13:00:00",
      hospital_name: "Jupiter Hospital",
      doctor_name: "Dr. Shruti Kedia ",
      appointment_status: "PENDING APPROVAL",
      appointment_image: Icons.my_schedule_2,
    },
    {
      isHeader: true,
      header_name: "Previous Appointment",
    },
    {
      isHeader: false,
      appointment_type: "Blood Test",
      appointment_date: "2024-09-05 13:00:00",
      hospital_name: "Jupiter Hospital",
      doctor_name: "Dr. Shruti Kedia ",
      appointment_status: "COMPLETED",
      appointment_image: Icons.my_schedule_3,
    },
    {
      isHeader: false,
      appointment_type: "Blood Test",
      appointment_date: "2024-09-05 13:00:00",
      hospital_name: "Jupiter Hospital",
      doctor_name: "Dr. Shruti Kedia ",
      appointment_status: "CANCELLED",
      appointment_image: Icons.my_schedule_3,
    },
    {
      isHeader: false,
      appointment_type: "Blood Test",
      appointment_date: "2024-09-05 13:00:00",
      hospital_name: "Jupiter Hospital",
      doctor_name: "Dr. Shruti Kedia ",
      appointment_status: "RESCHEDULED",
      appointment_image: Icons.my_schedule_3,
    },
  ];
  const RenderSubItem = ({ value, icon, style }) => {
    return (
      <View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
        <Image
          source={icon}
          style={{ height: ms(10), width: ms(10), resizeMode: "contain" }}
        />
        <Text
          style={{
            fontFamily: "interRegular",
            fontSize: ms(12),
            color: color.black,
            marginStart: ms(3),
          }}
        >
          {value}
        </Text>
      </View>
    );
  };

  const renderAppointment = ({ item }) => {
    if (item.isHeader) {
      return (
        <Text
          style={{
            fontFamily: "bold",
            fontSize: ms(20),
            color: color.filter_black,
            padding: ms(10),
          }}
        >
          {item.header_name}
        </Text>
      );
    } else {
      return (
        <DropShadow style={styles.shadowProp}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              backgroundColor: color.white,

              borderRadius: ms(10),
            }}
          >
            <View
              style={{ flex: 1, padding: ms(10), justifyContent: "center" }}
            >
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: ms(15),
                  color: color.appointment_type,
                }}
              >
                {item.appointment_type}
              </Text>
              <View
                style={{ flexDirection: "row", gap: ms(10), marginTop: ms(10) }}
              >
                <RenderSubItem
                  value={moment(item.appointment_date).format("MMMM DD,YYYY")}
                  icon={Icons.schedule_calendar}
                />
                <RenderSubItem
                  value={moment(item.appointment_date).format("hh:mm A")}
                  icon={Icons.schedule_time}
                />
              </View>
              <View
                style={{ flexDirection: "row", gap: ms(10), marginTop: ms(5) }}
              >
                <RenderSubItem
                  value={item.hospital_name}
                  icon={Icons.location}
                  style={{ flex: 1 }}
                />
                <RenderSubItem
                  value={item.doctor_name}
                  icon={Icons.schedule_doc}
                  style={{ flex: 1 }}
                />
              </View>
              <Text
                style={{
                  marginTop: ms(5),
                  fontFamily: "interRegular",
                  fontSize: ms(12),
                  color: color.black,
                }}
              >
                {t("status") + ": "}
                <Text
                  style={{
                    fontFamily: "interBold",
                    fontSize: ms(12),
                    color:
                      item.appointment_status === "CONFIRMED"
                        ? color.appointment_confirmed
                        : item.appointment_status === "PENDING APPROVAL"
                        ? color.appointment_pending
                        : item.appointment_status === "CANCELLED" ||
                          item.appointment_status === "RESCHEDULED"
                        ? color.appointment_cancelled
                        : color.success,
                  }}
                >
                  {item.appointment_status}
                </Text>
              </Text>
            </View>
            <Image
              source={item.appointment_image}
              style={{
                height: screenWidth / 2.8,
                width: screenWidth / 3.5,
                resizeMode: "cover",
                borderRadius: ms(10),
              }}
            />
          </View>
        </DropShadow>
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.white,
      }}
    >
      <LoginHeader title={t("schedule")} />
      <View style={{ flex: 1, padding: ms(6) }}>
        <FlatList
          data={data}
          renderItem={renderAppointment}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
        />
      </View>
    </View>
  );
}
export default Schedule;
const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#00000025",
    shadowOffset: { width: 0, height: ms(3) },
    shadowOpacity: 0.4,
    shadowRadius: ms(2),
    padding: ms(10),
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: ms(40),
    height: ms(40),
    zIndex: 1,
  },
  icon: {
    width: ms(6.5),
    height: ms(13),
  },
});
