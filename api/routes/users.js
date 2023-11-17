import { Router } from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
import { verifyAdmin, verifyUser, verifyToken } from "../utils/verifyToken.js";
const router = Router();

router.get("/", verifyAdmin, getUsers);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getUser);

// router.get("/cookie", verifyAdmin, (req, res) => {
//   console.log("hell man");
//   const cookie = req.cookies.access_token;
//   res.status(200).json(cookie);
// });

export default router;
