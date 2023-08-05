import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuBar from "./components/MenuBar";
import HomePage from "./pages/HomePage";
import DashBoard from "./pages/DashBoard";
import Signin from "./pages/Signin";
import EditComponents from "./components/EditComponents";
import Footer from "./components/Footer";
import TopNew from "./pages/TopNew";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          paddingTop: "64px",
        }}
      >
        <MenuBar user={user} setUser={setUser} />
        <ToastContainer position="top-right" autoClose={2000} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/signin"
              element={<Signin user={user} setUser={setUser} />}
            />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/topnews" element={<TopNew />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/add" element={<EditComponents />} />
            <Route path="/update/:id" element={<EditComponents />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
