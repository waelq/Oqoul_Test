import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";

import { listPostDetails } from "../action/postAction";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
// import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const PostScreen = ({ match }) => {
  const dispatch = useDispatch();

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;
  
  // data from backend
  useEffect(() => {
    dispatch(listPostDetails(match.params.id));
  }, [dispatch, match]);
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Card.Title>{post.title}</Card.Title>
            <Card.Title>{post.text}</Card.Title>
          </Col>
          <Col md={6}>
            <Card.Title>{post.name}</Card.Title>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PostScreen;

// const [qty, setQty] = useState(1);
// const [rating, setRating] = useState(0);
// const [comment, setComment] = useState("");

// const dispatch = useDispatch();

// const productDetails = useSelector((state) => state.productDetails);
// const { loading, product, error } = productDetails;

// const userLogin = useSelector((state) => state.userLogin);
// const { userInfo } = userLogin;

// const productReviewCreate = useSelector((state) => state.productReviewCreate);
// const {
//   success: successProductReview,
//   error: errorProductReview,
// } = productReviewCreate;

// useEffect(() => {
//   if (successProductReview) {
//     alert("Review Submited");
//     setRating(0);
//     setComment("");
//     dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
//   }
//   dispatch(detailsProducts(match.params.id));
// }, [dispatch, match, successProductReview]);

// // const product = {};

// // Add to Cart
// const addToCart = () => {
//   history.push(`/cart/${match.params.id}?qty=${qty}`);
// };

// // Add review
// const submitHandler = (e) => {
//   e.preventDefualt();
//   dispatch(
//     CreateProductsReview(match.params.id, {
//       rating,
//       comment,
//     })
//   );
// };
