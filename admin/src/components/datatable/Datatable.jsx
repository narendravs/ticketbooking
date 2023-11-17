import React from "react";
import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

function Datatable() {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
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
            <Link to="/users/single" style={{ textDecoration: "none" }}>
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

  // const columns = [
  //   { field: "id", headerName: "ID", width: 170 },
  //   { field: "name", headerName: "NAME", width: 170 },
  //   { field: "age", headerName: "AGE", width: 170 },
  // ];

  const rows = [
    {
      _id: "174746746wqiuuau88233863djkheje8y",
      username: 1,
      email: "Gourav",
      country: 12,
      city: "bang",
      phone: "123",
      phone1: "123",
    },
    {
      _id: "2",
      username: 2,
      email: "Geek",
      country: 43,
      city: "bang",
      phone: "123",
    },
    {
      _id: "3",
      username: 3,
      email: "Pranav",
      country: 41,
      city: "bang",
      phone: "123",
      phone1: "123",
    },
    {
      _id: "4",
      username: 4,
      email: "Abhay",
      country: 34,
      city: "bang",
      phone: "123",
      phone1: "123",
    },
    {
      _id: "5",
      username: 5,
      email: "Pranav",
      country: 73,
      city: "bang",
      phone: "123",
      phone1: "123",
    },
    {
      _id: "6",
      username: 6,
      email: "Disha",
      country: 61,
      city: "bang",
      phone: "123",
      phone1: "123",
    },
    {
      _id: "7",
      username: 7,
      email: "Raghav",
      country: 72,
      city: "bang",
      phone: "123",
      phone1: "123",
    },
    {
      _id: "8",
      username: 8,
      email: "Amit",
      country: 24,
      city: "bang",
      phone: "123",
      phone1: "123",
    },
    {
      _id: "9",
      username: 9,
      email: "Anuj",
      country: 48,
      city: "bang",
      phone: "123",
      phone1: "123",
    },
    {
      _id: "10",
      username: 8,
      email: "Amit",
      country: 24,
      city: "bang",
      phone: "123",
      phone1: "123",
    },
    {
      _id: "11",
      username: 9,
      email: "Anuj",
      country: 48,
      city: "bang",
      phone: "123",
      phone1: "123",
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add new
        </Link>

        <DataGrid
          className="datagrid"
          rows={rows}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
}

export default Datatable;
