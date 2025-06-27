import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ms } from "react-native-size-matters";
import { color } from "../../assets/colors/Colors";
import LoginHeader from "../../Components/LoginHeader";
import { useTranslation } from "react-i18next";
import { Icons } from "../../assets/icons/Icons";
import DropShadow from "react-native-drop-shadow";
import { screenWidth } from "../../Utils/utils";
import moment from "moment";
import { useState } from "react";

function SetuChat({ mainNavigation }) {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  const renderChats = ({ item }) => {
    // Render each chat item passed by FlatList
    return (
      <View
        style={{
          backgroundColor: color.setu_chat_color,
          marginVertical: ms(5),
          padding: ms(10),
          marginStart: screenWidth / 4,
          borderRadius: ms(14),
        }}
      >
        <Text
          style={{
            fontFamily: "nunitoBold",
            fontSize: ms(14),
            color: color.white,
          }}
        >
          {item}
        </Text>
      </View>
    );
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Only send if there's non-whitespace text
      setChats((prevChats) => [message, ...prevChats]); // Append new message to the chats array
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.white,
      }}
    >
      <LoginHeader title={t("setuchat")} />
      <View style={{ flex: 1, padding: ms(6) }}>
        <FlatList
          data={chats} // Provide the chats array to FlatList
          renderItem={renderChats}
          keyExtractor={(item, index) => index.toString()}
          inverted
        />
        <DropShadow style={styles.shadowProp}>
          <View
            style={{
              backgroundColor: color.white,
              borderRadius: ms(25),
              flexDirection: "row",
              padding: 10,
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder={t("write_your_message")}
              style={{
                paddingStart: ms(5),
                flex: 1,
                fontFamily: "nunitoBold",
                fontSize: ms(13),
              }}
              value={message} // Controlled input
              onChangeText={setMessage}
              placeholderTextColor={color.chat_placeholder_grey}
            />
            <View
              style={{
                flexDirection: "row",
                gap: ms(8),
                alignItems: "center",
                marginEnd: ms(10),
              }}
            >
              <TouchableOpacity>
                <Image
                  source={Icons.attachment}
                  style={{
                    height: ms(15),
                    width: ms(15),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSendMessage}>
                <Image
                  source={Icons.chat_send}
                  style={{
                    height: ms(20),
                    width: ms(20),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </DropShadow>
        <View style={{ height: ms(90) }} />
      </View>
    </View>
  );
}
export default SetuChat;
const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#00000025",
    shadowOffset: { width: ms(5), height: ms(4) },
    shadowOpacity: 0.3,
    shadowRadius: ms(3),
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
