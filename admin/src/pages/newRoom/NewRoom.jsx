import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./newRoom.css";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

function NewRoom() {
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [hotelId, setHotelId] = useState(undefined);
  const { data, loading } = useFetch("/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
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
            <h1>Add New Room</h1>
          </div>
          <div className="bottom">
            <div className="right">
              <form>
                {roomInputs.map((room) => (
                  <div className="formInput" key={room.id}>
                    <label className="label">{room.label}</label>
                    <input
                      type={room.type}
                      placeholder={room.placeholder}
                      id={room.id}
                      onChange={handleChange}
                      className="input1"
                    />
                  </div>
                ))}
                <div className="formInput">
                  <label className="label">Room</label>
                  <textarea
                    onChange={(e) => setRooms(e.target.value)}
                    placeholder="give comma between room numbers."
                  />
                </div>
                <div className="formInput">
                  <label className="label">Choose a hotel</label>
                  <select
                    id="hotelId"
                    onChange={(e) => setHotelId(e.target.value)}
                  >
                    {loading
                      ? "loading"
                      : data &&
                        data.map((hotel) => (
                          <option key={hotel._id} value={hotel._id}>
                            {hotel.name}
                          </option>
                        ))}
                  </select>
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

export default NewRoom;
