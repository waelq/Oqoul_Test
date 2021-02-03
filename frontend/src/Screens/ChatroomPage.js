import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { Form, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ChatroomPage = ({ match, socket }) => {
  const chatroomId = match.params.id;
  console.log(chatroomId);
  // const [chatrooms, setChatrooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const [userId, setUserId] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(userInfo);

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId,
        message: messageRef.current.value,
      });

      messageRef.current.value = "";
    }
  };

  useEffect(() => {
    const token = userInfo.token;
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    if (socket) {
      socket.on("newMessage", (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }
    //eslint-disable-next-line
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatroomId,
      });
    }

    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId,
        });
      }
    };
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Link to="/dashboard" className="btn btn-light my-3">
        Go Back
      </Link>
      <Card>
        <div className="chatroomSection">
          <h1>Chatroom Name </h1>
          <Card.Body>
            <div>
              <span>Name :</span> Message
            </div>
            {messages.map((message, i) => (
              <div key={i} className="message">
                <span
                  className={
                    userId === message.userId ? "ownMessage" : "otherMessage"
                  }
                >
                  {message.name}:
                </span>{" "}
                {message.message}
              </div>
            ))}
          </Card.Body>
          <Form onSubmit={sendMessage}>
            <Form.Control
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
            />

            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </div>
      </Card>
    </>
  );
};

export default withRouter(ChatroomPage);
