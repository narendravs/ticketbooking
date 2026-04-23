import React, { useState } from "react";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import "./newHotel.css";
import toast from "react-hot-toast";

function NewHotel() {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const { data, loading, postData } = useFetch("/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSlect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Creating hotel...");

    try {
      const data = new FormData();

      // 1. Append Multiple Files
      // 'files' is a FileList object, so we loop through it
      if (files) {
        Object.values(files).forEach((file) => {
          data.append("files", file); // Key should match backend (e.g., upload.array("files"))
        });
      }

      // 2. Append Room IDs
      // Since 'rooms' is an array, we append each ID
      rooms.forEach((roomId) => {
        data.append("rooms", roomId);
      });

      // 3. Append General Info (title, desc, price, etc.)
      Object.keys(info).forEach((key) => {
        data.append(key, info[key]);
      });

      // 4. Send to Backend
      await postData("/hotels", data);

      toast.success("Hotel created successfully!", { id: loadingToast });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
    </>
  );
}

export default NewHotel;
