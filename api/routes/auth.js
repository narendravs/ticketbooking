import express from "express";
import { register, login } from "../controllers/auth.js";
import { upload } from "../utils/cloudinaryUpload.js";

const router = express.Router();

router.post("/register", upload.single("file"), register);
router.post("/login", login);

router.get("/", (req, res) => {});

export default router;
