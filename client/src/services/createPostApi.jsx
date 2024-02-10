import axios from 'axios';
const URL = import.meta.env.VITE_SERVER_URL;

const createPostApi = async (postData, token) => {
    try {
        const response = await axios.post(`${URL}/api/v1/post/create`, postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error.response;
    }
};

export default createPostApi;