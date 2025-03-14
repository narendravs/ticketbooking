import createError from "../utils/error.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body);
    await newHotel.save();
    res.status(200).json("Hotel has been created");
  } catch (error) {
    next(error);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    next(error);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};
export const getHotels = async (req, res, next) => {
  // const [min, max, ...others] = req.query;
  //const city = req.params.city;
  try {
    // const hotels = await Hotel.find({
    //   city: req.query.city,
    //   cheapestPrice: { $gt: req.query.min, $lt: req.query.max },
    // }).limit(req.query.limit);
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
export const getHotelRooms = async (req, res, next) => {
  const hotelid = req.params.id;
  try {
    const hotel = await Hotel.findById(hotelid);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    console.log(list);
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.aggregate([
          { $match: { city: city } },
          { $group: { _id: "$city", num_hotels: { $sum: 1 } } },
        ]);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
export const getFeatured = async (req, res, next) => {
  try {
    const hotel = await Hotel.find().limit(req.query.limit);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};
