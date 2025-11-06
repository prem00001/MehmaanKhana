import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, TextField, Card, CardMedia, CardContent, Container } from "@mui/material";

function Home() {
    const navigate = useNavigate();
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("");

    const mainLocations = [
        {
            city: "Chandigarh",
            image: "https://i.pinimg.com/736x/a6/52/10/a652107e4a306d207e236fb847e7ff44.jpg",
            description: "The City Beautiful - Modern architecture meets traditional charm"
        },
        {
            city: "Delhi",
            image: "https://i.pinimg.com/736x/dc/b0/64/dcb064d2adb85ca6cc82a7be246b7c5e.jpg",
            description: "Capital city with rich history and vibrant culture"
        },
        {
            city: "Mumbai",
            image: "https://i.pinimg.com/736x/c6/ce/22/c6ce22ead6f09147647963600bfed645.jpg",
            description: "City of Dreams - Where business meets Bollywood glamour"
        }
    ];

    const additionalLocations = [
        { city: "Bangalore", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&h=200&fit=crop", description: "Garden City & IT Hub" },
        { city: "Hyderabad", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&h=200&fit=crop", description: "City of Pearls & Biryani" },
        { city: "Chennai", image: "https://images.unsplash.com/photo-1581858726788-75f3423b721b?w=300&h=200&fit=crop", description: "Cultural Capital of South" },
        { city: "Kolkata", image: "https://images.unsplash.com/photo-1581858726788-75f3423b721b?w=300&h=200&fit=crop", description: "City of Joy & Literature" },
        { city: "Pune", image: "https://images.unsplash.com/photo-1581858726788-75f3423b721b?w=300&h=200&fit=crop", description: "Oxford of the East" },
        { city: "Jaipur", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&h=200&fit=crop", description: "Pink City & Royal Heritage" },
        { city: "Ahmedabad", image: "https://images.unsplash.com/photo-1581858726788-75f3423b721b?w=300&h=200&fit=crop", description: "Manchester of India" },
        { city: "Kochi", image: "https://images.unsplash.com/photo-1581858726788-75f3423b721b?w=300&h=200&fit=crop", description: "Queen of Arabian Sea" },
        { city: "Goa", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&h=200&fit=crop", description: "Beach Paradise" },
        { city: "Udaipur", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&h=200&fit=crop", description: "City of Lakes" }
    ];

    const featuredRoom = {
        img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        title: "Luxury Family Room",
        description: "Experience ultimate comfort with our premium room featuring modern amenities and stunning views"
    };

    const handleCheckAvailability = () => {
        if (!checkIn || !checkOut || !guests) {
            alert("Please fill in all fields to check availability");
            return;
        }
        navigate("/booking");
    };

    const handleBookNow = () => {
        navigate("/booking");
    };

    const handleLocationClick = (city) => {
        navigate(`/rooms?city=${city}`);
    };

    const handleLoadMore = () => {
        navigate("/rooms");
    };
      

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: "80vh",
          backgroundImage: "url('images/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          position: "relative",
          '&::before': {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1
          }
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography variant="h2" fontWeight="bold">Welcome at MehmaanKhana</Typography>
          <Typography variant="h5" mt={2} maxWidth={600} mx="auto">
            Experience the ultimate luxury and comfort with our world-class hospitality.
          </Typography>
          <Box 
            mt={4} 
            display="flex" 
            justifyContent="center" 
            gap={2} 
            flexWrap="wrap"
            sx={{ 
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center'
            }}
          >
            <TextField 
              type="date" 
              variant="outlined" 
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1, minWidth: { xs: 200, sm: 150 }, width: { xs: '100%', sm: 'auto' } }} 
            />
            <TextField 
              type="date" 
              variant="outlined" 
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1, minWidth: { xs: 200, sm: 150 }, width: { xs: '100%', sm: 'auto' } }} 
            />
            <TextField 
              type="number" 
              variant="outlined" 
              placeholder="Guests" 
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1, minWidth: { xs: 200, sm: 120 }, width: { xs: '100%', sm: 'auto' } }} 
            />
            <Button 
              variant="contained" 
              color="warning" 
              size="large"
              onClick={handleCheckAvailability}
            >
              Check Availability
            </Button>
          </Box>
        </Box>
      </Box>
      
      {/* Locations Section */}
      <Container sx={{ py: 10 }}>
        <Typography variant="h3" textAlign="center" mb={2}>We Are Available In These Cities</Typography>
        <Typography variant="h6" textAlign="center" mb={5} color="text.secondary">
          Experience luxury hospitality across India's most beautiful destinations
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {mainLocations.map((location, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  transition: "0.3s", 
                  cursor: "pointer",
                  '&:hover': { transform: "scale(1.05)" },
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
                }}
                onClick={() => handleLocationClick(location.city)}
              >
                <CardMedia 
                  component="img" 
                  height="250" 
                  image={location.image} 
                  alt={location.city}
                  sx={{ '&:hover': { opacity: 0.9 } }}
                />
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" textAlign="center" mb={1}>
                    {location.city}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    {location.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Additional Locations Scroll List */}
      <Container sx={{ py: 8, backgroundColor: "#f8f9fa" }}>
        <Typography variant="h4" textAlign="center" mb={2}>More Destinations</Typography>
        <Typography variant="h6" textAlign="center" mb={5} color="text.secondary">
          Discover our hotels in other amazing cities across India
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 3,
            pb: 2,
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c1c1c1',
              borderRadius: 4,
              '&:hover': {
                backgroundColor: '#a8a8a8',
              },
            },
          }}
        >
          {additionalLocations.map((location, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 280,
                maxWidth: 280,
                transition: "0.3s",
                cursor: "pointer",
                '&:hover': { 
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 25px rgba(0,0,0,0.15)"
                },
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)"
              }}
              onClick={() => handleLocationClick(location.city)}
            >
              <CardMedia
                component="img"
                height="180"
                image={location.image}
                alt={location.city}
                sx={{ '&:hover': { opacity: 0.9 } }}
              />
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight="bold" textAlign="center" mb={1}>
                  {location.city}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  {location.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Scroll horizontally to see more destinations
          </Typography>
          <Button 
            variant="outlined" 
            color="primary"
            onClick={() => navigate("/booking")}
            sx={{ px: 4 }}
          >
            View All Locations
          </Button>
        </Box>
      </Container>

      {/* Featured Room Section */}
      <Container sx={{ py: 10, backgroundColor: "#f8f9fa" }}>
        <Typography variant="h3" textAlign="center" mb={5}>Featured Room</Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: "15px", overflow: "hidden", boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}>
              <CardMedia 
                component="img" 
                height="400" 
                image={featuredRoom.img} 
                alt={featuredRoom.title}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ pl: { xs: 0, md: 4 } }}>
              <Typography variant="h4" fontWeight="bold" mb={2}>
                {featuredRoom.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={4} sx={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
                {featuredRoom.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={4}>
                • King Size Bed with Premium Linens<br/>
                • Two-Facing Balcony with Lake & Mountain Views<br/>
                • Jacuzzi Bathroom with Luxury Amenities<br/>
                • 55" Ultra HD Smart TV<br/>
                • Premium Mini Bar & Room Service<br/>
                • Pool Access & Concierge Service
              </Typography>
              <Button 
                variant="contained" 
                color="warning" 
                size="large"
                onClick={handleBookNow}
                sx={{ px: 4, py: 1.5 }}
              >
                Book Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
