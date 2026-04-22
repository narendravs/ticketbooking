import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./Layout.css";
const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="container">
        <Sidebar />
        <div className="newContainer">
          <Outlet /> {/* This renders the child routes */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
