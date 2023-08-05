import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const MenuBar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleLogOut = (e) => {
    setUser({});
    navigate("/signin");
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Products Management
          </Typography>
          {user.email ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <Button color="inherit" component={Button} onClick={handleLogOut}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/homepage">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/topnews">
                Top News
              </Button>
              <Button color="inherit" component={Link} to="/signin">
                Sign in
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuBar;
