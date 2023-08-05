import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ mt: "auto", p: 2, backgroundColor: "#1976d2", color: "white" }}
    >
      <Typography align="center">Products Management</Typography>
    </Box>
  );
};

export default Footer;
