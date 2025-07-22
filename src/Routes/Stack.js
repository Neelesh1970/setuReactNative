import index from "../Screens/Payment";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../Screens/Splash/firstScreen";
import Walkthrough from "../Screens/Walkthrough/WalkthroughScreen";
import LoginScreen from "../Screens/Authentication/Login";
import RegistrationScreen from "../Screens/Authentication/Registration";
import ForgotPassword from "../Screens/Authentication/ForgotPassword";
import LoginOtpScreen from "../Screens/Authentication/LoginOtpScreen";
import ForgotPasswordOTP from "../Screens/Authentication/ForgotPasswordOTP";
import ResetPassword from "../Screens/Authentication/ResetPassword";
import PasswordChangeSuccess from "../Screens/Authentication/PasswordChangeSuccess";
import DashboardScreen from "../Screens/Dashboard/DashboardScreen";
import BookTestScreen from "../Screens/Dashboard/BookTest/BookTestPage/index";
import LoginMobileScreen from "../Screens/Authentication/LoginMobileScreen";
import { HealthPackageCard } from "../Screens/Dashboard/BookTest/FullBodyCheckPage";
import { FullBodyInfoScreen } from "../Screens/Dashboard/BookTest/FullBodyCheckPage/FullBodyInfoScreen";
import CartScreen from "../Screens/Dashboard/BookTest/Cart/Cart";
import AddressForm from "../Screens/Dashboard/Address/AddressForm";
import CheckoutDetails from "../Screens/Dashboard/Checkout/CheckoutDetails";
import ChangeAddress from "../Screens/Dashboard/Address/ChangeAddress";
import PickupSlotDetails from "../Screens/Dashboard/Pickupslot/PickupSlotDetails";
import AgriScreen from "../Screens/Agro/AgriScreen";
import Categories from "../Screens/Agriculture/CategoriesPage/Categories";
import ProductDetails from "../Screens/Agriculture/CategoriesPage/ProductDetails";
import KnowledgeHub from "../Screens/Agriculture/CategoriesPage/KnowledgeHub";
import AgriCartScreen from "../Screens/Agriculture/Cart/Cart";

import { AgricultureScreen } from "../Screens/Agriculture";

import {
  JobDetails,
  JobHome,
  JobProfile,
  JobSearchView,
} from "../Screens/Jobs";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  DoctorAppointment,
  DoctorReview,
  Doctors,
  FindDoctors,
  MyAppointment,
  MeetingWebView,
  DoctorPaymentFailure,
} from "../Screens/TeleMedicines";
import { Text, TouchableOpacity, View } from "react-native";
import GovernmentSchemesScreen from "../Screens/GovernmentSchemes/GovernmentSchemesScreen";
import CategoriesScreen from "../Screens/GovernmentSchemes/CategoriesScreen";
import SchemeListScreen from "../Screens/GovernmentSchemes/SchemeListScreen";
import StateSchemesList from "../Screens/GovernmentSchemes/StateSchemesList";
import CentralSchemesList from "../Screens/GovernmentSchemes/CentralSchemesList";
import EligibleSchemesScreen from "../Screens/GovernmentSchemes/EligibleSchemesScreen";
import SchemeDetailScreen from "../Screens/GovernmentSchemes/SchemeDetailScreen";
import SchemeOverviewScreen from "../Screens/GovernmentSchemes/SchemeOverviewScreen";
import HealthDataScreen from "../Screens/GovernmentSchemes/HealthDataScreen";
import EligibilityCriteriaScreen from "../Screens/GovernmentSchemes/EligibilityCriteriaScreen";

import {
  DrugDirectoryAtoZ,
  DrugDirectoryHome,
  DrugCategory,
  DrugCategoryDetail,
  DrugSearch,
  Drugs,
  DrugByBrand,
} from "../Screens/DrugDirectory";
import OrderFailure from "../Screens/Dashboard/Checkout/OrderFailure";
import BookingOrderList from "../Screens/Dashboard/BookTest/OrderListDetails/OrderList";
import OrderSuccess from "../Screens/Dashboard/Checkout/OrderSuccess";
import GenericMedicineHome from "../Screens/GenericMedicine/GenericMedicineHome";
import AddNewAddress from "../Screens/GenericMedicine/AddNewAddress";
import AddressBottomSheet from "../Screens/GenericMedicine/AddressBottomSheet";
import AllfilterBottomSheet from "../Screens/GenericMedicine/AllfilterBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import CartItem from "../Screens/GenericMedicine/CartItem";
import ChooseAddress from "../Screens/GenericMedicine/ChooseAddress";
import ConfirmDeliverySheet from "../Screens/GenericMedicine/ConfirmDeliverySheet";
import UploadPrescription from "../Screens/GenericMedicine/UploadPrescription";
import ProductView from "../Screens/GenericMedicine/ProductView";
import GenCartScreen from "../Screens/GenericMedicine/Cart";
import PaymentDone from "../Screens/GenericMedicine/PaymentDone";
// import Product from '../Screens/Appointment/Product';
import SearchView from "../Screens/GenericMedicine/SearchView";
import MyOrders from "../Screens/GenericMedicine/MyOrders";
import OnGoing from "../Screens/GenericMedicine/OnGoing";
import Payment from "../Screens/Payment";
import GenericMedicines from "../Screens/GenericMedicine/Cart";

import AgroScreenSlotDetails from "../Screens/Agriculture/AgriculturePage/PickupSlotDetails";
import Product from "../Screens/Appointment/Product";

import AgriOrderSuccess from "../Screens/Agro/AgriOrderSuccess";
import AgriAppointmentsList from "../Screens/Agriculture/Orderlisting/AgriOrderListing";
import NewChangePassword from "../Screens/Dashboard/BookTest/changepassword";
import EditUserProfile from "../Screens/Dashboard/BookTest/EditUserProfile";
import StateSelectionScreen from "../Screens/GovernmentSchemes/StateSelectionScreen";
import CasteSelectionScreen from "../Screens/GovernmentSchemes/CasteSelectionScreen";
import DisabilityScreen from "../Screens/GovernmentSchemes/DisabilityScreen";
import QualificationScreen from "../Screens/GovernmentSchemes/QualificationScreen";

import {
  Abha,
  AbhaAadharOTP,
  AbhaCard,
  AbhaHome,
  AbhaNumberOTP,
  CreateAbhaAadhar,
  CreateAbhaNumber,
} from "../Screens/Abha";
import { s, vs } from "react-native-size-matters";
import { ReportScreen, ReportsHome, ViewReportScreen } from "../Screens/Reports";
import AgricultureNavigator from "../Screens/NewAgriculture/navigation/AgricultureNavigator";
import TempleAartiScreen from "../Screens/Temple_Aarti/TempleAartiScreen";
import LiveAartiScreen from "../Screens/Temple_Aarti/LiveAartiscreen";
import AartiDetailScreen from "../Screens/Temple_Aarti/AartiDetailScreen";
import GymHomeScreen from "../Screens/Gym/screens/GymHomeScreen";
import AnalyzeFoodScreen from "../Screens/Gym/screens/AnalyzeFoodScreen";
import NutritionAdviceScreen from "../Screens/Gym/screens/NutritionAdviceScreen";
import WorkoutPlanScreen from "../Screens/Gym/screens/WorkOutPlanScreen";
import ExerciseDetailsScreen from "../Screens/Gym/screens/ExerciseDetailScreen";
import BrowseExercisesScreen from "../Screens/Gym/screens/BrowseExerciseScreen";
import WorkoutDetailScreen from "../Screens/Gym/screens/WorkOutDetailScreen";
//import Dashboard from "../features/mentalHealth/screens/Dashboard";
import SelfAssessment from "../features/mentalHealth/screens/SelfAssessment";
import AssessmentRunner from "../features/mentalHealth/screens/AssessmentRunner";
import AssessmentResults from "../features/mentalHealth/screens/AssessmentResults";
import ActivityLog from "../features/mentalHealth/screens/ActivityLog";
import MentalHealthHomeScreen from "../features/mentalHealth/screens/MentalHealthHomeScreen";
import BookSpecialistScreen from "../features/mentalHealth/screens/BookSpecialistScreen";
import AstrologyHome from "../Screens/Astrology/AstrologyHome";
import ZodiacScreen from "../Screens/Astrology/ZodiacSign";
import DailyHoroscopeScreen from "../Screens/Astrology/DailyHoroscopeScreen";
import HomeScreen from "../Screens/Dashboard/HomeScreen";
import Schedule from "../Screens/Dashboard/Schedule";
import SetuChat from "../Screens/Dashboard/SetuChat";
import BookSoilScreen from "../Screens/NewAgriculture/BookSoilScreen";
import RegistrationStep1 from "../Screens/Matrimony/Registration1";
import AboutYouScreen from "../Screens/Matrimony/Registrarion2";
import Step3Screen from "../Screens/Matrimony/Registration3";
import FilterScreen from "../Screens/Matrimony/FilterScreen";
import ProfileDetailScreen from "../Screens/Matrimony/ProfileDetailScreen";
import ChatsScreen from "../Screens/Matrimony/ChatScreen";
import MatriBottomTabs from "../Screens/Matrimony/navigation/MatriBottomTab";
import { Logs, RegisteredContacts, SosAddContact, SosHome, SosPersonalInformation, SosPlan, SosSettings } from "../Screens/SOS";
import { Allergies, BiomedicalImplants, Immunization, LifeStyle, MediaViewer, MedicalDocumentsUpload, Medication, MedicationList, MedicineOrderHistory, TestList, TestReport, VitalSigns } from "../Screens/Reports/Screens";
import PanchangScreen from "../Screens/Astrology/PanchangScreen";
import FutureHoroscopeScreen from "../Screens/Astrology/FutureHoroscope";
import MatrujyotiNavigator from "../Screens/Matrjyoti/navigation/MatrujyotiNavigator";

const Stack = createStackNavigator();

export const StackNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Walkthrough"
        component={Walkthrough}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginOtpScreen"
        component={LoginOtpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginMobileScreen"
        component={LoginMobileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* <Stack.Screen
        name="FindDoctor"
        component={FindDoctors}
        options={{
          headerShown: false,
        }}
      /> */}

      <Stack.Screen
        name="ForgotPasswordOTP"
        component={ForgotPasswordOTP}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PasswordChangeSuccess"
        component={PasswordChangeSuccess}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BookTestScreen"
        component={BookTestScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GovernmentSchemes"
        component={GovernmentSchemesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StateSchemesList"
        component={StateSchemesList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CentralSchemesList"
        component={CentralSchemesList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EligibleSchemes"
        component={EligibleSchemesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SchemeList"
        component={SchemeListScreen}
        options={({ route }) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="SchemeOverview"
        component={SchemeOverviewScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HealthDataScreen"
        component={HealthDataScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EligibilityCriteria"
        component={EligibilityCriteriaScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SchemeDetail"
        component={SchemeDetailScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="HealthPackageCard"
        component={HealthPackageCard}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="fullbodyinfo"
        component={FullBodyInfoScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Address"
        component={AddressForm}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CheckoutDetails"
        component={CheckoutDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangeAddress"
        component={ChangeAddress}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PickupSlotDetails"
        component={PickupSlotDetails}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AgroScreenSlotDetails"
        component={AgroScreenSlotDetails}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AgriOrderSuccess"
        component={AgriOrderSuccess}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AgriScreen"
        component={AgriScreen}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="AgriAppointmentsList"
        component={AgriAppointmentsList}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="KnowledgeHub"
        component={KnowledgeHub}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AgriCartScreen"
        component={AgriCartScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AgricultureNavigator"
        component={AgricultureNavigator}
        options={{
          headerShown: false,
        }}
      />

      {/* <Stack.Screen
        name="AgriPickupSlot"
        component={AgriPickupSlot}
        options={{
          headerShown: false,
        }}
      /> */}

      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccess}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="OrderFailure"
        component={OrderFailure}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="UploadPrescription"
        component={UploadPrescription}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PaymentPage"
        component={index}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BookingOrderList"
        component={BookingOrderList}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="NewChangePassword"
        component={NewChangePassword}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="EditUserProfile"
        component={EditUserProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StateSelection"
        component={StateSelectionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CasteSelection"
        component={CasteSelectionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DisabilityScreen"
        component={DisabilityScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="QualificationScreen"
        component={QualificationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="JobHome"
        component={JobHome}
        options={({ navigation }) => ({
          title: "Jobs",
          headerStyle: { backgroundColor: "#2372B5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.navigate("DashboardScreen")}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="JobSearchView"
        component={JobSearchView}
        options={({ navigation }) => ({
          title: "Search and View Jobs",
          headerStyle: { backgroundColor: "#2372B5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.navigate("JobHome")}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="JobDetails"
        component={JobDetails}
        options={({ navigation }) => ({
          title: "Job Details",
          headerStyle: { backgroundColor: "#2372B5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="JobProfile"
        component={JobProfile}
        options={({ navigation }) => ({
          title: "Profile",
          headerStyle: { backgroundColor: "#2372B5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      {/* TeleMedicines */}
      <Stack.Screen
        name="FindDoctors"
        component={FindDoctors}
        options={({ navigation }) => ({
          title: "Find Doctors",
          headerStyle: { backgroundColor: "#2372B5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(15),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.navigate("DashboardScreen")}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("MyAppointment")}
              style={{
                marginRight: s(7),
                paddingHorizontal: s(7),
                paddingVertical: vs(5),
                borderRadius: 3,
                backgroundColor: "#69b2f0",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: s(12),
                }}
              >
                My Appointments
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Doctors"
        component={Doctors}
        options={({ navigation }) => ({
          title: "Doctors",
          headerStyle: { backgroundColor: "#2372B5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="DoctorAppointment"
        component={DoctorAppointment}
        options={({ navigation }) => ({
          title: "Doctor Details",
          headerStyle: { backgroundColor: "#2372B5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="DoctorReview"
        component={DoctorReview}
        options={({ navigation }) => ({
          title: "Review Details",
          headerStyle: { backgroundColor: "#2372B5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="MyAppointment"
        component={MyAppointment}
        options={({ navigation }) => ({
          title: "My Appointment",
          headerStyle: { backgroundColor: "#2372B5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.navigate("FindDoctors")}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="MeetingWebView"
        component={MeetingWebView}
        options={({ navigation }) => ({
          title: "Online Meet",
          headerStyle: { backgroundColor: "#2372B5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.navigate("MyAppointment")}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="DoctorPaymentFailure"
        component={DoctorPaymentFailure}
        options={{
          headerShown: false,
        }}
      />

      {/* Drug Directory Home */}
      <Stack.Screen
        name="DrugDirectoryHome"
        component={DrugDirectoryHome}
        options={({ navigation }) => ({
          title: "Drug Discovery",
          headerStyle: { backgroundColor: "#2372B5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.navigate("DashboardScreen")}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="DrugDirectoryAtoZ"
        component={DrugDirectoryAtoZ}
        options={({ navigation }) => ({
          title: "Drug Directory",
          headerStyle: { backgroundColor: "#2372B5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.navigate("DrugDirectoryHome")}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="DrugCategory"
        component={DrugCategory}
        options={({ navigation }) => ({
          title: "Drug Directory",
          headerStyle: { backgroundColor: "#2372B5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.navigate("DrugDirectoryAtoZ")}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="DrugCategoryDetail"
        component={DrugCategoryDetail}
        options={({ navigation }) => ({
          title: "Drug Directory",
          headerStyle: { backgroundColor: "#2372B5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="DrugSearch"
        component={DrugSearch}
        options={({ navigation, route }) => ({
          title: "Drug Search",
          headerStyle: { backgroundColor: "#2372B5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.navigate(route.params.backClick)}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Drugs"
        component={Drugs}
        options={({ navigation, route }) => {
          const params = route?.params || {};
          return {
            title: "Drugs",
            headerStyle: { backgroundColor: "#2372B5" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontSize: s(16),
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ padding: vs(10) }}
                onPress={() =>
                  navigation.navigate(
                    params.backNavigation || "DefaultScreen",
                    {
                      searchQuery: params.searchQuery,
                      brand: params.brand,
                      showSearch: params.showSearch,
                      backClick: params.backClick,
                      isNumber: params.isNumber,
                    }
                  )
                }
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={s(24)}
                  color="white"
                  style={{
                    marginLeft: s(12),
                    marginRight: s(12),
                  }}
                />
              </TouchableOpacity>
            ),
          };
        }}
      />

      <Stack.Screen
        name="DrugByBrand"
        component={DrugByBrand}
        options={({ navigation }) => ({
          title: "Drug By Brand",
          headerStyle: { backgroundColor: "#2372B5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.navigate("DrugDirectoryAtoZ")}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />

      {/* Abha Screens */}

      <Stack.Screen
        name="Abha"
        component={Abha}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AbhaHome"
        component={AbhaHome}
        options={({ navigation }) => ({
          title: "ABHA",
          headerStyle: { backgroundColor: "#1C57A5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.navigate("DashboardScreen")}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(20),
                  marginRight: s(20),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CreateAbhaAadhar"
        component={CreateAbhaAadhar}
        options={({ navigation }) => ({
          title: "Creating My ABHA Address",
          headerStyle: { backgroundColor: "#1C57A5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.navigate("AbhaHome")}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="AbhaAadharOTP"
        component={AbhaAadharOTP}
        options={({ navigation }) => ({
          title: "Creating My ABHA Address",
          headerStyle: { backgroundColor: "#1C57A5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.navigate("CreateAbhaAadhar")}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CreateAbhaNumber"
        component={CreateAbhaNumber}
        options={({ navigation }) => ({
          title: "Creating new ABHA Address",
          headerStyle: { backgroundColor: "#1C57A5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.navigate("CreateAbhaAadhar")}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="AbhaNumberOTP"
        component={AbhaNumberOTP}
        options={({ navigation }) => ({
          title: "Creating new ABHA Address",
          headerStyle: { backgroundColor: "#1C57A5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.navigate("CreateAbhaNumber")}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="AbhaCard"
        component={AbhaCard}
        options={({ navigation }) => ({
          title: "ABHA Card",
          headerStyle: { backgroundColor: "#1C57A5" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: s(16),
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: vs(10) }}
              onPress={() => navigation.navigate("CreateAbhaNumber")}
            >
              <Ionicons
                name="chevron-back-outline"
                size={s(24)}
                color="white"
                style={{
                  marginLeft: s(12),
                  marginRight: s(12),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />

      {/* Agriculture Screens */}

      <Stack.Screen
        name="AgricultureScreen"
        component={AgricultureScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BookSoilTest"
        component={BookSoilScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="GenCartScreen"
        component={GenCartScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="GenericMedicines"
        component={GenericMedicines}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ChooseAddress"
        component={ChooseAddress}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddNewAddress"
        component={AddNewAddress}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PaymentDone"
        component={PaymentDone}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="GenericMedicineHome"
        component={GenericMedicineHome}
        options={{
          headerShown: false,
        }}
      />

     {/* Report screens */}
      <Stack.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ViewReportScreen"
        component={ViewReportScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ReportsHome"
        component={ReportsHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Medication"
        component={Medication}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VitalSigns"
        component={VitalSigns}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Allergies"
        component={Allergies}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LifeStyle"
        component={LifeStyle}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MedicalDocumentsUpload"
        component={MedicalDocumentsUpload}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TestReport"
        component={TestReport}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BiomedicalImplants"
        component={BiomedicalImplants}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Immunization"
        component={Immunization}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MedicationList"
        component={MedicationList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TestList"
        component={TestList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MediaViewer"
        component={MediaViewer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MedicineOrderHistory"
        component={MedicineOrderHistory}
        options={{
          headerShown: false,
        }}
      />

      {/* Temple Aarti Screens */}
      <Stack.Screen
        name="TempleAartiScreen"
        component={TempleAartiScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="LiveAartiScreen"
        component={LiveAartiScreen}
        options={{ title: "Live Aarti" }}
      />

      <Stack.Screen
        name="AartiDetail"
        component={AartiDetailScreen}
        options={{ title: "Aarti Details", headerShown: false }}
      />

      <Stack.Screen
        name="AgricultureHomeScreen"
        component={AgricultureNavigator}
        options={{
          headerShown: false,
        }}
      />

      {/* Gym Screens */}
      <Stack.Screen
        name="GymHome"
        component={GymHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AnalyzeFood"
        component={AnalyzeFoodScreen}
        options={{
          headerStyle: {
            backgroundColor: "#1C39BB",
          },
          headerTitleStyle: {
            // fontSize: s(16),
            color: "#fff",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="NutritionAdvice"
        component={NutritionAdviceScreen}
        options={{
          headerStyle: {
            backgroundColor: "#1C39BB",
          },
          headerTitleStyle: {
            // fontSize: s(16),
            color: "#fff",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="WorkoutPlan"
        component={WorkoutPlanScreen}
        options={{
          headerStyle: {
            backgroundColor: "#1C39BB",
          },
          headerTitleStyle: {
            // fontSize: s(16),
            color: "#fff",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="ExerciseDetails"
        component={ExerciseDetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: "#1C39BB",
          },
          headerTitleStyle: {
            // fontSize: s(16),
            color: "#fff",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="BrowseExercises"
        component={BrowseExercisesScreen}
        options={{
          headerStyle: {
            backgroundColor: "#1C39BB",
          },
          headerTitleStyle: {
            // fontSize: s(16),
            color: "#fff",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="WorkOutDetails"
        component={WorkoutDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: "#1C39BB",
          },
          headerTitleStyle: {
            // fontSize: s(16),
            color: "#fff",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      />

      {/* Mental Health Screens */}
      <>
        <Stack.Screen
          name="MentalHealth"
          component={MentalHealthHomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SelfAssessment"
          component={SelfAssessment}
          options={{
            title: "Self Assessment",
            headerStyle: {
              backgroundColor: "#1C39BB",
            },
            // headerTitleStyle: {
            //   color: '#fff',
            // },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="AssessmentRunner"
          component={AssessmentRunner}
          options={{
            headerShown: true,
            title: "Assessment",
            headerStyle: {
              backgroundColor: "#1C39BB",
            },
            headerTitleStyle: {
              color: "#fff",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="AssessmentResults"
          component={AssessmentResults}
          options={{
            headerShown: true,
            title: "Assessment Results",
            headerStyle: {
              backgroundColor: "#1C39BB",
            },
            headerTitleStyle: {
              color: "#fff",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="BookSpecialist"
          component={BookSpecialistScreen}
          options={{
            headerShown: true,
            title: "BookSpecialist",
            headerStyle: {
              backgroundColor: "#1C39BB",
            },
            headerTitleStyle: {
              color: "#fff",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="ActivityLog"
          component={ActivityLog}
          options={{
            title: "Activity Log",
            headerStyle: {
              backgroundColor: "#1C39BB",
            },
            headerTitleStyle: {
              color: "#fff",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />
      </>

      {/* Astrology Screens  */}

      <Stack.Screen
        name="AstrologyHome"
        component={AstrologyHome}
        options={{
          headerStyle: {
            backgroundColor: "#1C39BB",
          },
          headerTitleStyle: {
            // fontSize: s(16),
            color: "#fff",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      />

      <Stack.Screen
        name="ZodiacSign"
        component={ZodiacScreen}
        options={{
          headerStyle: {
            backgroundColor: "#1C39BB",
          },
          headerTitleStyle: {
            // fontSize: s(16),
            color: "#fff",
          },
          headerTitle: "Astrology",
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="DailyHoroscope"
        component={DailyHoroscopeScreen}
        options={{
          headerStyle: {
            backgroundColor: "#1C39BB",
          },
          headerTitleStyle: {
            // fontSize: s(16),
            color: "#fff",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      />
       <Stack.Screen
        name="Panchang"
        component={PanchangScreen}
        options={{
          headerStyle: {
            backgroundColor: "#1C39BB",
          },
          headerTitleStyle: {
            // fontSize: s(16),
            color: "#fff",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      />
       <Stack.Screen
        name="FutureAstrology"
        component={FutureHoroscopeScreen}
        options={{
          headerStyle: {
            backgroundColor: "#1C39BB",
          },
          headerTitleStyle: {
            // fontSize: s(16),
            color: "#fff",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          // headerShown: false,
        }}
      />


      {/* screens for common bottom navigator  */}
      <Stack.Screen
        name="Homescreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Setuchat"
        component={SetuChat}
        options={{ headerShown: false }}
      />

      {/* screens for Matrimony */}

      <Stack.Screen
        name="Register1"
        component={RegistrationStep1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register2"
        component={AboutYouScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register3"
        component={Step3Screen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="ProfileDetailScreen"
        component={ProfileDetailScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="ChatScreen"
        component={ChatsScreen}
        options={{ headerShown: false }}
      /> */}
     <Stack.Screen
        name="MatriBottomTab"
        component={MatriBottomTabs}
        options={{ headerShown: false }}
      />


        {/* SOS Screens */}
      <Stack.Screen
        name="SosHome"
        component={SosHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisteredContacts"
        component={RegisteredContacts}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SosPersonalInformation"
        component={SosPersonalInformation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Logs"
        component={Logs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SosSettings"
        component={SosSettings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SosPlan"
        component={SosPlan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SosAddContact"
        component={SosAddContact}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Matrujyoti"
        component={MatrujyotiNavigator}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
};
