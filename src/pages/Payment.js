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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Room prices per night for 2 people
  const roomPrices = {
    "Simple Room": 1299,
    "Deluxe Room": 1799,
    "Family Room": 1999,
    "Luxury Family Room": 2799,
    "Delux Room": 10000, // Keep for backward compatibility
    "Standard Room": 3000, // Keep for backward compatibility
  };

  useEffect(() => {
    if (!city || !room || !checkIn || !checkOut || !guests) {
      navigate("/book-details");
      return;
    }

    // Calculate total nights and cost
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = Math.abs(checkOutDate - checkInDate);
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    setTotalNights(nights);
    setTotalCost(nights * (roomPrices[room] || 1000));

    // ✅ Load Razorpay script with better error handling
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          resolve();
          return;
        }

        if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
          // Script is already loading, wait for it
          const checkRazorpay = setInterval(() => {
            if (window.Razorpay) {
              clearInterval(checkRazorpay);
              resolve();
            }
          }, 100);
          return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          console.log("Razorpay script loaded successfully");
          resolve();
        };
        script.onerror = () => {
          console.error("Failed to load Razorpay script");
          setError("Payment system unavailable. Please try again later.");
          resolve();
        };
        document.head.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, [city, room, checkIn, checkOut, guests, navigate]);

  const handleMockPayment = () => {
    setIsLoading(true);
    setError("");
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      const paymentId = `MOCK_${Date.now()}`;
      alert(`Mock Payment Successful!\n\nBooking Details:\nRoom: ${room}\nCity: ${city}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}\nTotal: ₹${totalCost}\n\nPayment ID: ${paymentId}\n\nNote: This is a demo payment. In production, this would be a real payment.`);
      navigate("/");
    }, 2000);
  };

  const handlePayment = async () => {
    // Clear any previous errors
    setError("");
    
    if (totalCost <= 0) {
      setError("Invalid booking details. Please try again.");
      return;
    }

    // Check if Razorpay is available
    if (!window.Razorpay) {
      setError("Payment system is loading. Please wait a moment and try again.");
      return;
    }

    setIsLoading(true);

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Updated test key
      amount: Math.round(totalCost * 100), // Ensure integer value
      currency: "INR",
      name: "MehmaanKhana Hotel",
      description: `Payment for ${room} in ${city}`,
      image: "https://via.placeholder.com/150x150/f1c40f/000000?text=M",
      order_id: `order_${Date.now()}`, // Add order ID
      handler: function (response) {
        console.log("Payment successful:", response);
        setIsLoading(false);
        alert("Payment Successful! Booking Confirmed. Reference ID: " + response.razorpay_payment_id);
        navigate("/");
      },
      modal: {
        ondismiss: function() {
          console.log("Payment modal dismissed");
          setIsLoading(false);
        }
      },
      prefill: {
        name: "Guest User",
        email: "guest@mehmaankhana.com",
        contact: "9999999999",
      },
      theme: {
        color: "#f1c40f",
      },
      notes: {
        address: "MehmaanKhana Hotel, Udaipur",
        booking_id: `BK${Date.now()}`,
      },
      retry: {
        enabled: true,
        max_count: 3
      },
      timeout: 300, // 5 minutes
      remember_customer: false
    };

    try {
      console.log("Opening Razorpay with options:", options);
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        console.error("Payment failed:", response.error);
        setIsLoading(false);
        setError(`Payment failed: ${response.error.description || 'Unknown error'}`);
      });
      
      rzp1.on('payment.error', function (response) {
        console.error("Payment error:", response.error);
        setIsLoading(false);
        setError(`Payment error: ${response.error.description || 'Something went wrong'}`);
      });
      
      rzp1.open();
    } catch (err) {
      console.error("Razorpay error:", err);
      setIsLoading(false);
      setError("Payment system error. Please try again or contact support.");
    }
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
      <Typography variant="body1" mb={1}><strong>Total Cost:</strong> ₹{totalCost}</Typography>
      <Typography variant="body2" mb={3} color="text.secondary">
        Payment System: {window.Razorpay ? "✅ Ready" : "⏳ Loading..."}
      </Typography>
      
      {/* Debug Information */}
      <Box sx={{ 
        backgroundColor: "rgba(0,0,0,0.1)", 
        padding: 2, 
        borderRadius: 1, 
        mb: 2,
        fontSize: "0.8rem"
      }}>
        <Typography variant="caption" display="block">
          <strong>Debug Info:</strong>
        </Typography>
        <Typography variant="caption" display="block">
          Razorpay Available: {window.Razorpay ? "Yes" : "No"}
        </Typography>
        <Typography variant="caption" display="block">
          Total Amount: ₹{totalCost} ({Math.round(totalCost * 100)} paise)
        </Typography>
        <Typography variant="caption" display="block">
          Room Type: {room}
        </Typography>
        <Typography variant="caption" display="block">
          Price per night: ₹{roomPrices[room] || "Unknown"}
        </Typography>
      </Box>
      
      {error && (
        <Typography variant="body2" color="error" mb={2} textAlign="center">
          {error}
        </Typography>
      )}
      
      <Box display="flex" flexDirection="column" gap={2} alignItems="center">
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handlePayment}
          disabled={isLoading}
          sx={{ minWidth: 120 }}
        >
          {isLoading ? "Processing..." : "Pay with Razorpay"}
        </Button>
        
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleMockPayment}
          disabled={isLoading}
          sx={{ minWidth: 120 }}
        >
          {isLoading ? "Processing..." : "Demo Payment (Mock)"}
        </Button>
        
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          onClick={() => {
            alert(`Booking Details:\nRoom: ${room}\nCity: ${city}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}\nTotal: ₹${totalCost}\n\nFor offline payment, contact: +91 99822 96888`);
            navigate("/");
          }}
          sx={{ minWidth: 120 }}
        >
          Contact for Offline Payment
        </Button>
      </Box>
    </Box>
  );
}

export default Payment;
