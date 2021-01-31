import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
const App = () => {
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
          <Route path="/admin/post/:id/edit" component={PostEditScreen} />
          {/* <Route path="/posts/user/:id" component={PostOneUser} /> */}

          <Route path="/" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
