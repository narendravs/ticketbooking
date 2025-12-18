import room from "../models/Room.js";
import hotel from "../models/Hotel.js";

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
    const updateRoom = await room.findByIdAndUpdate(
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
    await room.findByIdAndDelete(req.params.id);
    try {
      await hotel.findByIdAndUpdate(hotelId, {
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
  const hotelId = req.params.id;
  try {
    const hotelInfo = await hotel.findById(hotelId);
    const roomList = await room.find({ _id: { $in: hotelInfo.rooms } });
    res.status(200).json(roomList);
  } catch (error) {
    next(error);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const roomsInfo = await room.find();

    res.status(200).json(roomsInfo);
  } catch (error) {
    next(error);
  }
};
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await room.updateOne(
      { "roomNumbers._id": req.params.id },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } } //need to check the update
    );
    res.status(200).json("Room status has been updated.");
  } catch (error) {
    next(error);
  }
};
