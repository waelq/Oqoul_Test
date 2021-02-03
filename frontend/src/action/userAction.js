import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SECCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SECCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SECCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SECCESS,
  USER_UPDATE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SECCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SECCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_BYADMIN_REQUEST,
  USER_UPDATE_BYADMIN_SECCESS,
  USER_UPDATE_BYADMIN_FAIL,
} from "../constants/userConstants";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SECCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: "Invalied email or password",
    });
  }
};
// Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGIN_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LIST_RESET });
};
// Rgister
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SECCESS,
      payload: data,
    });

    // Direct login
    dispatch({
      type: USER_LOGIN_SECCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Get User Details getState>>to pase token
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);
    console.log(id);
    dispatch({
      type: USER_DETAILS_SECCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//update User profile
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: USER_UPDATE_SECCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// User List
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: USER_LIST_SECCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// User Delete
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: USER_DELETE_SECCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Update user by admin
export const updateUserByAdmin = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_BYADMIN_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({
      type: USER_UPDATE_BYADMIN_SECCESS,
    });

    dispatch({
      type: USER_DETAILS_SECCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_BYADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
