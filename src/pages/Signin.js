import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/login.css";

const URL = "https://64b1f3c9062767bc4826b53c.mockapi.io/api/v1/signinInformation";

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const EM = location.state && location.state.EM;

  const [loginData, setLoginData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {user, decodeJWT, loginWithPassword} = UserAuth();

  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id: "649922704699-032oqaosppsos2qm66h73rmbgime1h7o.apps.googleusercontent.com",
      callback: decodeJWT,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }, [decodeJWT]);

  useEffect(() => {
    if (user?.email != null) {
      toast.dismiss();
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (EM) {
    toast.dismiss();
    toast.error(EM);
  }

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

    const user = loginData.find((user) => user.email === email && user.password === password);
    if (user) {
      loginWithPassword(user);
      navigate("/homepage");
    } else {
      if (!email.trim()) {
        toast.error("Email cannot be empty!");
      }
      if (!password.trim()) {
        toast.error("Password cannot be empty!");
      }
      if (email.length > 30) {
        toast.error("Email must not be exceeded 30 characters!");
      }
      if (password.length > 15) {
        toast.error("Password must not be exceeded 15 characters!");
      } else {
        toast.error("Invalid Email or Password!");
      }
    }
  };

  return (
    <div className="backgroud">
      <div className="loginContainer">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <h3>Email:</h3>
          <input className="loginInput" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <br/>
          <h3>Password:</h3>
          <input className="loginInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <br/>
          <button className="loginButton" type="submit" onClick={handleLogin}>
            Login
          </button>
          <div style={{ marginLeft: '2.4rem'}}>
            <div id="buttonDiv"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
