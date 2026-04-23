import React from "react";
import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import {
  userColumns,
  hotelColumns,
  roomColumns,
} from "../../constants/datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

function Datatable() {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading } = useFetch(`/${path}`);

  useEffect(() => {
    // Dynamically extract rows.
    // If data is an array (Hotels/Rooms), use it directly.
    // If data is an object with a key matching the path (Users), extract that array.
    const rowsData = Array.isArray(data) ? data : data[path] || [];
    setList(rowsData);
  }, [data, path]);

  // Determine which columns to show based on the current path
  const columns = [
    {
      field: "serialNumber",
      headerName: "ID",
      width: 70,
      renderCell: (params) => {
        return list.indexOf(params.row) + 1;
      },
    },
    ...(path === "users"
      ? userColumns
      : path === "hotels"
        ? hotelColumns
        : roomColumns
    ).filter((col) => col.field !== "_id" && col.field !== "id"),
  ];

  const handleDelete = async (id) => {
    try {
      // Use the full URL and include credentials for DELETE requests
      await axios.delete(`${process.env.REACT_APP_API_URL}/${path}/${id}`, {
        withCredentials: true,
      });
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/${path}/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <div className="title">
          {path}
          <Link to={`/${path}/new`} className="linkName">
            Add new
          </Link>
        </div>
        <DataGrid
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          getRowId={(row) => row._id}
          loading={loading}
          // Explicitly set the page size and options
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
          pageSizeOptions={[10, 20, 30]} // This enables the dropdown and forces the 5-row logic
          pagination
          autoHeight
        />
      </div>
    </div>
  );
}

export default Datatable;
