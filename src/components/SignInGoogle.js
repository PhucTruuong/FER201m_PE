import React, {useState, useEffect} from 'react';
import jwt_decode from "jwt-decode";

const SignInGoogle = () => {
  const [user, setUser] = useState({});
  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    var decoded = jwt_decode(response.credential);
    setUser(decoded);
    document.getElementById("buttonDiv").hidden = true;
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
    <>
      <div id="buttonDiv"></div>
      {Object.keys(user).length !== 0 && (
        <button onClick={handleLogOut}>logout</button>
      )}
      {user && (
        <div>
          <h5>{user.name}</h5>
        </div>
      )}
    </>
  );
};

export default SignInGoogle;