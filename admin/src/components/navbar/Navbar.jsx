import React, { useState, useRef, useEffect } from "react";
import "./navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import { DarkModeContext } from "../../context/darkModeContext.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { dispatch } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // 1. Create a ref for the profile item container
  const menuRef = useRef();

  // 2. Add effect to handle click outside
  useEffect(() => {
    const handler = (e) => {
      // If the menu is open and the click is NOT inside the menuRef (avatar + button)
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    // Attach listener
    document.addEventListener("mousedown", handler);

    // Clean up listener on unmount
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [open]);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item" ref={menuRef}>
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <button
                className={`logout-container ${!open ? "is-closed" : ""}`}
                tabIndex="0"
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
