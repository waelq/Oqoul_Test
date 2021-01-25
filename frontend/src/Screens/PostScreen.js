import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";

// import { useDispatch, useSelector } from "react-redux";
// import Message from "../Components/Message";

// import {
//   detailsProducts,
//   CreateProductsReview,
//   createProducts,
// } from "../action/productAction";
// import Loader from "../Components/Loader";
// import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const PostScreen = ({ match }) => {
  const [post, setPost] = useState([]);
  // data from backend
  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`/api/posts/${match.params.id}`);
      setPost(data);
    };
    fetchPost();
  }, [match]);
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Card.Title>{post.title}</Card.Title>
          <Card.Title>{post.text}</Card.Title>
        </Col>
        <Col md={6}>
          <Card.Title>{post.name}</Card.Title>
        </Col>
      </Row>
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
