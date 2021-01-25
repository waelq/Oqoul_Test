import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";
import { notFound, errorHandler } from "./Middleware/errorMeddleware.js";

dotenv.config();
connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("API is runing");
});

app.use("/api/posts", postRoutes);
// route not found
app.use(notFound);
// error path in route
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
