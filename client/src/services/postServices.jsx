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

const getPostData = async (setPosts,token) => {
    axios
      .get(`${URL}/api/v1/post/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("hell:"+Object.keys(res.data))
        setPosts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePost = async (postId, action, token) => {
    try {
        await axios
            .patch(`${URL}/api/v1/post/update/${postId}`,
                { action: `${action}` },
                { headers: { Authorization: `Bearer ${token}` } }
            )
    } catch (error) {
        console.log(error.message);
    }

};

const updatePostComment = async (postId, commentId, action, token) => {
  try {
      await axios
          .patch(`${URL}/api/v1/post/update/${postId}`,
              {
                  action: `${action}`,
                  commentId
              },
              { headers: { Authorization: `Bearer ${token}` } }
          )
  } catch (error) {
      console.log(error.message);
  }
};
  

export {createPostApi, getPostData, updatePost, updatePostComment};