import { Router } from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
  getFeatured,
} from "../controllers/hotels.js";

const router = Router();

//create hotel
router.post("/", verifyAdmin, createHotel);
//update hotel
router.put("/:id", verifyAdmin, updateHotel);
//delete hotel
router.delete("/:id", verifyAdmin, deleteHotel);
//find the hotel
router.get("/find/:id", getHotel);
//get all the hotel
router.get("/", getHotels);
//get the rroms
router.get("/rooms/:id", getHotelRooms);
//get the city
router.get("/countByCity/cities", countByCity);
//get the type
router.get("/countByType/type", countByType);

//get the featured properties
router.get("/featured", getFeatured);

export default router;
