import axios from "axios";
import { API_URL_BOOKTEST, API_URL_AUTH } from '@env';
import { getToken, getrefreshToken, storeRefreshToken, storeToken } from "../utils";

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh_token = await getrefreshToken();
      try {
        const { data } = await axios.post(
          `${API_URL_AUTH}/auth/refreshToken`,
          { refreshToken: refresh_token }
        );
        console.log('booktest data token :', data);
        const newAccessToken = data?.token;
        const newRefreshToken = data?.refreshToken;
        await storeToken(newAccessToken);
        await storeRefreshToken(newRefreshToken);
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token failed", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


const categoriesApi = async (data) => {
  try {
    console.log('categoriesApi url :', `${API_URL_BOOKTEST}/categories`);
    console.log('categoriesApi input :', data);
    const response = await axiosInstance.post(`${API_URL_BOOKTEST}/categories`, data);
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/categories`);
    console.log('categories error', error);
    throw error;
  }
}

const callGenderCategoryApi = async (data) => {
  try {
    const response = await axiosInstance.get(`${API_URL_BOOKTEST}/getGenderListing`, data);
    console.log('url :', `${API_URL_BOOKTEST}/getGenderListing`);
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/getGenderListing`);
    console.log('getGenderListing error', error);
    throw error;
  }
}

const categoriesInfoApi = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_BOOKTEST}/products`, JSON.stringify(data));
    console.log('url :', `${API_URL_BOOKTEST}/products`);
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/categories`);
    console.log('categories error', error);
    throw error;
  }
}

const callGendercategoriesInfoApi = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_BOOKTEST}/genderBasedDetails`, JSON.stringify(data));
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/genderBasedDetails`);
    console.log('genderBasedDetails error', error);
    throw error;
  }
}


const AvailableTimeSlot = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_BOOKTEST}/appointment-slots`, JSON.stringify(data));
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/categories`);

    console.log('categories error', error);
    throw error;
  }
}

const AddtoCart = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_BOOKTEST}/cart/add`, data);
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/categories`);

    console.log('categories error', error);
    throw error;
  }
}

const CartDetailsAPi = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_BOOKTEST}/cart/details`, JSON.stringify(data));
    console.log('url :', `${API_URL_BOOKTEST}/cart/details`);

    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/cart/details`);

    console.log('categories error', error);
    throw error;
  }
}

const RemoveFromCart = async (data) => {
  try {
    const response = await axiosInstance.delete(`${API_URL_BOOKTEST}/cart/remove`, {
      data: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/cart/remove`);
    console.log('data :', data);
    console.log('categories error', error);
    throw error;
  }
};


const Addaddress = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_BOOKTEST}/addAddress`, JSON.stringify(data));
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/addAddress`);
    console.log('data :', data);
    console.log('Addaddress error', error);
    throw error;
  }
};

const SlotDetails = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_BOOKTEST}/slotdetails`, JSON.stringify(data));
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/slotdetails`);
    console.log('data :', data);
    console.log('slotdetails error', error);
    throw error;
  }
};


const FetchAddressList = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_BOOKTEST}/listAddresses`, JSON.stringify(data));
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/listAddresses`);
    console.log('data :', data);
    console.log('slotdetails error', error);
    throw error;
  }
};

const updateDefaultAddress = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_BOOKTEST}/updateAddress`, JSON.stringify(data));
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/updateAddress`);
    console.log('data :', data);
    console.log('slotdetails error', error);
    throw error;
  }
};



const RemoveAddressApi = async (data) => {
  try {
    const response = await axiosInstance.delete(`${API_URL_BOOKTEST}/deleteAddress`, {
      data: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/deleteAddress`);
    console.log('data :', data);
    console.log('categories error', error);
    throw error;
  }
};


const updateAddressApi = async (data) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL_BOOKTEST}/editAddress`,
      JSON.stringify(data)
    );
    return response;
  } catch (error) {
    console.log('updateAddressApi url :', `${API_URL_BOOKTEST}/editAddress`);
    console.log('updateAddressApi data :', data);
    console.log('update address error', error);
    throw error;
  }
};


const AppointmentSlotApi = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_BOOKTEST}/bookAppointmentSlot`, JSON.stringify(data), {
      data: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/bookAppointmentSlot`);
    console.log('data :', data);
    console.log('bookAppointmentSlot error', error);
    throw error;
  }
};

const CheckoutDetailsAPI = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_BOOKTEST}/checkout`, JSON.stringify(data));
    console.log('url :', `${API_URL_BOOKTEST}/checkout`);
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/checkout`);
    console.log('CheckoutDetailsAPI error', error);
    throw error;
  }
};

const OrderCheckout = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_BOOKTEST}/order`, JSON.stringify(data));
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/order`);
    console.log('data :', data);
    console.log('CheckoutDetailsAPI error', error);
    throw error;
  }
};


const VerifyPayment = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_AUTH}/pay/verifyPayment`, JSON.stringify(data));
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_AUTH}/pay/verifyPayment`);
    console.log('data :', data);
    console.log('VerifyPayment error', error);
    throw error;
  }
};

const FullBodyCheckupAPI = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_BOOKTEST}/packageDetails`, JSON.stringify(data));
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/packageDetails`);
    console.log('data :', data);
    console.log('packageDetails error', error);
    throw error;
  }
};



const getCallbackApi = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_AUTH}/agri/cart/bookconsult`, JSON.stringify(data));
    console.log('url :', `${API_URL_AUTH}/agri/cart/bookconsult`);
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_AUTH}/agri/cart/bookconsult`);
    console.log('data :', data);
    console.log('getCallbackApi error', error);
    throw error;
  }
};


const getSimilarpkgApi = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_BOOKTEST}/similarpackages`, JSON.stringify(data));
    console.log('url :', `${API_URL_BOOKTEST}/similarpackages`);
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_BOOKTEST}/similarpackages`);
    console.log('data :', data);
    console.log('getCallbackApi error', error);
    throw error;
  }
};

const BooktestSearch = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_AUTH}/booktest/search`, JSON.stringify(data));
    console.log('url :', `${API_URL_AUTH}/booktest/search`);
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_AUTH}/booktest/search`);
    console.log('data :', data);
    console.log('getCallbackApi error', error);
    throw error;
  }
};

const OrderListing = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_URL_AUTH}/booktest/orderlist`, JSON.stringify(data));
    console.log('url :', `${API_URL_AUTH}/booktest/orderlist`);
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_AUTH}/booktest/orderlist`);
    console.log('data :', data);
    console.log('OrderListing error', error);
    throw error;
  }
};

export {
  categoriesApi, categoriesInfoApi, AvailableTimeSlot, AddtoCart,
  CartDetailsAPi, RemoveFromCart, Addaddress, SlotDetails, FetchAddressList,
  updateDefaultAddress, RemoveAddressApi, updateAddressApi, AppointmentSlotApi,
  CheckoutDetailsAPI, OrderCheckout, VerifyPayment, callGenderCategoryApi,
  callGendercategoriesInfoApi, FullBodyCheckupAPI, getCallbackApi, getSimilarpkgApi,
  BooktestSearch, OrderListing
};



