import React from "react";
import { Box, Typography, Link as MuiLink, Grid, Divider } from "@mui/material";
import { Facebook, Fullscreen, Instagram, Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom"; // ✅ Import Link

function Footer() {
  return (
    <Box component="footer" className="footer" sx={{ backgroundColor: "#f8f9fa", color: "#2c3e50", py: 5 , margin:20 }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Column 1: Support */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight="bold">Support</Typography>
          <Link to="/support" style={{ textDecoration: "none", color: "#2c3e50", display: "block", marginTop: 8 }}>
            COVID-19 FAQs
          </Link>
          <Link to="/support" style={{ textDecoration: "none", color: "#2c3e50", display: "block", marginTop: 8 }}>
            Manage your trips
          </Link>
          <Link to="/support" style={{ textDecoration: "none", color: "#2c3e50", display: "block", marginTop: 8 }}>
            Contact Customer Service
          </Link>
        </Grid>

        {/* Column 2: Discover */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight="bold">Discover</Typography>
          <Link to="/discover" style={{ textDecoration: "none", color: "#2c3e50", display: "block", marginTop: 8 }}>
            Genius loyalty program
          </Link>
          <Link to="/discover" style={{ textDecoration: "none", color: "#2c3e50", display: "block", marginTop: 8 }}>
            Seasonal deals
          </Link>
          <Link to="/discover" style={{ textDecoration: "none", color: "#2c3e50", display: "block", marginTop: 8 }}>
            Travel articles
          </Link>
        </Grid>

        {/* Column 3: Terms and Settings */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight="bold">Terms and Settings</Typography>
          <Link to="/terms-and-settings" style={{ textDecoration: "none", color: "#2c3e50", display: "block", marginTop: 8 }}>
            Privacy & cookies
          </Link>
          <Link to="/terms-and-settings" style={{ textDecoration: "none", color: "#2c3e50", display: "block", marginTop: 8 }}>
            Terms & conditions
          </Link>
        </Grid>

        {/* Column 4: Partners */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight="bold">Partners</Typography>
          <Link to="/partners" style={{ textDecoration: "none", color: "#2c3e50", display: "block", marginTop: 8 }}>
            Extranet login
          </Link>
          <Link to="/partners" style={{ textDecoration: "none", color: "#2c3e50", display: "block", marginTop: 8 }}>
            List your property
          </Link>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: 4 }} />

      {/* Copyright */}
      <Typography variant="body2" textAlign="center">
        © {new Date().getFullYear()} Rovero Hotel. All rights reserved.
      </Typography>

      {/* Social Media Icons */}
      <Box display="flex" justifyContent="center" gap={2} mt={2}>
        <MuiLink href="#" sx={{ color: "#2c3e50" }}>
          <Facebook />
        </MuiLink>
        <MuiLink href="#" sx={{ color: "#2c3e50" }}>
          <Instagram />
        </MuiLink>
        <MuiLink href="#" sx={{ color: "#2c3e50" }}>
          <Twitter />
        </MuiLink>
      </Box>
    </Box>
  );
}

export default Footer;
