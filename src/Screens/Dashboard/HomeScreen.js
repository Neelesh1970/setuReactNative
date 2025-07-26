import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  StatusBar,
} from "react-native";
import { color } from "../../assets/colors/Colors";
import { Icons } from "../../assets/icons/Icons";
import { ms } from "react-native-size-matters";
import HomeButton from "../../Components/HomeButton";
import { PageIndicator } from "react-native-page-indicator";
import PagerView from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { screenHeight } from "../../Utils/utils";
import BottomSlider from "../../Components/DashBoardBottomSlider";
import DashboardHeader from "../../Components/DashboardHeader";
import { isTablet } from "react-native-device-info";
import { setActiveModule } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "react-native-paper";

const DATA = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

const languages = [
  { name: "Pascal", key: "1" },
  { name: "C", key: "2" },
  { name: "C++", key: "3" },
  { name: "Java", key: "4" },
  { name: "JavaScript", key: "5" },
  { name: "Go", key: "6" },
  { name: "Kotlin", key: "7" },
  { name: "Swift", key: "8" },
];

const HomeIcons = [
  { id: 2, iconImg: Icons.home_medical_app, label: "Appointment" },
  { id: 20, iconImg: Icons.abha_logo, label: "ABHA" },
  { id: 15, iconImg: Icons.home_van, label: "Generic Medicine" },
  { id: 3, iconImg: Icons.dashboard_book_test, label: "Book Tests" },

  { id: 22, iconImg: Icons.dashboard_digital_nurse, label: "Digital Nurse" },
  { id: 23, iconImg: Icons.dashboard_mental_health, label: "Mental Health" },
  { id: 19, iconImg: Icons.dashboard_drug_directory, label: "Drug Directory" },
  { id: 5, iconImg: Icons.home_asha, label: "Asha" },

  { id: 4, iconImg: Icons.dashboard_insurance, label: "Insurance" },
  { id: 34, iconImg: Icons.dashboard_health_funding, label: "Health Funding" },
  {
    id: 35,
    iconImg: Icons.dashboard_genetic_mapping,
    label: "Genetic Mapping",
  },
  {
    id: 40,
    iconImg: Icons.dashboard_health_analytics,
    label: "Health Analytics",
  },

  { id: 6, iconImg: Icons.home_matrujyoti, label: "Matrujyoti" },
  { id: 16, iconImg: Icons.home_state, label: "Government Schemes" },

  { id: 13, iconImg: Icons.home_eCart, label: "eCart" },
  { id: 8, iconImg: Icons.home_findJobs, label: "Jobs" },
  { id: 21, iconImg: Icons.dashboard_kpo_bpo, label: "BPO/KPO" },
  { id: 24, iconImg: Icons.dashboard_eWealth, label: "eWealth" },
  { id: 25, iconImg: Icons.dashboard_health_loan, label: "Health Loan" },
  { id: 26, iconImg: Icons.dashboard_senior_citizen, label: "Senior Citizen" },
  { id: 27, iconImg: Icons.dashboard_astrology, label: "Astrology" },
  { id: 28, iconImg: Icons.dashboard_matrimony, label: "Matrimony" },
  { id: 29, iconImg: Icons.dashboard_grocery, label: "FMCG/Grocery" },
  { id: 30, iconImg: Icons.dashboard_education, label: "Education" },
  { id: 31, iconImg: Icons.dashboard_my_pet, label: "My Pet" },
  { id: 18, iconImg: Icons.dashboard_agriculture, label: "Agriculture" },
  {
    id: 32,
    iconImg: Icons.dashboard_ayush,
    label: "Ayush",
    imageheight: 50,
    imagewidth: 50,
  },
  { id: 7, iconImg: Icons.dashboard_fitness, label: "Fitness" },
  { id: 33, iconImg: Icons.dashboard_games, label: "Games" },

  { id: 36, iconImg: Icons.dashboard_sex_education, label: "Sex Education" },
  { id: 37, iconImg: Icons.dashboard_health_video, label: "Health Video" },
  { id: 38, iconImg: Icons.dashboard_memory_bank, label: "Memory Bank" },
  { id: 39, iconImg: Icons.dashboard_iot_sensors, label: "IOT Sensors" },
  { id: 17, iconImg: Icons.dashboard_organ_donor, label: "Organ Donor" },
  { id: 10, iconImg: Icons.dashboard_temple_aarti, label: "Temple Aarti" },
  { id: 12, iconImg: Icons.dashboard_stem_cell, label: "Stem Cells" },
  { id: 1, iconImg: Icons.dashboard_ai_calculator, label: "AI Calculator" },
  { id: 9, iconImg: Icons.dashboard_nuetraceuticals, label: "Nutraceuticals" },
  {
    id: 14,
    iconImg: Icons.dashboard_offers_discounts,
    label: "Offers & Discount",
  },
  { id: 11, iconImg: Icons.dashboard_reels, label: "Reels" },
  { id: 41, iconImg: Icons.dashboard_ott, label: "OTT" },
  { id: 42, iconImg: Icons.dashboard_health_coin, label: "Health Coin" },
];

const itemsPerPage_ = 9;
export default function HomeScreen({ mainNavigation }) {
  console.log("My navigation =>", mainNavigation);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const insets = useSafeAreaInsets();
  const [current, setCurrent] = useState(0);
  const [itemsPerPage, setItemPerPage] = useState(9);
  const [pagerHeight, setPagerHeight] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const [numberOfRow, setNumberOfRow] = useState(3);
  const [numberOfColumn, setNumberOfColumn] = useState(isTablet() ? 4 : 3);
  const [username, setUsername] = useState(null);
  const [userName, setUserName] = useState(null);
  const [searchText, setSearchText] = useState("");

  const iconSizes = {
    32: { width: 100, height: 100 },
    2: { width: 65, height: 65 },
    23: { width: 85, height: 80 },
    15: { width: 80, height: 80 },
    6: { width: 80, height: 80 },
    40: { width: 80, height: 80 },
    19: { width: 80, height: 80 },
    35: { width: 70, height: 70 },
    7: { width: 80, height: 80 },
    18: { width: 80, height: 80 },
    37: { width: 80, height: 80 },
    10: { width: 75, height: 75 },
    22: { width: 80, height: 80 },
    20: { width: 75, height: 75 },

    // Add all relevant ids here with their manual sizes
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        console.log("Retrieved Username:", storedUsername);
        if (storedUsername) {
          setUsername(storedUsername);
        } else {
          console.log("No username found in AsyncStorage");
        }
      } catch (error) {
        console.log("Error retrieving data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setUserName(username);
  }, [username]);

  const totalPages = Math.ceil(HomeIcons.length / itemsPerPage);
  const _pages = [];
  for (let i = 0; i < totalPages; i++) {
    _pages.push(i);
  }

  useEffect(() => {
    console.log("Number of row ", numberOfRow);
    setItemPerPage(numberOfRow * numberOfColumn);
  }, [numberOfRow]);

  useEffect(() => {
    if (pagerHeight > 0 && itemHeight > 0) {
      setNumberOfRow(Math.round(pagerHeight / itemHeight));
    }
  }, [pagerHeight, itemHeight]);
  const OnMenuClick = (index) => {
    console.log("Here is the index", index);
    if (index === 8) {
      mainNavigation.navigate("JobHome");
    } else if (index === 2) {
      mainNavigation.navigate("FindDoctors");
    } else if (index === 3) {
      mainNavigation.navigate("BookTestScreen");
      dispatch(setActiveModule("booktest"));
    } else if (index === 18) {
      dispatch(setActiveModule("agri"));
      mainNavigation.navigate("AgricultureHomeScreen");
    } else if (index === 15) {
      mainNavigation.navigate("GenericMedicineHome");
    } else if (index === 16) {
      mainNavigation.navigate("GovernmentSchemes");
    } else if (index === 19) {
      mainNavigation.navigate("DrugDirectoryHome");
    } else if (index === 20) {
      mainNavigation.navigate("Abha");
    } else if (index === 10) {
      mainNavigation.navigate("TempleAartiScreen");
    } else if (index === 7) {
      mainNavigation.navigate("GymHome");
    } else if (index === 23) {
      mainNavigation.navigate("MentalHealth");
    } else if (index === 27) {
      mainNavigation.navigate("ZodiacSign");
    } else if (index === 28) {
      mainNavigation.navigate("Register1");
    } else if (index === 6){
      mainNavigation.navigate("Matrujyoti")
    } else if (index === 4) {
      mainNavigation.navigate("InsuranceHome"); 
    } else if (index === 13) {
      mainNavigation.navigate("EcartFlow");
    }


    
    // else {
    //   mainNavigation.navigate("DrugDirectoryHome");
    // }
  };

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ id: `blank - ${numberOfElementsLastRow}`, value: null }); // Add a placeholder
      numberOfElementsLastRow++;
    }

    return data;
  };

  const renderHomeIcons = ({ item }) => {
    if (item.value === null) {
      return <View style={[styles.gridItem]} />;
    }

    // Default size fallback if id not found
    const { width = 55, height = 55 } = iconSizes[item.id] || {};

    return (
      <View style={styles.gridItem}>
        <HomeButton
          iconImg={item.iconImg}
          label={item.label}
          id={item.id}
          imagewidth={width}
          imageheight={height}
          onClickMenu={OnMenuClick}
        />
      </View>
    );
  };

  const pages = ["Page 1", "Page 2", "Page 3"];

  const renderDots = () => (
    <View style={styles.dotContainer}>
      {Array.from({ length: numPages }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === current ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: ms(70),
        backgroundColor: color.white,
      }}
    >
      <DashboardHeader
        title={"Welcome"}
        name={userName}
        searchText={searchText}
        setSearchText={setSearchText}
        onPressNavigation={() => {
          // setSidebarVisible(true)
          console.log("Main Navigation", mainNavigation);
          navigation.toggleDrawer();
        }}
      />
      {/* {sidebarVisible && <CustomSidebar isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />} */}
      <StatusBar backgroundColor={color.editBlue} />
      {/* <BottomSlider /> */}
      {/* <PagerView
        style={{ flex: 1, height: screenHeight - ms(300) }}
        initialPage={0}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          console.log("PagerHeight ", height);
          setPagerHeight(height);
        }}
        onPageSelected={(e) => {
          console.log(e.nativeEvent.position);
          setCurrent(e.nativeEvent.position);
        }}
      >
        {_pages.map((item) => {
          const startIndex = item * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const currentData = HomeIcons.slice(startIndex, endIndex);

          return (
            <View key={item.toString()}>
              <FlatList
                data={formatData(currentData, numberOfColumn)}
                renderItem={renderHomeIcons}
                keyExtractor={(item) => item.id.toString()}
                numColumns={numberOfColumn} // Number of columns for the grid
                columnWrapperStyle={{
                  justifyContent: "space-between",
                }}
              />
            </View>
          );
        })}

        {/* <View key="2">
          <Text>Second page</Text>
        </View> */}
      {/* </PagerView> */}

      <FlatList
        ListHeaderComponent={<BottomSlider />}
        data={formatData(
          HomeIcons.filter((item) =>
            item.label.toLowerCase().includes(searchText.toLowerCase())
          ),
          numberOfColumn
        )}
        renderItem={renderHomeIcons}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numberOfColumn}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}
      />

      {/* <PageIndicator
        count={totalPages}
        current={current}
        variant="beads"
        color={color.indicator_color}
        activeColor={color.black}
        style={{ alignSelf: "center", padding: 10 }}
      /> */}
    </View>
  );
}

{
  /* <FlatList
          data={HomeIcons}
          renderItem={renderHomeIcons}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3} // Number of columns for the grid
          ListFooterComponent={BottomView}
        /> */
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    padding: 7,
  },
  pagerView: {
    flex: 1,
  },
  cardStysle: {
    marginHorizontal: 5,
  },
  doctorCardStyle: {
    height: ms(150),
    width: ms(300),
  },
  gridItem: {
    flex: 1,
    // marginHorizontal: 10,
    // marginBottom: 10,
    alignItems: "center",
  },

  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "black",
  },
  inactiveDot: {
    backgroundColor: "gray",
  },
});
