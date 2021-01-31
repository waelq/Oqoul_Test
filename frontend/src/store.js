import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  postListReducer,
  postDetailsReducer,
  postDeleteReducer,
  postCreateReducer,
  postUpdateReducer,
  postUserListReducer,
} from "./reducer/postReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateByAdminReducer,
} from "./reducer/userReducer";
const reducer = combineReducers({
  postList: postListReducer,
  postDetails: postDetailsReducer,
  postDelete: postDeleteReducer,
  postCreate: postCreateReducer,
  postUpdate: postUpdateReducer,
  postUserList: postUserListReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdateByAdmin: userUpdateByAdminReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
