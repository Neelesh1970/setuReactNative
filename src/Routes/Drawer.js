

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigation } from './Stack';
import CustomSidebar from './CustomSidebar';


const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomSidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerStyle: {
          width: '65%',
        },
      }}
    >
      <Drawer.Screen name="MainStack" component={StackNavigation} />
    </Drawer.Navigator>
  );
};




// import * as React from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {CustomDrawerContent, Header} from '../Components';
// import {StackNavigation} from './Stack';
// import {View} from 'react-native';
// import StatusBar from '../Components/StatusBar';

// const Drawer = createDrawerNavigator();

// export const DrawerNavigator = () => {
//   return (
//     <View style={{flex: 1}}>
//       <StatusBar />
//       <Drawer.Navigator
//         initialRouteName="splash"
//         drawerContent={props => <CustomDrawerContent {...props} />}
//         screenOptions={{
//           header: props => <Header {...props} />,
//         }}>
//         <Drawer.Screen
//           name="splash"
//           options={{
//             headerShown: false,
//           }}
//           component={StackNavigation}
//         />
//       </Drawer.Navigator>
//     </View>
//   );
// };


// import * as React from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {CustomDrawerContent, Header} from '../Components';
// import {StackNavigation} from './Stack';
// import {View} from 'react-native';
// import StatusBar from '../Components/StatusBar';
// import LogoutScreen from '../Components/Drawer/LogoutScreen';
// import LoginScreen from '../Screens/Authentication/Login';

// const Drawer = createDrawerNavigator();

// export const DrawerNavigator = () => {
//   return (
//     <View style={{flex: 1}}>
//       {/* <StatusBar /> */}
//       <Drawer.Navigator
//         initialRouteName="Home"
//         drawerContent={props => <CustomDrawerContent {...props} />}
//         screenOptions={{
//           header: props => 
//           // <Header {...props} /> 
//           {}
//           ,
//         }}>
//         {/* <Drawer.Screen
//           name="splash"
//           options={{
//             headerShown: false,
//           }}
//           component={StackNavigation}
//         /> */}
//         <Drawer.Screen
//           name="Home"
//           component={StackNavigation} 
//           options={{ headerShown: false }}
//         />
//         <Drawer.Screen
//           name="Logout"
//           component={LogoutScreen} 
//           options={{
//             title: 'Logout',
//           }}
//         />
//       </Drawer.Navigator>
//     </View>
//   );
// };


