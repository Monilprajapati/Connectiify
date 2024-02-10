import axios from "axios";

const URL = import.meta.env.VITE_SERVER_URL;
const getComments = async (setPostComments,token, postId) => {
  axios
    .get(`${URL}/api/v1/comment/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
        setPostComments(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createComment = async (commentData, token) => {
    try {
        const response = await axios.post(`${URL}/api/v1/comment/create`, commentData, {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

const updateComment = async (commentId, action, token) => {
    try {
        await axios
            .patch(`${URL}/api/v1/comment/update/${commentId}`,
                { action: `${action}` },
                { headers: { Authorization: `Bearer ${token}` } }
            )
    } catch (error) {
        console.log(error.message);
    }

};

export {getComments, createComment, updateComment};
