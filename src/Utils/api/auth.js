import axios from "axios";
import { API_URL_AUTH } from "@env";

console.log("API_URL_AUTH", API_URL_AUTH);

const loginUser = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL_AUTH}/login`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("url", `${API_URL_AUTH}/auth/login`);
    return response;
  } catch (error) {
    throw error;
  }
};

const signupUser = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL_AUTH}/auth/register`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("signupUser response", response);
    return response;
  } catch (error) {
    console.log("url :", `${API_URL_AUTH}/auth/register`);
    console.log("signupUser data :", data);
    console.log("signupUser error", error);
    throw error;
  }
};

const forgotPasswordAPI = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL_AUTH}/auth/sendOtp`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(" forgotPasswordAPI url :", `${API_URL_AUTH}/auth/sendOtp`);
    console.log("data input :", data);
    console.log("forgotPasswordAPI :", error);
    throw error;
  }
};

const forgotPswdVerifyAPI = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL_AUTH}/auth/validateOtp`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const changePasswordApi = async (data) => {
  try {
    console.log("API Response:", "in api");

    const response = await axios.post(
      `${API_URL_AUTH}/auth/changePassword`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};


const resetpswdAPI = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL_AUTH}/auth/update-password`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("forgotPswdVerifyAPI error", error);
    throw error;
  }
};

const loginwithOtpverifyAPI = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL_AUTH}/auth/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("resetpswdAPI error", error);
    throw error;
  }
};

const Otpwithlogin = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL_AUTH}/auth/loginWithOtp`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Otpwithlogin error", error);
    throw error;
  }
}; 

const fetchUserProfileAPI = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL_AUTH}/auth/getUsers`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("fetchUserProfileAPI response", response)
    return response;
  } catch (error) {
    console.log("fetchUserProfileAPI error", error);
    throw error;
  }
}; 



const editUserProfileAPI = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL_AUTH}/auth/update`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("editUserProfileAPI response", response)
    return response;
  } catch (error) {
    console.log("editUserProfileAPI error", error);
    throw error;
  }
}; 



export {
  loginUser,
  signupUser,
  forgotPasswordAPI,
  forgotPswdVerifyAPI,
  resetpswdAPI,
  // loginwithOtpAPI,
  loginwithOtpverifyAPI,
  Otpwithlogin,
  changePasswordApi,
  fetchUserProfileAPI,
  editUserProfileAPI
};
