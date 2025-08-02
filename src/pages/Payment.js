import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const city = searchParams.get("city");
  const room = searchParams.get("room");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");

  const [totalNights, setTotalNights] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // Room prices per night for 2 people
  const roomPrices = {
    "Deluxe Room": 5000,
    "Suite Room": 10000,
    "Standard Room": 3000,
  };

  useEffect(() => {
    if (!city || !room || !checkIn || !checkOut || !guests) {
      navigate("/BookDetails");
    }

    // Calculate total nights and cost
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = Math.abs(checkOutDate - checkInDate);
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    setTotalNights(nights);
    setTotalCost(nights * roomPrices[room]);

    // ✅ Dynamically load the Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded");
    document.body.appendChild(script);
  }, [city, room, checkIn, checkOut, guests, navigate]);

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please try again.");
      return;
    }

    const options = {
      key: "rzp_test_GesLPse3hVMfK2", // Replace with your Razorpay API Key
      amount: totalCost * 100, // Razorpay accepts amount in paise
      currency: "INR",
      name: "Hotel Booking",
      description: `Payment for ${room} in ${city}`,
      handler: function (response) {
        alert("Payment Successful! Booking Confirmed.");
        navigate("/");
      },
      prefill: {
        name: "Prem",
        email: "prem@gmail.com",
        contact: "9982296884",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <Box
      sx={{
        backgroundImage: `url('https://i.pinimg.com/736x/b5/10/96/b510964277dd12aad1ebd47d1ba8591d.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Confirm Your Payment
      </Typography>
      <Typography variant="body1" mb={1}><strong>City:</strong> {city}</Typography>
      <Typography variant="body1" mb={1}><strong>Room Type:</strong> {room}</Typography>
      <Typography variant="body1" mb={1}><strong>Check-in:</strong> {checkIn}</Typography>
      <Typography variant="body1" mb={1}><strong>Check-out:</strong> {checkOut}</Typography>
      <Typography variant="body1" mb={1}><strong>Guests:</strong> {guests}</Typography>
      <Typography variant="body1" mb={1}><strong>Total Nights:</strong> {totalNights}</Typography>
      <Typography variant="body1" mb={3}><strong>Total Cost:</strong> ₹{totalCost}</Typography>
      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={handlePayment}
      >
        Pay Now
      </Button>
    </Box>
  );
}

export default Payment;
