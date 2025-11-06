import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Container, MenuItem } from "@mui/material";

const topCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad",
  "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
  "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane",
  "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara"
];

function BookDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const cityFromParams = searchParams.get("city");
  const room = searchParams.get("room");

  const [city, setCity] = useState(cityFromParams || "");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!city) newErrors.city = "Please select a city";
    if (!checkIn) newErrors.checkIn = "Please select check-in date";
    if (!checkOut) newErrors.checkOut = "Please select check-out date";
    if (!guests || guests < 1) newErrors.guests = "Please enter number of guests";
    
    // Check if check-out is after check-in
    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
      newErrors.checkOut = "Check-out date must be after check-in date";
    }
    
    // Check if check-in is not in the past
    if (checkIn && new Date(checkIn) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.checkIn = "Check-in date cannot be in the past";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (validateForm()) {
      navigate(`/payment?city=${city}&room=${room}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url('https://i.pinimg.com/736x/7f/6f/0a/7f6f0a8668aa2da61d9025859406e2f1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
          Booking Details
        </Typography>
        <Typography variant="h6" textAlign="center" mb={1}>
          Room: {room}
        </Typography>

        {/* City Dropdown */}
        {cityFromParams === "null" || city === "" ? (
          <TextField
            select
            label="Select City"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={!!errors.city}
            helperText={errors.city}
            sx={{ mb: 2 }}
          >
            {topCities.map((cityOption) => (
              <MenuItem key={cityOption} value={cityOption}>
                {cityOption}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <Typography variant="h6" textAlign="center" mb={3}>
            City: {city}
          </Typography>
        )}

        <TextField
          label="Check-in Date"
          type="date"
          fullWidth
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          error={!!errors.checkIn}
          helperText={errors.checkIn}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Check-out Date"
          type="date"
          fullWidth
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          error={!!errors.checkOut}
          helperText={errors.checkOut}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Number of Guests"
          type="number"
          fullWidth
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          error={!!errors.guests}
          helperText={errors.guests}
          inputProps={{ min: 1, max: 10 }}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="warning"
          fullWidth
          size="large"
          onClick={handlePayment}
        >
          Proceed to Payment
        </Button>
      </Container>
    </Box>
  );
}

export default BookDetails;
