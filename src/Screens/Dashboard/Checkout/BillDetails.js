import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const BillDetails = ({ data, hardCopyChecked, dietConsultChecked, hardcopyAmount }) => {
  const activeModule = useSelector((state) => state.auth.activeModule);


  return (

    <>
      {
        activeModule === 'booktest' ?
          <View style={styles.container}>
            <View style={styles.section}>
              <Text style={styles.billItem}>Order amount</Text>
              <Text style={styles.amount}>₹{data?.orderAmount}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.billItem}>Diet consultation</Text>
              <Text style={styles.amount}>₹ {dietConsultChecked ? data?.dietConsultation : 0}</Text>
            </View>

            <View style={styles.section}>
              <Text style={[styles.billItem, styles.billItemUnderline]}>Consumables and transportation fee</Text>

              <Text style={styles.amount}>
                ₹{(Number(data?.consumableFee) || 0) + (Number(data?.transferableFee) || 0)}
              </Text>

            </View>

            <View style={styles.section}>
              <Text style={styles.billItem}>Sub-total</Text>
              <Text style={styles.amount}>₹{data?.subtotal}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.billItem}>Total discount</Text>
              <Text style={styles.amount}>₹{data?.totalDiscount ?? 0}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.billItem}>Balance amount to be paid</Text>
              <Text style={styles.amount}>
                ₹ {Number(data?.balanceAmount || 0) +
                  (dietConsultChecked ? Number(data?.dietConsultation || 0) : 0) +
                  (hardCopyChecked ? (hardcopyAmount || 0) : 0)}
              </Text>
            </View>
            {/* <View style={styles.container2}>
        <Text style={styles.text}>Yay! You Saved ₹300 on this booking!</Text>
      </View> */}
          </View>
          :
          <View style={styles.container}>
            <View style={styles.section}>
              <Text style={styles.billItem}>Order amount</Text>
              <Text style={styles.amount}>₹{data?.orderAmount}</Text>
            </View>

            {/* <View style={styles.section}>
              <Text style={styles.billItem}>Diet Consultation</Text>
              <Text style={styles.amount}>₹{data?.dietConsultation}</Text>
            </View> */}

            <View style={styles.section}>
              {/* <Text style={[styles.billItem, styles.billItemUnderline]}>Consumables and transportation fee</Text> */}

              {/* <Text style={styles.amount}>₹{data?.consumableFee} + ₹{data?.transferableFee}</Text> */}
            </View>

            <View style={styles.section}>
              <Text style={styles.billItem}>Sub-total</Text>
              <Text style={styles.amount}>₹{data?.orderAmount}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.billItem}>Total discount</Text>
              <Text style={styles.amount}>-₹{data?.totalDiscount ?? 0}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.billItem}>Balance amount to be paid</Text>
              <Text style={styles.amount}>₹{data?.orderAmount}</Text>
            </View>
            {/* <View style={styles.container2}>
        <Text style={styles.text}>Yay! You Saved ₹300 on this booking!</Text>
      </View> */}
          </View>
      }
    </>

  );
};

const styles = StyleSheet.create({
  container2: {
    width: '100%',
    height: 22.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEFEE4',
    marginTop: 20,
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 19,
    color: '#28B754',
  },
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4E4E4'
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  billItem: {
    fontSize: 16,
    color: '#000',
    marginBottom: 6,
    width: '70%',
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 6,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 6,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  // billItemUnderline: {
  //   textDecorationLine: "underline",
  //   fontWeight: "bold",
  //   color: "#000000",
  // },
});

export default BillDetails;
