import { Router } from "express";
import {
  createRoom,
  deleteRoom,
  updateRoom,
  updateRoomAvailability,
  getRooms,
  getRoom,
} from "../controllers/rooms.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = Router();

router.get("/", getRooms);
router.get("/:id", getRoom);
router.post("/:hotelid", verifyAdmin, createRoom);
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

export default router;
