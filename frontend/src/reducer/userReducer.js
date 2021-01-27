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
  USER_UPDATE_REQUEST,
  USER_UPDATE_SECCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SECCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SECCESS,
  USER_DELETE_FAIL,
  // USER_UPDATE_ADMIN_REQUEST,
  // USER_UPDATE_ADMIN_SECCESS,
  // USER_UPDATE_ADMIN_FAIL,
  // USER_UPDATE_ADMIN_RESET,
} from "../constants/userConstants";

// login
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SECCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGIN_LOGOUT:
      return {};
    default:
      return state;
  }
};
// Register
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SECCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// USER_DETAILS
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SECCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// update
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SECCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// User List
export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SECCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};
// User Delete
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SECCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
// // updateuser By Admin
// export const userUpdateAdminReducer = (state = { user: {} }, action) => {
//   switch (action.type) {
//     case USER_UPDATE_ADMIN_REQUEST:
//       return { loading: true };
//     case USER_UPDATE_ADMIN_SECCESS:
//       return { loading: false, success: true };
//     case USER_UPDATE_ADMIN_FAIL:
//       return { loading: false, error: action.payload };
//     case USER_UPDATE_ADMIN_RESET:
//       return { user: {} };

//     default:
//       return state;
//   }
// };
