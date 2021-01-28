import axios from "axios";
import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAIL,
  POST_LISTUSER_REQUEST,
  POST_LISTUSER_SUCCESS,
  POST_LISTUSER_FAIL,
  POST_LISTUSER_RESET,
} from "../constants/postConstants";

// List Posts
export const listPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });
    const { data } = await axios.get(`/api/posts`);
    dispatch({ type: POST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload: "Error Get Posts",
    });
  }
};

// Ditails post
export const listPostDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/posts/${id}`);

    dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload: "Error Get This Post",
    });
  }
};

// Delete post
export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/posts/${id}`, config);

    dispatch({ type: POST_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.respons.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create post
export const createPost = () => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/posts`, {}, config);

    dispatch({ type: POST_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.respons.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update post
export const updatePost = (post) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/posts/${post._id}`, post, config);

    dispatch({ type: POST_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload:
        error.response && error.respons.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// List Posts for user
export const listPostsUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LISTUSER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(userInfo);
    const { data } = await axios.get(
      `http://localhost:5000/api/posts/user/${userInfo._id}`
    );

    console.log(data, "text");

    dispatch({ type: POST_LISTUSER_SUCCESS, payload: data });
  } catch (error) {
    // dispatch({
    //   type: POST_LISTUSER_FAIL,
    //   payload: error.response && error.respons ? error.response : error.message,
    // });
    console.log(error.message);
    console.error(error);
  }
};
