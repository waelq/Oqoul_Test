import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/post/${post._id}`}>
          <Card.Title as="div" variant="top">
            <h3>{post.title}</h3>
          </Card.Title>
        </Link>
        <Card.Body>
          <Link to={`/post/${post._id}`}>
            <Card.Text as="div" variant="top">
              {post.text}
            </Card.Text>
          </Link>{" "}
        </Card.Body>

        <Link to={`/post/${post._id}`}>
          <Card.Title as="div" variant="top">
            <p>Created by{post.name}</p>
          </Card.Title>
        </Link>
      </Card>
    </>
  );
};

export default Post;
