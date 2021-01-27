import axios from "axios";
import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  // PRODUCT_CREATE_REQUEST,
  // PRODUCT_CREATE_SUCCESS,
  // PRODUCT_CREATE_FAIL,
  // PRODUCT_UPDATE_REQUEST,
  // PRODUCT_UPDATE_SUCCESS,
  // PRODUCT_UPDATE_FAIL,
  // PRODUCT_CREATE_REVIEW_REQUEST,
  // PRODUCT_CREATE_REVIEW_SUCCESS,
  // PRODUCT_CREATE_REVIEW_FAIL,
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
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/posts/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.respons.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// // Create
// export const createProducts = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: PRODUCT_CREATE_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.post(`/api/products`, {}, config);

//     dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_CREATE_FAIL,
//       payload:
//         error.response && error.respons.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
// // Update
// export const updateProducts = (product) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: PRODUCT_UPDATE_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.put(
//       `/api/products/${product._id}`,
//       product,
//       config
//     );

//     dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_UPDATE_FAIL,
//       payload:
//         error.response && error.respons.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
// // create review
// export const CreateProductsReview = (productId, review) => async (
//   dispatch,
//   getState
// ) => {
//   try {
//     dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     await axios.post(`/api/products/${productId}/reviews`, review, config);

//     dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_CREATE_REVIEW_FAIL,
//       payload:
//         error.response && error.respons.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
