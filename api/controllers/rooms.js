import room from "../models/Room.js";
import hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
  const hotelid = req.params.hotelid;
  const newRoom = new room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await hotel.findByIdAndUpdate(hotelid, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};
export const updateRoom = async (req, res, next) => {
  const roomId = req.params.id;
  console.log(roomId);
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      roomId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (error) {
    next(error);
  }
};
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id }, //need to check pull
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Room has been deleted");
  } catch (error) {
    next(error);
  }
};
export const getRoom = async (req, res, next) => {
  const roomId = req.params.id;
  try {
    const room = await Room.findById(roomId);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();

    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } } //need to check the update
    );
    res.status(200).json("Room status has been updated.");
  } catch (error) {
    next(error);
  }
};
