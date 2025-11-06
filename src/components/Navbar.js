import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#2c3e50", padding: "10px 0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo */}
        <Box display="flex" alignItems="center">
          <HotelIcon fontSize="large" sx={{ marginRight: 1, color: "#f1c40f" }} />
          <Typography variant="h5" fontWeight="bold">
          MehmaanKhana
          </Typography>
        </Box>

        {/* Center: Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {[
            { name: "Home", path: "/" },
            { name: "Rooms", path: "/rooms" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" }
          ].map((item) => (
            <Button
              key={item.name}
              component={Link}
              to={item.path}
              sx={{ color: "white", fontSize: "16px" }}
            >
              {item.name}
            </Button>
          ))}
        </Box>

        {/* Right: Login & Book Now */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button component={Link} to="/login" variant="outlined" color="inherit">
            Sign In
          </Button>
          <Button
            component={Link} to="/booking"
            variant="contained"
            sx={{ backgroundColor: "#f1c40f", color: "black" }}
          >
            Book Now
          </Button>
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton sx={{ display: { md: "none" }, color: "white" }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
