import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import CartHeader from '../Cart/CartHeader'
import styles from './styles'
import Button from '../../../Components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoader, showLoader } from '../../../Utils/Loader'
import { AddtoCart, CartDetailsAPi, categoriesInfoApi } from '../../../Utils/api/bookTest'
import { categoriesInfoSuccess } from '../../../features/booktest/booktestSlice'
import { getItem } from '../../../Utils/utils'
import { AgriAddToCart, CartDetailsApi, fertilizerCategoryList, fertilizerListing, fertilizerListingDetails } from '../../../Utils/api/Agriculture'
import { cartDetailsSuccess, categoriesSuccess } from '../../../features/agriculture/agricultureSlice'
import ToastService from '../../../Utils/ToastService'

export default function Categories({ navigation, route }) {
  const categoryid = route.params?.category;
  const Test = route.params?.Test ?? false;
  const categoriesInfoData = useSelector((state) => state.bookTest.categoriesInfoData);
  const dispatch = useDispatch()

  
  console.log('categoryid', categoryid);
  console.log('Test', Test);
  console.log('categoriesInfoData', categoriesInfoData);

  



  const fertilizerListingDetailsAPi = async () => {
    showLoader();
    const data = {
      "category_id": categoryid
    }
    try {
      const response = await fertilizerListingDetails(data);
      console.log('fertilizerListingDetailsAPi Response:', response);
      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        dispatch(categoriesInfoSuccess({ data: response.data }));
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from fertilizerListingDetailsAPi call:', error.response ? error.response.data : error.response.data.message);
      if (error.response && error.response.data && error.response.data.message) {
        ToastService.showError('Error!', error.response.data.message)
      } else {
        ToastService.showError('Error!', "An error occurred. Please try again later.")
      }
    } finally {
      hideLoader();
    }
  }


  const fertilizerCategoryListAPi = async () => {
    showLoader();
    try {
      const response = await fertilizerCategoryList();
      console.log('fertilizerCategoryListAPi Response:', response);
      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        dispatch(categoriesInfoSuccess({ data: response.data.data }));
      } else {
        ToastService.showError('Error!', response.data.message || "Something Went Wrong")
      }
    } catch (error) {
      console.log('Error from fertilizerCategoryListAPi call:', error.response ? error.response.data : error.response.data.message);
      if (error.response && error.response.data && error.response.data.message) {
        ToastService.showError('Error!', error.response.data.message)
      } else {
        ToastService.showError('Error!', "An error occurred. Please try again later.")
      }
    } finally {
      hideLoader();
    }
  }

  useEffect(() => {
    console.log("categoryid:", categoryid, "Test:", Test); 
    if (categoryid && !Test) {
      fertilizerListingDetailsAPi();
    }
    
    if (Test === true) {
      console.log("Calling fertilizerCategoryListAPi because Test is true"); 
      fertilizerCategoryListAPi();
    }
  }, [userID, Test, categoryid]);
  


  const CategoriesData = [
    {
      id: 1,
      name: 'DAP 18-46-0',
      description: " IFFCO'S DAP (Diammonium phosphate) is a concentrated phosphate-based fertilizer. Phosphorus is an essential nutrient along with Nitrogen and plays a vital role in the...",
      currentPrice: '₹4000',
      originalPrice: '₹4500',
    },
    {
      id: 2,
      name: 'DAP 18-46-0',
      description: " IFFCO'S DAP (Diammonium phosphate) is a concentrated phosphate-based fertilizer. Phosphorus is an essential nutrient along with Nitrogen and plays a vital role in the...",
      currentPrice: '₹4000',
      originalPrice: '₹4500',
    },
    {
      id: 3,
      name: 'DAP 18-46-0',
      description: " IFFCO'S DAP (Diammonium phosphate) is a concentrated phosphate-based fertilizer. Phosphorus is an essential nutrient along with Nitrogen and plays a vital role in the...",
      currentPrice: '₹4000',
      originalPrice: '₹4500',
    },
    {
      id: 4,
      name: 'DAP 18-46-0',
      description: " IFFCO'S DAP (Diammonium phosphate) is a concentrated phosphate-based fertilizer. Phosphorus is an essential nutrient along with Nitrogen and plays a vital role in the...",
      currentPrice: '₹4000',
      originalPrice: '₹4500',
    },
  ]

 


  const categoriesData = [
    { id: 1, name: "FREEDOM HEALTHY PACKAGE 2021", price: 1200 },
    { id: 2, name: "FREEDOM HEALTHY PACKAGE 2022", price: 1500 },
    { id: 3, name: "FREEDOM HEALTHY PACKAGE 2023", price: 1700 },
    { id: 4, name: "FREEDOM HEALTHY PACKAGE 2024", price: 2000 },
  ];

  // const CategoriesInfo = useMemo(() => {
  //   return categoriesInfoData && categoriesInfoData?.length > 0
  //     ? categoriesInfoData
  //     : []
  // }, [categoriesInfoData]);

  // const DeaseaseGroup = useMemo(() => {
  //   return categoriesInfoData && categoriesInfoData?.length > 0
  //     ? `${categoriesInfoData?.[0]?.diseaseGroup}`
  //     : 'N/A'
  // }, [categoriesInfoData]);

  console.log("CategoriesInfo", categoriesInfoData)


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


  const handleCart = async (id) => {
    if (userID && userID != null) {
      AddtoCartAPI(id)
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


  const AddtoCartAPI = async (id) => {
    // showLoader()
    const data = {
      "user_id": userID,
      "fertiliser_id": id,
      "quantity": 1
    }
    try {
      console.log('AddtoCartAPI data input:', data);
      const response = await AgriAddToCart(data);
      console.log('AddtoCartAPI Response:', response);

      if (response && (response.status === 200 || response.status === 201) && !response?.data?.hasError) {
        // dispatch(categoriesInfoSuccess({ data: response.data.data }));
        ToastService.showSuccess('Success!', response.data.message ?? "Added to the Cart!")
        CartDetails()
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
      const response = await CartDetailsApi(data);
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
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <CartHeader name="Categories" showCart={true} />

      <View style={styles.container}>
        <Text style={styles.title}>Primary Nutrients</Text>
        <Text style={styles.detailsdescription}>
          A plant requires around 17 nutrients which are essential for plant growth and development.
          These nutrients have been classified into Basic, Primary, Secondary, and Micronutrients.
          The nutrients which control vital plant processes are known as Primary nutrients.
          Plants require a large quantity of these nutrients for growth and proper functioning.
          Usually, they obtain these nutrients either from soil or air through various biological
          processes which are insufficient for their proper growth. These nutrients are therefore
          supplemented in crops using chemical Fertilizers.
        </Text>
      </View>

      <View style={styles.horizontalLine}></View>

      {
        categoriesInfoData?.map((category, index) => (
          <>
            <View key={category.id} style={styles.container}>
              <TouchableOpacity
                style={styles.productRow}
                onPress={() => navigation.navigate("ProductDetails", { product: category })}
              >
                <Image
                  source={require("../../../assets/images/product_image.png")}
                  style={styles.productImage}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productTitle}>{category?.product_name}</Text>
                  <Text style={styles.productDescription}>
                    {category?.description}
                    <Text style={styles.moreInfo}> Know More</Text>
                  </Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.currentPrice}>₹{category?.mrp_inclusive_gst}</Text>
                  </View>
                </View>
              </TouchableOpacity>



              <Button
                onPress={() => handleCart(category?.id)}
                title="Add To Cart"
                backgroundColor='#1C57A5'
                buttonStyle={{
                  width: '100%',
                  borderRadius: 8,
                  marginTop: 20,
                  marginBottom: 5,
                  alignSelf: 'center',
                }}
                textColor='#fff'
              />
            </View>
            <View style={styles.horizontalLine}></View>
          </>
        ))
      }


    </ScrollView>
  )
}