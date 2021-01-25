import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

// @desc Fetch All posts
// @route GET /api/posts
// @access Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});
// @desc Fetch single products
// @route GET /api/products/:id
// @access Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});
// // @desc Delete a products
// // @route DELETE /api/products/:id
// // @access Private/Admin
// const deleteProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product) {
//     await product.remove();
//     res.json({ message: "Product Removed" });
//   } else {
//     res.status(404);
//     throw new Error("Product not found");
//   }
// });
// // @desc Create a products
// // @route POST /api/products/
// // @access Private/Admin
// const createProduct = asyncHandler(async (req, res) => {
//   const product = new Product({
//     name: "Sample name",
//     price: 0,
//     user: req.user._id,
//     image: "/image/sample.jpg",
//     brand: "sample brand",
//     category: "sample category",
//     countInStock: 0,
//     numReviews: 0,
//     description: "Sample description",
//   });
//   const createdProduct = await product.save();
//   res.status(201).json(createdProduct);
// });
// // @desc Update a products
// // @route PUT /api/products/:id
// // @access Private/Admin
// const updateProduct = asyncHandler(async (req, res) => {
//   const {
//     name,
//     price,
//     image,
//     brand,
//     category,
//     countInStock,
//     description,
//   } = req.body;

//   const product = await Product.findById(req.params.id);
//   if (product) {
//     product.name = name;
//     product.price = price;
//     product.image = image;
//     product.brand = brand;
//     product.description = description;
//     product.category = category;
//     product.countInStock = countInStock;

//     const updatedProduct = await product.save();
//     res.status(201).json(updatedProduct);
//   } else {
//     res.status(404);
//     throw new Error("Product not found to update");
//   }
// });
// // @desc Create new review
// // @route PUT /api/products/:id/reviews
// // @access Private
// const createProductReview = asyncHandler(async (req, res) => {
//   const { rating, comment } = req.body;

//   const product = await Product.findById(req.params.id);
//   if (product) {
//     const alreadyReviewed = product.reviews.find(
//       (r) => r.user.toString() === req.user._id.toString
//     );
//     if (alreadyReviewed) {
//       res.status(400);
//       throw new Error("Products already reviewed");
//     }
//     const review = {
//       name: req.user.name,
//       reating: Number(rating),
//       comment,
//       user: req.user._id,
//     };
//     products.reviews.push(review);
//     product.numReviews = product.review.length;
//     product.rating =
//       product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       product.reviews.length;

//     await product.save();
//     res.status(201).json({ message: "Review Added" });
//   } else {
//     res.status(404);
//     throw new Error("Product not found to update");
//   }
// });
export { getPosts, getPostById };
