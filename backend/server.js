import express from "express";
import dotenv from "dotenv";
import posts from "./data/post.js";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("API is runing");
});
app.get("/api/posts", (req, res) => {
  res.json(posts);
});
app.get("/api/posts/:id", (req, res) => {
  const post = posts.find((p) => p._id === req.params.id);
  res.json(post);
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
