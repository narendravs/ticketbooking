import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import DataList from "../../pages/dataList/DataList";
import "./single.css";

function Single() {
  return (
    <div className="single">
      <Navbar />
      <div className="singleContainer">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div>
          <div className="top">
            <div className="left">
              <div className="editButton">Edit</div>
              <h1 className="title">Information</h1>
              <div className="item">
                <img
                  src="http://localhost:3000/logo192.png"
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">Jane Doe</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">janedoe@gmail.com</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">+1 2345 67 89</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">
                      Elton St. 234 Garden Yd. NewYork
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">USA</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
            </div>
          </div>
          <div className="bottom">
            <h1 className="title1">Last Transactions</h1>
            <DataList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Single;
