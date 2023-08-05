import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate} from "react-router-dom";
import "../css/login.css";
// import { GoogleLogin } from "@react-oauth/google";
// import SignInGoogle from "../components/SignInGoogle";

const URL = "https://64b1f3c9062767bc4826b53c.mockapi.io/api/v1/signinInformation";

const Signin = ({ setIsLoggedIn }) => {
  const [loginData, setLoginData] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleLoginGoogle = (response) => {
  //   console.log(response);

  // };
  // const errorMessage = (error) => {
  //   console.log(error);
  // };

  useEffect(() => {
    getLoginData();
  }, []);

  const getLoginData = async () => {
    try {
      const res = await axios.get(URL);
        if (res.status === 200) {
          setLoginData(res.data);
        }
    } 
    catch (error) {
      console.error("Error fetching login data:", error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = loginData.find((user) => user.userName === userName && user.password === password);
    if (user) {
      navigate("/homepage");
      setIsLoggedIn(true);
    } 
    else {
      if (!userName.trim()) {
        toast.error("Username cannot be empty!");
      }
      if (!password.trim()) {
        toast.error("Password cannot be empty!");
      }
      if(password.length > 10){
        toast.error("Username must not be exceeded 15 characters!");
      } 
      if(userName.length > 15){
        toast.error("Password must not be exceeded 10 characters!");
      } 
      else {
        toast.error("Invalid Username or Password!");
      }
    }
  };

  return (
    // Sign in information below:
    // [
    //     {
    //       "userName": "phuctqhse171472",      
    //       "password": "123456",
    //       "id": "1"
    //     },
    //     {
    //       "userName": "aBoutoFail%",
    //       "password": "itIs!te{}",
    //       "id": "2"
    //     }
    // ]
    <div className="backgroud">
      <div className="loginContainer">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <h3>Username:</h3>
          <input className="loginInput" type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
          <br />
          <h3>Password:</h3>
          <input className="loginInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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

