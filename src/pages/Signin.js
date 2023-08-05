import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../css/login.css";

const URL =
  "https://64b1f3c9062767bc4826b53c.mockapi.io/api/v1/signinInformation";

const Signin = ({ user, setUser }) => {
  const [loginData, setLoginData] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCredentialResponse = (response) => {
    // console.log("Encoded JWT ID token: " + response.credential);
    var decoded = jwt_decode(response.credential);
    setUser(decoded);
    navigate("/dashboard");
  };

  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id:
        "649922704699-032oqaosppsos2qm66h73rmbgime1h7o.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

  useEffect(() => {
    getLoginData();
  }, []);

  const getLoginData = async () => {
    try {
      const res = await axios.get(URL);
      if (res.status === 200) {
        setLoginData(res.data);
      }
    } catch (error) {
      console.error("Error fetching login data:", error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = loginData.find(
      (user) => user.userName === userName && user.password === password
    );
    if (user) {
      navigate("/homepage");
    } else {
      if (!userName.trim()) {
        toast.error("Username cannot be empty!");
      }
      if (!password.trim()) {
        toast.error("Password cannot be empty!");
      }
      if (password.length > 10) {
        toast.error("Username must not be exceeded 15 characters!");
      }
      if (userName.length > 15) {
        toast.error("Password must not be exceeded 10 characters!");
      } else {
        toast.error("Invalid Username or Password!");
      }
    }
  };

  return (
    <div className="backgroud">
      <div className="loginContainer">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <h3>Username:</h3>
          <input
            className="loginInput"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <h3>Password:</h3>
          <input
            className="loginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="loginButton" type="submit" onClick={handleLogin}>
            Login
          </button>
          <div id="buttonDiv"></div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
