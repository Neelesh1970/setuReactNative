import axios from "axios";
import { API_URL_AGRICULTURE ,API_URL_AUTH} from '@env';
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



const fertilizerListing = async () => {
  try {
    // const response = await axiosInstance.get(`${API_URL_AGRICULTURE}/cart/fertilizerListing`, {
    const token = await getToken();
    const response = await axiosInstance.get(`${API_URL_AGRICULTURE}/cart/fertilizerListing`, {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_AGRICULTURE}/cart/fertilizerListing`);
    console.log('categories error', error);
    throw error;
  }
}

const fertilizerListingDetails = async (data) => {
  try {
    // const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/cart/category`,JSON.stringify(data), {
    const token = await getToken();
    const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/cart/category`,JSON.stringify(data), {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_AGRICULTURE}/cart/category`);
    console.log('data :', data);
    console.log('fertilizerListingDetails error', error);
    throw error;
  }
};


const fertilizerCategoryList = async () => {
  try {
    // const response = await axiosInstance.get(`${API_URL_AGRICULTURE}/cart/agritest`, {
    const token = await getToken();
    const response = await axiosInstance.get(`${API_URL_AGRICULTURE}/cart/agritest`, {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_AGRICULTURE}/cart/agritest`);
    console.log('data :', data);
    console.log('agritest error', error);
    throw error;
  }
};

const AgriAddToCart = async (data) => {
  try {
    // const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/cart/cart/add`,JSON.stringify(data), {
    const token = await getToken();
    console.log("Agriculture Token: ", token)
    const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/cart/cart/add`,JSON.stringify(data), {
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_AGRICULTURE}/cart/cart/add`);
    console.log('data :', data);
    console.log('AgriAddToCart error', error);
    throw error; 
  }
};

const CartDetailsApi = async (data) => {
  try {
    // const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/cart/cartlist/details`,JSON.stringify(data), {
    const token = await getToken();
    // const response = await axios.post(`${API_URL_AGRICULTURE}/cart/cartlist/details`,JSON.stringify(data), {
      const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/cart/cartlist/details`,JSON.stringify(data), {

       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_AGRICULTURE}/cart/cartlist/details`);
    console.log('data :', data);
    console.log('AgriAddToCart error', error);
    throw error;
  }
};

const RemoveFromCartApi = async (data) => {
  try {
    // const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/cart/remove`,JSON.stringify(data), {
    const token = await getToken();
    // const response = await axios.post(`${API_URL_AGRICULTURE}/cart/remove`,JSON.stringify(data), {
      const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/cart/remove`,JSON.stringify(data), {

       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_AGRICULTURE}/cart/remove`);
    console.log('data :', data);
    console.log('AgriAddToCart error', error);
    throw error;
  }
};


const bookSlotApi = async (data) => {
  try {
    // const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/cart/bookSlot`,JSON.stringify(data), {
    const token = await getToken();
    // const response = await axios.post(`${API_URL_AGRICULTURE}/cart/bookSlot`,JSON.stringify(data), {
      const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/cart/bookSlot`,JSON.stringify(data), {

       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_AGRICULTURE}/cart/bookSlot`);
    console.log('data :', data);
    console.log('bookSlotApi error', error);
    throw error;
  }
};

const agrocheckoutDetailsApi = async (data) => {
  try {
    // const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/order/checkoutDetails`,JSON.stringify(data), {
    const token = await getToken();
    // const response = await axios.post(`${API_URL_AGRICULTURE}/order/checkoutDetails`,JSON.stringify(data), {
      const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/order/checkoutDetails`,JSON.stringify(data), {

       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('url :', `${API_URL_AGRICULTURE}/checkoutDetails`);
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_AGRICULTURE}/checkoutDetails`);
    console.log('data :', data);
    console.log('checkoutDetailsApi error', error);
    throw error;
  }
};


const agroOrderplace = async (data) => {
  try {
    // const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/order/place`,JSON.stringify(data), {
    const token = await getToken();
    // const response = await axios.post(`${API_URL_AGRICULTURE}/order/place`,JSON.stringify(data), {
      const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/order/place`,JSON.stringify(data), {

       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('url :', `${API_URL_AGRICULTURE}/place`);
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_AGRICULTURE}/place`);
    console.log('data :', data);
    console.log('placeApi error', error);
    throw error;
  }
};

const callconsultApi = async (data) => {
  try {
    // const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/cart/bookconsult`,JSON.stringify(data), {
    const token = await getToken();
    // const response = await axios.post(`${API_URL_AGRICULTURE}/cart/bookconsult`,JSON.stringify(data), {
      const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/cart/bookconsult`,JSON.stringify(data), {

       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('url :', `${API_URL_AGRICULTURE}/cart/bookconsult`);
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_AGRICULTURE}/cart/bookconsult`);
    console.log('data :', data);
    console.log('placeApi error', error);
    throw error;
  }
};

const callAgriSearch = async (data) => {
  try {
    // const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/cart/search`,JSON.stringify(data), {
    const token = await getToken();
    // const response = await axios.post(`${API_URL_AGRICULTURE}/cart/search`,JSON.stringify(data), {
      const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/cart/search`,JSON.stringify(data), {

       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('url :', `${API_URL_AGRICULTURE}/cart/search`);
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_AGRICULTURE}/cart/search`);
    console.log('data :', data);
    console.log('callAgriSearch error', error);
    throw error;
  }
};

const callOrderList = async (data) => {
  try {
    // const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/order/orderlist`,JSON.stringify(data), {
    const token = await getToken();
    // const response = await axios.post(`${API_URL_AGRICULTURE}/order/orderlist`,JSON.stringify(data), {
      const response = await axiosInstance.post(`${API_URL_AGRICULTURE}/order/orderlist`,JSON.stringify(data), {

       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('url :', `${API_URL_AGRICULTURE}/order/orderlist`);
    return response;
  } catch (error) {
    console.log('url :', `${API_URL_AGRICULTURE}/order/orderlist`);
    console.log('data :', data);
    console.log('callOrderList error', error);
    throw error;
  }
};



export { fertilizerListing,fertilizerListingDetails,AgriAddToCart,CartDetailsApi,
  RemoveFromCartApi,bookSlotApi,agrocheckoutDetailsApi,agroOrderplace, callconsultApi,
  fertilizerCategoryList, callAgriSearch, callOrderList};
