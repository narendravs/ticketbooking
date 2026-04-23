import React, { useState } from "react";
import "./new.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";

function New({ inputs, title }) {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const { postData } = useFetch();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();

    // Start a loading toast
    const loadingToast = toast.loading("Uploading data...");
    // 1. Initialize FormData
    const data = new FormData();

    // 2. Append the file
    if (file) {
      data.append("file", file);
    }

    // 3. Append the text fields from the 'info' state
    // We loop through the info object and add every key/value pair to FormData
    Object.keys(info).forEach((key) => {
      data.append(info[key]);
    });

    try {
      //  4. Send the 'data' object directly
      // Ensure your useFetch hook can handle FormData objects
      await postData("auth/register", data);
      // 5. Success Toast (replaces the loading toast)
      toast.success("User registered successfully!", {
        id: loadingToast,
      });
    } catch (error) {
      console.log(error);
      toast.error("Upload failed. Please try again.", {
        id: loadingToast,
      });
    }
  };
  return (
    <>
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
                className="input1"
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
    </>
  );
}

export default New;
