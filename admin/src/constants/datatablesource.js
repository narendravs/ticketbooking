export const userColumns = [
  { field: "_id", headerName: "ID", flex: 1 },
  {
    field: "user",
    headerName: "User",
    flex: 2,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "city",
    headerName: "City",
    flex: 1,
  },

  {
    field: "country",
    headerName: "Country",
    flex: 1,
  },

  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", flex: 1 },
  {
    field: "name",
    headerName: "Name",
    flex: 2,
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
  },
  {
    field: "title",
    headerName: "Title",
    flex: 1,
  },
  {
    field: "city",
    headerName: "City",
    flex: 1,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", flex: 1 },
  {
    field: "title",
    headerName: "Title",
    flex: 2,
  },
  {
    field: "desc",
    headerName: "Description",
    flex: 1,
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    flex: 1,
  },
];
