import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import hotelRoute from "./routes/hotels.js";

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

app.use(
  cors({
    origin: [
      "https://mern-ticketbooking-client.vercel.app", // Client Frontend
      "https://ticketbooking-admin.vercel.app", // Admin Frontend
      "http://localhost:4000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Server is alive on Port 8000");
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/hotels", hotelRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8000, () => {
  console.log("App running on the PORT 8000 Successfully");
});
