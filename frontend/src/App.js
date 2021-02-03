import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeScreen from "./Screens/HomeScreen";
import PostScreen from "./Screens/PostScreen";

import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import UserListScreen from "./Screens/UserListScreen";
import UserEditScreen from "./Screens/UserEditScreen";

import PostsListScreen from "./Screens/PostsListScreen";
import PostEditScreen from "./Screens/PostEditScreen";
import PostOneUser from "./Screens/PostOneUser";

import DashboardPage from "./Screens/DashboardPage";
import ChatroomPage from "./Screens/ChatroomPage";
import io from "socket.io-client";
import makeToast from "./Toaster";

const App = () => {
  const [socket, setSocket] = React.useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");
    if (token && !socket) {
      const newSocket = io("http://localhost:8000", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        makeToast("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };

  React.useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/post/:id" component={PostScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />

          <Route path="/admin/postlist" component={PostsListScreen} />
          <Route path="/user/post/:id/edit" component={PostEditScreen} />
          <Route path="/posts/user/:id" component={PostOneUser} />

          <Route path="/" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />

          <Route
            path="/dashboard"
            render={() => <DashboardPage socket={socket} />}
            exact
          />
          <Route
            path="/chatroom/:id"
            render={() => <ChatroomPage socket={socket} />}
            exact
          />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
