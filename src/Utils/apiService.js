import PostApiCall from './api'


const loginUser = async (data) => {
    return PostApiCall('api/users/login', data);
};

const registerUser = async (data) => {
    return PostApiCall('api/users/register',data);
};

export {
    loginUser,registerUser
}






















