import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { listPostDetails, updatePost } from "../action/postAction";
import { POST_UPDATE_RESET } from "../constants/postConstants";

const PostEditScreen = ({ match, history }) => {
  const postId = match.params.id;

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;

  const postUpdate = useSelector((state) => state.postUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = postUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: POST_UPDATE_RESET });
      history.push("/admin/postlist");
    } else {
      if (post._id !== postId) {
        dispatch(listPostDetails(postId));
      } else {
        setTitle(post.title);
        setText(post.text);
      }
    }
  }, [dispatch, history, postId, post, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePost({
        _id: postId,
        title,
        text,
      })
    );
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <>
        <h1>Edit Post</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                minLength={5}
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="text">
              <Form.Label>Text </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                errorMessage="First name cannot be empty."
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update !
            </Button>
          </Form>
        )}
      </>
    </>
  );
};

export default PostEditScreen;
