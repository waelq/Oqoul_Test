import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  // PRODUCT_DELETE_REQUEST,
  // PRODUCT_DELETE_SUCCESS,
  // PRODUCT_DELETE_FAIL,
  // PRODUCT_CREATE_REQUEST,
  // PRODUCT_CREATE_SUCCESS,
  // PRODUCT_CREATE_FAIL,
  // PRODUCT_CREATE_RESET,
  // PRODUCT_UPDATE_REQUEST,
  // PRODUCT_UPDATE_SUCCESS,
  // PRODUCT_UPDATE_FAIL,
  // PRODUCT_UPDATE_RESET,
  // PRODUCT_CREATE_REVIEW_REQUEST,
  // PRODUCT_CREATE_REVIEW_SUCCESS,
  // PRODUCT_CREATE_REVIEW_FAIL,
} from "../constants/postConstants";

// List Post
export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true, posts: [] };
    case POST_LIST_SUCCESS:
      return { loading: false, posts: action.payload };
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// Details
export const postDetailsReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return { loading: true, ...state };
    case POST_DETAILS_SUCCESS:
      return { loading: false, post: action.payload };
    case POST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// // Delete products
// export const productDeleteReducer = (state = {}, action) => {
//   switch (action.type) {
//     case PRODUCT_DELETE_REQUEST:
//       return { loading: true };
//     case PRODUCT_DELETE_SUCCESS:
//       return { loading: false, success: true };
//     case PRODUCT_DELETE_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// // Create products
// export const productCreateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case PRODUCT_CREATE_REQUEST:
//       return { loading: true };
//     case PRODUCT_CREATE_SUCCESS:
//       return { loading: false, success: true, product: action.payload };
//     case PRODUCT_CREATE_FAIL:
//       return { loading: false, error: action.payload };
//     case PRODUCT_CREATE_RESET:
//       return {};
//     default:
//       return state;
//   }
// };
// // Update products
// export const productUpdateReducer = (state = { product: {} }, action) => {
//   switch (action.type) {
//     case PRODUCT_UPDATE_REQUEST:
//       return { loading: true };
//     case PRODUCT_UPDATE_SUCCESS:
//       return { loading: false, success: true, product: action.payload };
//     case PRODUCT_UPDATE_FAIL:
//       return { loading: false, error: action.payload };
//     case PRODUCT_UPDATE_RESET:
//       return { product: {} };
//     default:
//       return state;
//   }
// };
// // Review products
// export const productReviewCreateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case PRODUCT_CREATE_REVIEW_REQUEST:
//       return { loading: true };
//     case PRODUCT_CREATE_REVIEW_SUCCESS:
//       return { loading: false, success: true };
//     case PRODUCT_CREATE_REVIEW_FAIL:
//       return { loading: false, error: action.payload };
//     case PRODUCT_CREATE_REVIEW_RESET:
//       return {};
//     default:
//       return state;
//   }
// };
