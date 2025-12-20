import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import "./newHotel.css";
import axios from "axios";

function NewHotel() {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const { data, loading } = useFetch("/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSlect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // const list = await Promise.all(
      //   Object.values(files).map(async (file) => {
      //     const data = new FormData();
      //     data.append("file", file);
      //     data.append("upload_present", "upload");
      //     const uploadRes = await axios.post(
      //       "https://api.cloudinary.com/v1_1/lamadev/image/upload",
      //       data
      //     );
      //     const { url } = uploadRes.data;
      //     return url;
      //   })
      // );
      const list = [];
      const newHotel = { ...info, rooms, photos: list };
      await axios.post("/hotels", newHotel);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Navbar />
      <div className="container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="newContainer">
          <div className="top">
            <h1>Add New Product</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src={
                  files
                    ? URL.createObjectURL(files[0])
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <div className="right">
              <form className="form">
                <div className="formInput">
                  <label htmlFor="file" className="label">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    style={{ display: "none" }}
                    className="input1"
                  />
                </div>
                {hotelInputs.map((hotel) => (
                  <div className="formInput" key={hotel.id}>
                    <label className="label">{hotel.id}</label>
                    <input
                      type={hotel.type}
                      placeholder={hotel.placeholder}
                      id={hotel.id}
                      onChange={handleChange}
                      className="input1"
                    />
                  </div>
                ))}
                <div className="formInput">
                  <label className="label">
                    Featured:
                    <select
                      id="featured"
                      onChange={handleChange}
                      className="select"
                    >
                      <option value={false}>NO</option>
                      <option value={true}>YES</option>
                    </select>
                  </label>
                </div>
                <div className="selectRooms">
                  <label className="label">
                    Rooms:
                    <select
                      id="rooms"
                      multiple
                      onChange={handleSlect}
                      className="select"
                    >
                      {loading
                        ? "loading"
                        : data &&
                          data.map((room) => (
                            <option id={room._id} value={room._id}>
                              {room.title}
                            </option>
                          ))}
                    </select>
                  </label>
                </div>

                <button onClick={handleClick} className="button">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewHotel;
