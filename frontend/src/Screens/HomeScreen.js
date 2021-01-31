import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Post from "../Components/Post";
import { listPosts } from "../action/postAction";
import Message from "../Components/Message";
import Loader from "../Components/Loader";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);
  const { loading, posts, error } = postList;
  // data from backend
  useEffect(() => {
    dispatch(listPosts(keyword));
  }, [dispatch,keyword]);
  return (
    <>
      <h1>List Post</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {posts.map((post) => (
            <Col key={post._id} sm={12} md={6} lg={4} xl={3}>
              <Post post={post} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
