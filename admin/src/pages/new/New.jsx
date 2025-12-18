import React, { useState } from "react";
import "./new.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";

function New({ inputs, title }) {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_present", "upload");
    try {
      // const uploadRes = await axios.post(
      //   "https://api.cloudinary.com/v1_1/lamadev/image/upload",
      //   data
      // );

      const { url } = "1.jpeg";
      const newUser = { ...info, img: url };
      alert(newUser.img, newUser.info);
      await axios.post("auth/register", newUser);
    } catch (error) {
      console.log(error);
    }
    alert("hello .....");
  };
  return (
    <div className="new">
      <div>
        <Navbar />
      </div>

      <div className="container">
        <Sidebar />
        <div className="newContainer">
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label htmlFor="file" className="label">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </div>
                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label className="label">{input.label}</label>
                    <input
                      type={input.type}
                      id={input.id}
                      placeholder={input.placeholder}
                      onChange={handleChange}
                      className="input1"
                    />
                  </div>
                ))}
                <button className="button" onClick={handleClick}>
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

export default New;
