import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import {
  userColumns,
  hotelColumns,
  roomColumns,
} from "./constants/datatablesource.js";
import List from "./pages/list/List";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import NewHotel from "./pages/newHotel/NewHotel";
import { userInputs } from "./formSource.js";
import NewRoom from "./pages/newRoom/NewRoom";
import "./styles/dark.css";
import Register from "./pages/register/Register";
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const logUser = localStorage.getItem("user");
    if (!user || !logUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className={darkMode ? "dark" : "app"}>
      <BrowserRouter>
        {/* The Toaster stays outside the Routes so it's always available */}
        <Toaster
          position="top-center" // As specified in your Single component
          toastOptions={{
            // Default style for all toasts
            style: {
              border: "2px solid #003580",
              padding: "16px",
              color: "#003580",
              background: "#fff", // You can set the default bg here
            },
            success: {
              // Specific success theme to match your code
              iconTheme: {
                primary: "#003580",
                secondary: "#FFFAEE",
              },
            },
          }}
        />
        <Routes>
          <Route path="/">
            {/* Public Routes (No Layout) */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Protected Routes (With Layout) */}
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* index here means the "/" path */}
              <Route index element={<Home />} />

              <Route path="users">
                <Route index element={<List columns={userColumns} />} />
                <Route path=":id" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={userInputs} title="Add New User" />}
                />
              </Route>

              <Route path="hotels">
                <Route index element={<List columns={hotelColumns} />} />
                <Route path=":id" element={<Single />} />
                <Route path="new" element={<NewHotel />} />
              </Route>

              <Route path="rooms">
                <Route index element={<List columns={roomColumns} />} />
                <Route path=":id" element={<Single />} />
                <Route path="new" element={<NewRoom />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
