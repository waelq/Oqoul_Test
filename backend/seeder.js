// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import users from "./data/user.js";
// import posts from "./data/post.js";
// import Post from "./models/postModel.js";
// import User from "./models/userModel.js";
// import connectDB from "./config/db.js";

// dotenv.config();
// connectDB();

// const importDate = async () => {
//   try {
//     await Post.deleteMany();
//     await User.deleteMany();

//     const createUser = await User.insertMany(users);
//     const adminUser = createUser[0]._id;

//     const samplePosts = posts.map((post) => {
//       return { ...post, user: adminUser };
//     });

//     await Post.insertMany(samplePosts);
//     console.log("Data Imported!");
//     process.exit();
//   } catch (error) {
//     console.error(`${error}`);
//     process.exit(1);
//   }
// };

// const destroyDate = async () => {
//   try {
//     await Post.deleteMany();
//     await User.deleteMany();

//     console.log("Data Destroy!");
//     process.exit();
//   } catch (error) {
//     console.error(`${error}`);
//     process.exit(1);
//   }
// };
// if (process.argv[2] === "-d") {
//   destroyDate();
// } else {
//   importDate();
// }
