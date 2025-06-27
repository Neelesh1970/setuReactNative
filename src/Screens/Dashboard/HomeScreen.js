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

} from 'react-native';
import { color } from '../../assets/colors/Colors';
import { Icons } from '../../assets/icons/Icons';
import { ms } from 'react-native-size-matters';
import HomeButton from '../../Components/HomeButton';
import { PageIndicator } from 'react-native-page-indicator';
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { screenHeight } from '../../Utils/utils';
import BottomSlider from '../../Components/DashBoardBottomSlider';
import DashboardHeader from '../../Components/DashboardHeader';
import { isTablet } from 'react-native-device-info';
import { setActiveModule } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  { id: 3, iconImg: Icons.home_stethoscope, label: "Book Tests" },
  { id: 18, iconImg: Icons.order_medicine, label: "Agriculture" },
  { id: 15, iconImg: Icons.home_van, label: "Generic Medicine" },
  { id: 8, iconImg: Icons.home_eCart, label: "Jobs" },
  { id: 4, iconImg: Icons.home_insurance, label: "Insurance" },
  { id: 1, iconImg: Icons.home_phone, label: "Health Line" },
  { id: 5, iconImg: Icons.home_asha, label: "Asha" },
  { id: 6, iconImg: Icons.home_matrujyoti, label: "Matrujyoti" },
  { id: 7, iconImg: Icons.home_fitness, label: "Fitness" },
  { id: 9, iconImg: Icons.home_chatBot, label: "ChatBot" },
  { id: 13, iconImg: Icons.home_eCart, label: "eCart" },
  { id: 14, iconImg: Icons.home_chatBot, label: "ChatBot" },
  { id: 19, iconImg: Icons.home_van, label: "Drug Directory" },
  { id: 16, iconImg: Icons.home_state, label: "Government Schemes" },
  { id: 17, iconImg: Icons.home_organ_donation, label: "Organ Donation" },
  { id: 20, iconImg: Icons.abha_logo, label: "ABHA" },
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
    setUserName(username)
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
      mainNavigation.navigate("AgricultureScreen");
    } else if (index === 15) {
      mainNavigation.navigate("GenericMedicineHome");
    } else if (index === 19) {
      mainNavigation.navigate("DrugDirectoryHome");
    } else if (index === 20) {
      mainNavigation.navigate("Abha");
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
      data.push({ id: `blank-${numberOfElementsLastRow}`, value: null }); // Add a placeholder
      numberOfElementsLastRow++;
    }

    return data;
  };

  const renderHomeIcons = ({ item }) => {
    if (item.value === null) {
      return <View style={[styles.gridItem]} />;
    }

    return (
      <View
        style={styles.gridItem}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          if (itemHeight == 0) {
            setItemHeight(height);
          } else if (itemHeight < height) {
            setItemHeight(height);
          }
          console.log("Dash board ", height);
        }}
      >
        <HomeButton
          iconImg={item.iconImg}
          label={item.label}
          id={item.id}
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
        title={'Welcome'}
        name={userName}
        onPressNavigation={() => {
          // setSidebarVisible(true)
          console.log("Main Navigation", mainNavigation);
          navigation.toggleDrawer()
        }
        }
      />
      {/* {sidebarVisible && <CustomSidebar isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />} */}
      <StatusBar backgroundColor={color.editBlue} />
      <PagerView
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
      </PagerView>
      <PageIndicator
        count={totalPages}
        current={current}
        variant="beads"
        color={color.indicator_color}
        activeColor={color.black}
        style={{ alignSelf: "center", padding: 10 }}
      />
      <BottomSlider />
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
    marginHorizontal: 10,
    marginBottom: 10,
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
