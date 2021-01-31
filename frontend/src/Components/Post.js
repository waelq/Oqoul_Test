import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ShowMoreText from "react-show-more-text";

const Post = ({ post }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/post/${post._id}`}>
          <Card.Title as="div" variant="top">
            <h3>{post.title}</h3>
          </Card.Title>
        </Link>
        <Card.Body>
          <ShowMoreText
            lines={3}
            more="Show more"
            less="Show less"
            anchorClass=""
            expanded={false}
          >
            <Card.Title>{post.text}</Card.Title>
          </ShowMoreText>
        </Card.Body>

        <Card.Title as="div" variant="top">
          <p>Created by:- {post.user}</p>
        </Card.Title>
      </Card>
    </>
  );
};

export default Post;
