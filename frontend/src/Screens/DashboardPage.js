import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Card, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const DashboardPage = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const [name, setName] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(userInfo);

  const getChatrooms = async () => {
    await axios
      .get("http://localhost:5000/api/chatroom", {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      })
      .then((response) => {
        console.log(response);
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  const createChatrooms = (e, name) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/chatroom",
        { name },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Card>
        <h1>Chatrooms</h1>
        <Card.Body>
          <Card.Title>Chatroom Name</Card.Title>
          <Form onSubmit={createChatrooms}>
            <Form.Group controlId="chatroomName">
              <Form.Control
                type="text"
                name="chatroomName"
                id="chatroomName"
                placeholder="ChatterBox Nepal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Chatroom{" "}
            </Button>
          </Form>

          <Table className="chatrooms">
            {chatrooms.map((chatroom) => (
              <>
                <tr key={chatroom._id} className="chatroom">
                  <td>{chatroom.name}</td>
                  <td>
                    <Link to={"/chatroom/" + chatroom._id}>
                      <Button>Join</Button>
                    </Link>
                  </td>
                </tr>
              </>
            ))}
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default DashboardPage;
