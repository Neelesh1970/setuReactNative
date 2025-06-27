import axios from 'axios';
import { API_URL } from '@env';


const PostApiCall = async (endpoint, data, contentType = 'application/json') => {
    try {
        const response = await axios.post(
            `${API_URL}/${endpoint}`,
            data,
            {
                headers: {
                    // Authorization: config.authorization,
                    'Content-Type': contentType,
                },
            }
        );
        // console.log('okk',`${API_URL}/${endpoint}`)
        return response;
    } catch (error) {
        throw error;
    }
};

export default PostApiCall;
