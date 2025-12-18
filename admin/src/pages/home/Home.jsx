import React from "react";
// import Navbar from "../../components/navbar/Navbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Widget from "../../components/widget/Widget";
// import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart";
// import Table from "../../components/table/Table";
import "./home.css";

function Home() {
  return (
    <div className="home">
      <div>
        <Navbar />
      </div>
      <div className="homeContainer">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div>
          <div className="widgets">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />
          </div>
          <div className="charts">
            <Featured />
            <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <Table />
          </div>
        </div>
      </div>{" "}
      */}
      <p>Hello</p>
    </div>
  );
}

export default Home;
