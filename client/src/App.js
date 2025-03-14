import "./App.css";
import Login from "./pages/login/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import List from "./pages/list/List";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import Register from "./pages/register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
