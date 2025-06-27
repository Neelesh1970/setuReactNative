import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { color } from "../../assets/colors/Colors";
import OrderHeader from "../../Components/OrderHeader";
import { ms, vs } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import { Icons } from "../../assets/icons/Icons";
import ListHeader from "../../Components/ListHeader";
import { productData, productMonsoon, billSummary } from "../../Utils/utils";
import ProductCell from "../../Components/ProductCell";

export default function SearchView({ navigation }) {
  const { t } = useTranslation();

  const data = [
    {
      product_img: Icons.cough_syrup,
      name: "Cough, cold & Fever",
    },
    {
      product_img: Icons.cough_syrup,
      name: "Cough, cold & Fever",
    },
  ];

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          flex: 1,

          alignItems: "center",
          gap: ms(10),
        }}
      >
        <Image
          source={item.product_img}
          style={{ width: ms(52), height: ms(52) }}
          resizeMode="contain"
        />
        <View>
          <Text style={{ fontFamily: "medium", fontSize: ms(12) }}>
            Cough, cold & Fever Category
          </Text>
          <Text
            style={{
              fontFamily: "medium",
              fontSize: ms(10),
              color: color.appointment_grey3,
            }}
          >
            Category
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.colorPrimary} />
      <OrderHeader title={"My Orders"} onIconPress={handleGoBack} />
      <ScrollView>
        <View style={{ marginHorizontal: ms(25) }}>
          <View
            style={{
              flexDirection: "row",
              borderColor: color.searchInputBorder,

              backgroundColor: color.search_bg,
              borderRadius: 14,
              paddingHorizontal: ms(10),
              paddingVertical: ms(8),
              marginTop: ms(12),

              alignItems: "center",
            }}
          >
            <Image
              source={Icons.search_icon}
              style={{
                height: vs(20),
                width: ms(20),
                resizeMode: "contain",
                marginStart: ms(8),
                tintColor: color.colorPrimary,
              }}
            />
            <TextInput
              style={{
                flex: 1,
                marginStart: ms(16),
                fontFamily: "poppinsRegular",
                fontSize: ms(12),
                color: color.black,
                //padding: 3,
                marginTop: ms(2),

                alignItems: "center",
              }}
              placeholderTextColor={color.appointment_grey3}
              cursorColor={color.black}
              placeholder={t("search") + "..."}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: ms(15),
            }}
          >
            <Text
              style={{
                color: color.subtitleGrey,
                fontSize: ms(12),
                fontFamily: "medium",
              }}
            >
              {t("recent_search")}
            </Text>
            <Text
              style={{
                color: color.colorPrimary,
                fontSize: ms(12),
                fontFamily: "medium",
              }}
            >
              Clear all
            </Text>
          </View>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            style={{ marginTop: vs(10), marginHorizontal: vs(5) }}
          />
        </View>

        <ListHeader
          headerTitle={t("in_the_spotlight")}
          option={false}
          containerStyle={{
            paddingStart: ms(16),
            paddingEnd: ms(16),
            marginTop: ms(10),
          }}
        />
        <View
          style={{
            backgroundColor: color.white,
            paddingStart: ms(16),
            paddingEnd: ms(16),
          }}
        >
          <FlatList
            horizontal
            data={productData}
            renderItem={(item) => {
              return <ProductCell data={item} />;
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatListContent: {
    paddingTop: ms(10),

    // Adjust if needed
  },
  separator: {
    height: ms(25),
  },
});
