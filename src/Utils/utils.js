import { Icons } from "../assets/icons/Icons";

import { Dimensions } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.log('Error saving token:', error);
  }
};

export const storeRefreshToken = async (token) => {
  try {
    await AsyncStorage.setItem('refreshToken', token);
  } catch (error) {
    console.log('Error saving token:', error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      return token;
    }
  } catch (error) {
    console.log('Error fetching token:', error);
  }
};

export const getrefreshToken = async () => {
  try {
    const refreshtoken = await AsyncStorage.getItem('refreshToken');
    if (refreshtoken !== null) {
      return refreshtoken;
    }
  } catch (error) {
    console.log('Error fetching token:', error);
  }
};





export const storeItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Error saving token:', error);
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log('Error fetching value:', error);
  }
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,}$/;
  return re.test(password);
};

export const validatePhoneNumber = (phoneNumber) => {
  if (phoneNumber.length === 10) {
    return true;
  } else {
    return false;
  }
};
export const validateTextField = (text) => {
  if (text) {
    if (text.length > 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const validateAadharNo = (phoneNumber) => {
  if (phoneNumber.length === 12) {
    return true;
  } else {
    return false;
  }
};

export const validateAabhaNo = (aabhaNumber) => {
  if (aabhaNumber.length === 14) {
    return true;
  } else {
    return false;
  }
};

export const validateYear = (year) => {
  if (year.length === 4) {
    return true;
  } else {
    return false;
  }
};

export const validateOTP = (phoneNumber) => {
  if (phoneNumber.length === 4) {
    return true;
  } else {
    return false;
  }
};

export const validateZipCode = (zipCode) => {
  if (zipCode.length === 6) {
    return true;
  } else {
    return false;
  }
};

export const validateOTP_Length = (OTP, length) => {
  if (OTP.length == length) {
    return true;
  } else {
    return false;
  }
};

export const areAllValuesTrue = (values) => {
  return values.length == 0;
};
export const medicalCategory = [
  {
    image: Icons.m_category_image_1,
    desc: "Cardiac",
  },
  {
    image: Icons.m_category_image_2,
    desc: "Pain Management",
  },
  {
    image: Icons.m_category_image_3,
    desc: "Antibiotics",
  },
  {
    image: Icons.m_category_image_4,
    desc: "Osteoarthritis",
  },
  {
    image: Icons.m_category_image_5,
    desc: "Hypertension",
  },
  {
    image: Icons.m_category_image_6,
    desc: "High Cholesterol",
  },
  {
    image: Icons.m_category_image_1,
    desc: "Cardiac",
  },
  {
    image: Icons.m_category_image_2,
    desc: "Pain Management",
  },
  {
    image: Icons.m_category_image_3,
    desc: "Antibiotics",
  },
  {
    image: Icons.m_category_image_2,
    desc: "Pain Management",
  },
  {
    image: Icons.m_category_image_3,
    desc: "Antibiotics",
  },
  {
    image: Icons.m_category_image_4,
    desc: "Osteoarthritis",
  },
];
export const productData = [
  {
    image:
      "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    name: "Liv.52 Syrup",
    qty: "200 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image:
      "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
    name: "Immune Vitality",
    qty: "200 ml",
    price: "₹ 250",
    discount_price: "₹ 220",
  },
  {
    image:
      "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
    name: "Antibiotics",
    qty: "350 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image:
      "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    name: "Osteoarthritis",
    qty: "200 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image:
      "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
    name: "Hypertension",
    qty: "200 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image:
      "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
    name: "High Cholesterol",
    qty: "200 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
];
export const productMonsoon = [
  {
    image:
      "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    name: "Cold & Cough",
    qty: "200 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image:
      "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
    name: "Skin Infection",
    qty: "200 ml",
    price: "₹ 250",
    discount_price: "₹ 220",
  },
  {
    image:
      "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
    name: "Thermometers",
    qty: "350 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image:
      "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    name: "Vaporizers & Nebulizers",
    qty: "200 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image:
      "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    name: "Cold & Cough",
    qty: "200 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image:
      "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
    name: "Thermometers",
    qty: "350 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
];
export const productPersonal = [
  {
    image:
      "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    name: "Hair care",
    qty: "200 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image:
      "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
    name: "Men grooming",
    qty: "200 ml",
    price: "₹ 250",
    discount_price: "₹ 220",
  },
  {
    image:
      "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
    name: "Body care",
    qty: "350 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image:
      "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    name: "Oral care",
    qty: "200 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image:
      "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    name: "Hair care",
    qty: "200 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image:
      "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
    name: "Men grooming",
    qty: "200 ml",
    price: "₹ 250",
    discount_price: "₹ 220",
  },
  {
    image:
      "https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80",
    name: "Body care",
    qty: "350 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image:
      "https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    name: "Oral care",
    qty: "200 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
];
export const productStomach = [
  {
    image: Icons.s_image_1,
    name: "Constipation",
    qty: "200 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image: Icons.s_image_2,
    name: "Bloating",
    qty: "200 ml",
    price: "₹ 250",
    discount_price: "₹ 220",
  },
  {
    image: Icons.s_image_3,
    name: "Pre-Probiotic",
    qty: "350 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image: Icons.s_image_4,
    name: "Acidity",
    qty: "200 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image: Icons.s_image_1,
    name: "Constipation",
    qty: "200 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image: Icons.s_image_2,
    name: "Bloating",
    qty: "200 ml",
    price: "₹ 250",
    discount_price: "₹ 220",
  },
  {
    image: Icons.s_image_3,
    name: "Pre-Probiotic",
    qty: "350 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
  {
    image: Icons.s_image_4,
    name: "Acidity",
    qty: "200 ml",
    price: "₹ 220",
    discount_price: "₹ 200",
  },
];

export const menuitems = [
  {
    name: "personal",
    icon: "",
    index: 0,
    comp: "",
    isHeader: true,
    onPressNavigate: "",
  },
  {
    name: "my_roles",
    icon: Icons.my_roles,
    index: 1,
    comp: "",
    isHeader: false,
    subMenu: [
      {
        name: "Doctor",
        onPressNavigate: "DocRegistration",
      },
      { name: "Asha Worker", onPressNavigate: "" },
      { name: "Lab technician", onPressNavigate: "" },
      { name: "Vendor", onPressNavigate: "VendorRegistration" },
    ],
  },
  {
    name: "my_transactions",
    icon: Icons.my_transactions,
    index: 2,
    comp: "",
    isHeader: false,
    onPressNavigate: "",
  },
  {
    name: "my_claims",
    icon: Icons.my_claims,
    index: 3,
    comp: "",
    isHeader: false,
    onPressNavigate: "",
  },
  {
    name: "my_health_plans",
    icon: Icons.my_health_plans,
    index: 4,
    comp: "",
    isHeader: false,
    onPressNavigate: "MyPlans",
  },
  {
    name: "my_doctors",
    icon: Icons.my_doctors,
    index: 5,
    comp: "",
    isHeader: false,
    onPressNavigate: "",
  },
  {
    name: "my_health",
    icon: Icons.my_health,
    index: 6,
    comp: "",
    isHeader: false,
    onPressNavigate: "",
  },
  {
    name: "setu_pay",
    icon: Icons.setu_pay,
    index: 7,
    comp: "",
    isHeader: false,
    onPressNavigate: "",
  },
  {
    name: "medicards",
    icon: Icons.medicards,
    index: 8,
    comp: "",
    isHeader: false,
    onPressNavigate: "",
  },
  {
    name: "business",
    icon: "",
    index: 9,
    comp: "",
    isHeader: true,
    onPressNavigate: "",
  },
  {
    name: "for_doctors",
    icon: Icons.for_doctor,
    index: 10,
    comp: "",
    isHeader: false,
    onPressNavigate: "",
  },
  {
    name: "corporate_benefits",
    icon: Icons.corporate_benefits,
    index: 11,
    comp: "",
    isHeader: false,
    onPressNavigate: "",
  },
  {
    name: "account",
    icon: "",
    index: 12,
    comp: "",
    isHeader: true,
    onPressNavigate: "",
  },
  {
    name: "language",
    icon: Icons.language,
    index: 13,
    comp: "",
    isHeader: false,
    onPressNavigate: "",
  },

  {
    name: "about_us",
    icon: Icons.about_us,
    index: 14,
    comp: "",
    isHeader: false,
    onPressNavigate: "",
  },
  {
    name: "rate_the_app",
    icon: Icons.rate_app,
    index: 15,
    comp: "",
    isHeader: false,
    onPressNavigate: "",
  },
  {
    name: "share_earn_coins",
    icon: Icons.share_earn,
    index: 16,
    comp: "",
    isHeader: false,
    onPressNavigate: "",
  },
  {
    name: "help_support",
    icon: Icons.help_support,
    index: 17,
    comp: "",
    isHeader: false,
    onPressNavigate: "",
  },
  {
    name: "logout",
    icon: Icons.logout,
    index: 18,
    comp: "",
    isHeader: false,
    onPressNavigate: "",
  },
];

export const screenWidth = Dimensions.get("window").width;

export const screenHeight = Dimensions.get("window").height;

export const billSummary = JSON.stringify([
  {
    name: "Item total (MRP)",
    value: "₹117.13",
    name_color: "#969696",
    value_color: "#666666",
    is_strikeout: false,
    strikeout_value: "-₹99",
    is_separator: false,
    is_bold: false,
  },
  {
    name: "Green packaging charge",
    value: "₹4",
    name_color: "#969696",
    value_color: "#666666",
    is_strikeout: false,
    strikeout_value: "-₹99",
    is_separator: false,
    is_bold: false,
  },
  {
    name: "Total discount",
    value: "-₹14.13",
    name_color: "#277B00",
    value_color: "#277B00",
    is_strikeout: false,
    strikeout_value: "-₹99",
    is_separator: false,
    is_bold: false,
  },
  {
    name: "Estimated shipping fee Want free shipping?",
    value: "₹85",
    name_color: "#969696",
    value_color: "#666666",
    is_strikeout: true,
    strikeout_value: "-₹99",
    is_separator: false,
    is_bold: false,
  },
  {
    name: "Estimated shipping fee Want free shipping?",
    value: "₹117.13",
    name_color: "#969696",
    value_color: "#666666",
    is_strikeout: false,
    strikeout_value: "-₹99",
    is_separator: true,
    is_bold: false,
  },
  {
    name: "To be paid",
    value: "₹192",
    name_color: "#000000",
    value_color: "#000000",
    is_strikeout: false,
    strikeout_value: "",
    is_separator: false,
    is_bold: true,
  },
]);
