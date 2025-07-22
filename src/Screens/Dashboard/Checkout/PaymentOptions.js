import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

const PaymentOptions = ({handlepaymentType = () => {}}) => {
  const [selectedOption, setSelectedOption] = useState("razorpay");

  useEffect(() => {
    handlepaymentType(selectedOption)
  },[selectedOption])

  return (
    <View style={styles.container}>
      {/* Razor Pay */}
      <TouchableOpacity style={styles.section} onPress={() => setSelectedOption("razorpay")}>
        <View style={styles.flexrow}>
          <Image source={require("../../../assets/images/razor_pay_icon.png")} style={styles.icon} />
          <Text style={styles.billItem}>UPI / Credit Card / Debit Card</Text>
        </View>
        <RadioButton
          value="razorpay"
          status={selectedOption === "razorpay" ? "checked" : "unchecked"}
          onPress={() => setSelectedOption("razorpay")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  flexrow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Allows elements to take proper space
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  icon: {
    height: 28,
    width: 28,
    resizeMode: 'contain',
  },
  billItem: {
    marginHorizontal: 12,
    flexShrink: 1, // Prevents text from being cut off
    fontSize: 14,
  },
});

export default PaymentOptions;














// import React from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import { RadioButton } from 'react-native-paper';

// const PaymentOptions = () => {
//   return (
//     <View style={styles.container}>

//       <View style={styles.section}>
//         <View style={styles.flexrow}> 
//           <Image source={require("../../../assets/images/phonepay.png")} style={styles.icon}/>
//           <Text style={styles.billItem}>UPI/Credit Card/Debit Card</Text>
//         </View>
//         <RadioButton style={styles.radio}></RadioButton>
//       </View>

//       <View style={styles.section}>
//       <View style={styles.flexrow}> 
//         <Image source={require("../../../assets/images/goolepay.png")} style={styles.icon} />
//         <Text style={styles.billItem}>UPI/Credit Card/Debit Card</Text>
//         </View>
//         <RadioButton style={styles.radio}></RadioButton>
//       </View>

//       <View style={styles.section}>
//       <View style={styles.flexrow}> 
//         <Image source={require("../../../assets/images/paytm.png")} style={styles.icon} />
//         <Text style={styles.billItem}>paytm Netbanking/Paytm Wallet/Postpaid</Text>
//         </View>
//         <RadioButton style={styles.radio}></RadioButton>
//       </View>

//       <View style={styles.section}>
//       <View style={styles.flexrow}> 
//         <Image source={require("../../../assets/images/doctor_group.png")} style={styles.icon} />
//         <Text style={styles.billItem}>Cash/Card on Sample Collection</Text>
//         </View>
//         <RadioButton style={styles.radio}></RadioButton>
//       </View>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   flexrow: {
//     fontSize: 16,
//     marginBottom: 8,
//     flexDirection:'row',
//     alignItems:'center'
//   },
//   title: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   section: {
//     marginBottom: 6,
//     flexDirection: "row",
//     justifyContent:'space-between'
//   }, 
//   icon: {
//     height: 24,
//     width: 24,
//   },
//   billItem: {
//     marginHorizontal: 12,
//     width:'70%',
//     flexShrink: 1
//   }, 
//   radio: {
//     alignItems: 'center',
//   }
// });

// export default PaymentOptions;
