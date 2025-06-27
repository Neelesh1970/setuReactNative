import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CartHeader from "../Cart/CartHeader";
import { ms } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hideLoader, showLoader } from "../../../../Utils/Loader";
import { AddtoCart, CartDetailsAPi } from "../../../../Utils/api/bookTest";
import { useDispatch } from "react-redux";
import { cartDetailsSuccess } from "../../../../features/booktest/booktestSlice";
import ToastService from "../../../../Utils/ToastService";
import { getItem } from "../../../../Utils/utils";
import Toast from 'react-native-simple-toast';
// import { useNavigation } from '@react-navigation/native';


export const CardItem = ({ navigation, categoriesData }) => {
  const { id = 0, name = 'N/A', price = 0, rate = {}, code = "", childs = [],groupName='' } = categoriesData || {};
  // const [isInCart, setIsInCart] = useState(false);
  const dispatch = useDispatch()

  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getItem('userID');
      if (id) {
        setUserID(id);
      }
    };
    fetchUserID();
  }, []);

  console.log('userID', userID)

  useEffect(() => {
    const checkCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cartItems');
        const cartItems = storedCart ? JSON.parse(storedCart) : [];
        const itemInCart = cartItems.includes(code);
        setIsInCart(itemInCart);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    // checkCart();
  }, [code]);


  const handleCart = async () => {
    if (userID && userID != null) {
      await AddtoCartAPI();
      navigation.navigate("CartScreen");
    }




    // try {
    //   const storedCart = await AsyncStorage.getItem('cartItems');
    //   const cartItems = storedCart ? JSON.parse(storedCart) : [];
    //   if (!cartItems.includes(code)) {
    //     const updatedCart = [...cartItems, code];
    //     await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCart));
    //     setIsInCart(true);
    //     console.log('Cart updated with code:', updatedCart);
    //     AddtoCartAPI()
    //   }
    // } catch (error) {
    //   console.error('Error updating cart:', error);
    // }
  };


  const AddtoCartAPI = async () => {
    // showLoader();
    const data = {
      "productCode": code,
      "quantity": 1,
      'user_id': userID
    }

    try {
      console.log('AddtoCartAPI data input:', data);
      const response = await AddtoCart(data);
      console.log('AddtoCartAPI Response:', response);

      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        // dispatch(categoriesInfoSuccess({ data: response.data.data }));
        ToastService.showSuccess('Success!', response.data.message ?? "Added to the Cart!")
        await CartDetails();
        return true;
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from AddtoCartAPI call:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        ToastService.showError('Error!', error.response.data.message || "Something Went Wrong")
      } else {
        ToastService.showError('Error!', error.response.data.message || "An error occurred. Please try again later.")
      }
    } finally {
      // hideLoader();
    }
  }

  const CartDetails = async () => {
    // showLoader();
    const data = {
      // "productType": "profile",
      // "category": category?.name
      'user_id': userID
    }
    try {
      console.log('CartDetails data input:', data);
      const response = await CartDetailsAPi(data);
      console.log('CartDetails Response:', response);

      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        dispatch(cartDetailsSuccess({ data: response.data.data }));
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from CartDetails call:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        ToastService.showError('Error!', error.response.data.message)
      } else {
        ToastService.showError('Error!', "An error occurred. Please try again later.")
      }
    } finally {
      // hideLoader();
    }
  }

  return (
    <View>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{groupName} </Text>
          <TouchableOpacity onPress={() => navigation.navigate("fullbodyinfo", { code: code, name: name ,rate:rate?.b2C})}>
          <FontAwesome name="chevron-circle-right" size={25} color="#134cf9" />
          </TouchableOpacity>
        </View>
        {
          Array.isArray(childs) && childs.length > 0 && (
            <View style={styles.testList}>
              {childs.map((item, index) => {
                const remainingtest = childs?.length > 2 ? childs?.length - 2 : 0
                if (index < 2) {
                  return (
                    <Text key={index} style={styles.testItem}>
                      <Text style={styles.linkText}>
                        {item?.name
                          ? item.name
                            .split(" ")
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                            .join(" ") 
                          : ''}
                      </Text>
                      {remainingtest > 0 && index == 1 && <Text style={styles.moreTests}> +{remainingtest} Tests</Text>}
                    </Text>
                  );
                }
                return null;
              })}
            </View>
          )
        }




        {/* <View style={styles.testList}>
          <Text style={styles.testItem}>
            <Text style={styles.linkText}>-Basophils</Text> - Absolute Count,
            Eosinophils - Absolute Count,
          </Text>
          <Text style={styles.testItem}>
            <Text style={styles.linkText}>Lymphocytes</Text> - Absolute Count,
            Monocytes - Absolute Count...
            <Text style={styles.moreTests}> +107 Tests</Text>
          </Text>
        </View> */}
        <View style={styles.cardFooter}>
          <Text style={styles.price}> ₹{rate?.b2C}</Text>
          {/* ₹1799 */}
          <TouchableOpacity style={styles.cartButton} onPress={handleCart}>
            {/* {isInCart ? (
              <Text style={styles.cartButtonText}>Added to cart</Text>
            ) : (
              <Text style={styles.cartButtonText}>Add to cart</Text>
            )} */}
            <Text style={styles.cartButtonText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: ms(10),
    padding: ms(10),
    margin: ms(10),
    borderWidth: 1,
    borderColor: "#B5B5B5",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: ms(10),
    padding: ms(4),
  },
  cardTitle: {
    fontSize: ms(16),
    width: ms(290),
    fontWeight: "bold",
    color: "#140B41",
    fontFamily: 'Roboto'
  },

  HeadTitle: {
    paddingVertical: ms(10),
    paddingLeft: ms(14),
    fontSize: ms(17),
    fontWeight: "bold",
    color: "#140B41",
  },
  testList: {
    marginBottom: 15,
    borderTopWidth: 1.4,
    borderColor: "#ddd",
    paddingTop: 10,
  },
  testItem: {
    fontSize: 14,
    color: "#3E4F5F",
    marginBottom: 3,
  },
  linkText: {

    // color: "#0A3D91",
    textDecorationLine: "underline",
  },
  moreTests: {
    color: "#2373B0",
    fontWeight: "bold",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1.4,
    borderColor: "#ddd",
    paddingTop: 6,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#140B41",
  },
  cartButton: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: "#140B41",
    borderRadius: 5,
    paddingVertical: 5,
  },
  cartButtonText: {
    color: "#1C57A5",
    fontSize: 14,
    fontWeight: "bold",
  },
});
