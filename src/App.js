import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuBar from './components/MenuBar';
import HomePage from './pages/HomePage';
import DashBoard from './pages/DashBoard';
import Signin from './pages/Signin';
import EditComponents from './components/EditComponents';
import Footer from './components/Footer';
import TopNew from './pages/TopNew';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    var decoded = jwt_decode(response.credential);
    setUser(decoded);
    document.getElementById("buttonDiv").hidden = true;
    navigate("/homepage");
  };

  const handleLogOut = (e) => {
    setUser({});
    document.getElementById("buttonDiv").hidden = false;
  };

  useEffect(() => {
    /* global google*/
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: "649922704699-032oqaosppsos2qm66h73rmbgime1h7o.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  }, []);

  return (
    <BrowserRouter>
      <MenuBar user={user} handleLogOut={handleLogOut}/>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/" element={<Signin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signin" element={<Signin setIsLoggedIn={setIsLoggedIn} />} />
        {isLoggedIn && (
          <>
            <Route path="/homepage" element={<HomePage />}/>
            <Route path="/topnews" element={<TopNew />}/>
            <Route path="/dashboard" element={<DashBoard />}/>
            <Route path="/add" element={<EditComponents />}/>
            <Route path="/update/:id" element={<EditComponents />}/>
          </>
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;