import React, { useEffect, useState } from "react";
import axios from "axios";

import { Row, Col } from "react-bootstrap";
import Post from "../Components/Post";

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  // data from backend
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get("/api/posts");
      setPosts(data);
    };
    fetchPosts();
  }, []);
  return (
    <>
      <h1>List Post</h1>
      <Row>
        {posts.map((post) => (
          <Col key={post.id} sm={12} md={6} lg={4} xl={3}>
            <Post post={post} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
