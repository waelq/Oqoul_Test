import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { listPosts, deletePost } from "../action/postAction";
// import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

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

  // const productCreate = useSelector((state) => state.productCreate);
  // const {
  //   loading: loadingCreate,
  //   error: errorCreate,
  //   success: successCreate,
  //   product: createProduct,
  // } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // dispatch({ type: PRODUCT_CREATE_RESET });
    if (userInfo && userInfo.isAdmin) {
      dispatch(listPosts());
    } else {
      history.push("/login");
    }

    // if (successCreate) {
    //   history.push(`/admin/product/${createdProduct._id}/edit`);
    // }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    // successCreate,
    // createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete it")) {
      dispatch(deletePost(id));
    }
  };

  const createProductHandler = () => {
    // dispatch(createProducts());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Posts</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Post
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {/* {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>} */}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>EMAIL CREATED</th>
              <th>Name CREATED</th>
              <th>TITLE</th>
              <th>TEXT</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post._id}</td>
                <td>{post.user.email}</td>
                <td>{post.user.name}</td>
                <td>{post.title} </td>
                <td>{post.text}</td>
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
