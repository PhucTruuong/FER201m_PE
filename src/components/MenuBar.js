import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
// import Logout from "../pages/Logout";

const MenuBar = ({ user, handleLogOut}) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Products Management
          </Typography>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/homepage">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/topnews">
                Top News
              </Button>
              {Object.keys(user).length !== 0 && (
                <button onClick={handleLogOut}>Log out</button>
              )}
            </>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuBar;