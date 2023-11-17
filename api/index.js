import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import hotelRoute from "./routes/hotels.js";
//import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
dotenv.config();

//mongoose connection
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
});

//test the connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log(" Mongoose Connected successfully");
});

// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: "http://localhost:8000",
//     changeOrigin: true,
//   })
// );

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/hotels", hotelRoute);

app.listen(8000, () => {
  console.log("App running on the PORT 8000 Successfully");
});
