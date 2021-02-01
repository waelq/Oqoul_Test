import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";
import ShowMoreText from "react-show-more-text";

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
            <Row>------------------</Row>

            <ShowMoreText
              lines={3}
              more="Show more"
              less="Show less"
              anchorClass=""
              expanded={false}
            >
              <Card.Title>{post.text}</Card.Title>
            </ShowMoreText>
          </Col>
          <Col md={6}>
            <Card.Title>Created By:-</Card.Title>
            <Row>------------------</Row>
            <Card.Title>{post.user}</Card.Title>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PostScreen;
