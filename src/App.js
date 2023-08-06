import React from "react";
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
import { AuthContextProvider } from "./context/AuthContext";
import Protected from "./components/Protected";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            paddingTop: "64px",
          }}
        >
          <MenuBar />
          <ToastContainer position="top-right" autoClose={2000} />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Signin/>} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/topnews" element={<TopNew />} />
              <Route path="/dashboard" element={ 
                <Protected>
                  <DashBoard />
                </Protected>
              }/>
              <Route path="/profile" element={
                  <Protected>
                    <Profile />
                  </Protected>
                }
              />
              <Route path="/add" element={<EditComponents />} />
              <Route path="/update/:id" element={<EditComponents />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
