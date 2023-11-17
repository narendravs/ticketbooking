import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import "./list.css";

function List() {
  return (
    <div>
      <Navbar />
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Datatable />
        </div>
      </div>
    </div>
  );
}

export default List;
