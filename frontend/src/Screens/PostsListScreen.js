import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ShowMoreText from "react-show-more-text";

import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { listPosts, deletePost, createPost } from "../action/postAction";
import { POST_CREATE_RESET } from "../constants/postConstants";

const PostsListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const { loading, error, posts } = postList;

  const postDelete = useSelector((state) => state.postDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = postDelete;

  const postCreate = useSelector((state) => state.postCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    post: createdPost,
  } = postCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: POST_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/post/${createdPost._id}/edit`);
    } else {
      dispatch(listPosts());
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdPost]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete it")) {
      dispatch(deletePost(id));
    }
  };

  const createPostHandler = () => {
    dispatch(createPost());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Posts</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createPostHandler}>
            <i className="fas fa-plus"></i> Create Post
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID CREATED </th>
              <th>TITLE</th>
              <th>TEXT</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post._id}</td>
                <td>{post.user}</td>
                <td>{post.title} </td>
                <ShowMoreText
                  lines={2}
                  more="Show more"
                  less="Show less"
                  anchorClass=""
                  expanded={false}
                >
                  <td>{post.text}</td>{" "}
                </ShowMoreText>

                <td>
                  <LinkContainer to={`/admin/post/${post._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(post._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default PostsListScreen;
