import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  console.log(user.email);

  const handleLogOut = () => {
    logOut();
    navigate("/signin");
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Products Management
          </Typography>

          {user?.name && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome {user.name}
            </Typography>
          )}

          {user?.email ? (
            <>
              <Button color="inherit" component={Link} to="/homepage">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <Button color="inherit" component={Link} to="/topnews">
                Top News
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
