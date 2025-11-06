import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Modal,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PoolIcon from '@mui/icons-material/Pool';
import BalconyIcon from '@mui/icons-material/Balcony';
import KingBedIcon from '@mui/icons-material/KingBed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import RoomServiceIcon from '@mui/icons-material/RoomService';

const rooms = [
  {
    type: "Simple Room",
    image: "https://i.pinimg.com/736x/76/f9/22/76f9226619b99ab7c61345993a4c9475.jpg",
    price: "1299/night",
    description: "Comfortable and cozy room perfect for budget-conscious travelers. Features modern amenities and a clean, minimalist design.",
    facilities: [
      { icon: <KingBedIcon />, text: "Queen Size Bed" },
      { icon: <WifiIcon />, text: "Free WiFi" },
      { icon: <AcUnitIcon />, text: "Air Conditioning" },
      { icon: <TvIcon />, text: "32\" LED TV" },
      { icon: <BathtubIcon />, text: "Private Bathroom" },
      { icon: <RoomServiceIcon />, text: "Room Service" }
    ],
    size: "180 sq ft",
    capacity: "2 Guests",
    view: "City View"
  },
  {
    type: "Deluxe Room",
    image: "https://i.pinimg.com/736x/53/a9/37/53a937cdf862da224a40f7c2cab72f75.jpg",
    price: "1799/night",
    description: "Spacious and elegantly designed room with premium amenities. Perfect for business travelers and couples seeking comfort.",
    facilities: [
      { icon: <KingBedIcon />, text: "King Size Bed" },
      { icon: <WifiIcon />, text: "High-Speed WiFi" },
      { icon: <AcUnitIcon />, text: "Climate Control" },
      { icon: <TvIcon />, text: "43\" Smart TV" },
      { icon: <BathtubIcon />, text: "Marble Bathroom" },
      { icon: <BalconyIcon />, text: "Private Balcony" },
      { icon: <RestaurantIcon />, text: "Mini Bar" },
      { icon: <RoomServiceIcon />, text: "24/7 Room Service" }
    ],
    size: "280 sq ft",
    capacity: "3 Guests",
    view: "Garden View"
  },
  {
    type: "Standard Room",
    image: "https://i.pinimg.com/736x/76/f9/22/76f9226619b99ab7c61345993a4c9475.jpg",
    price: "2999/night",
    description: "Premium room with luxury amenities and stunning views. Features contemporary design with traditional hospitality touches.",
    facilities: [
      { icon: <KingBedIcon />, text: "King Size Bed + Sofa" },
      { icon: <WifiIcon />, text: "Premium WiFi" },
      { icon: <AcUnitIcon />, text: "Smart Climate Control" },
      { icon: <TvIcon />, text: "55\" Ultra HD TV" },
      { icon: <BathtubIcon />, text: "Jacuzzi Bathroom" },
      { icon: <BalconyIcon />, text: "Two-Facing Balcony" },
      { icon: <RestaurantIcon />, text: "Premium Mini Bar" },
      { icon: <PoolIcon />, text: "Pool Access" },
      { icon: <RoomServiceIcon />, text: "Concierge Service" }
    ],
    size: "350 sq ft",
    capacity: "4 Guests",
    view: "Lake & Mountain View"
  },
];

function Rooms() {
  const navigate = useNavigate();
  const location = useLocation();
  const city = new URLSearchParams(location.search).get("city");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleBookNow = (roomType) => {
    navigate(`/book-details?city=${city}&room=${roomType}`);
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRoom(null);
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" textAlign="center" mb={3}>
        {city ? `Available Rooms in ${city}` : "Available Rooms"}
      </Typography>
      {city && (
        <Typography variant="h6" textAlign="center" mb={4} color="text.secondary">
          Experience luxury hospitality in the heart of {city}
        </Typography>
      )}
      <Typography variant="body1" textAlign="center" mb={4} color="text.secondary">
        Click on room images to view detailed facilities and amenities
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {rooms.map((room, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s",
                '&:hover': { transform: "scale(1.02)" },
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={room.image}
                alt={room.type}
                sx={{ 
                  cursor: "pointer",
                  '&:hover': { 
                    opacity: 0.8,
                    transform: "scale(1.02)"
                  },
                  transition: "all 0.3s ease"
                }}
                onClick={() => handleRoomClick(room)}
                title="Click to view room details"
              />
              <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" fontWeight="bold" mb={1}>
                  {room.type}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {room.description}
                </Typography>
                
                <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                  <Chip label={room.size} size="small" color="primary" />
                  <Chip label={room.capacity} size="small" color="secondary" />
                  <Chip label={room.view} size="small" color="success" />
                </Box>
                
                <Typography variant="h6" color="primary" fontWeight="bold" mb={2}>
                  ₹{room.price}
                </Typography>
                
                <Box sx={{ mt: "auto" }}>
                  <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    onClick={() => handleBookNow(room.type)}
                  >
                    Book Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Room Details Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="room-details-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 24,
            maxWidth: 600,
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}
        >
          {selectedRoom && (
            <>
              <IconButton
                onClick={handleCloseModal}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  zIndex: 1,
                  backgroundColor: 'rgba(255,255,255,0.8)'
                }}
              >
                <CloseIcon />
              </IconButton>
              
              <CardMedia
                component="img"
                height="300"
                image={selectedRoom.image}
                alt={selectedRoom.type}
              />
              
              <Box sx={{ p: 3 }}>
                <Typography variant="h4" fontWeight="bold" mb={2}>
                  {selectedRoom.type}
                </Typography>
                
                <Typography variant="body1" color="text.secondary" mb={3}>
                  {selectedRoom.description}
                </Typography>
                
                <Box display="flex" gap={2} mb={3} flexWrap="wrap">
                  <Chip 
                    label={`Size: ${selectedRoom.size}`} 
                    color="primary" 
                    variant="outlined"
                  />
                  <Chip 
                    label={`Capacity: ${selectedRoom.capacity}`} 
                    color="secondary" 
                    variant="outlined"
                  />
                  <Chip 
                    label={`View: ${selectedRoom.view}`} 
                    color="success" 
                    variant="outlined"
                  />
                </Box>
                
                <Typography variant="h5" color="primary" fontWeight="bold" mb={3}>
                  ₹{selectedRoom.price}
                </Typography>
                
                <Divider sx={{ mb: 3 }} />
                
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Room Facilities & Amenities
                </Typography>
                
                <List>
                  {selectedRoom.facilities.map((facility, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                        {facility.icon}
                      </ListItemIcon>
                      <ListItemText primary={facility.text} />
                    </ListItem>
                  ))}
                </List>
                
                <Box display="flex" gap={2} mt={3}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleCloseModal}
                    sx={{ flex: 1 }}
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      handleCloseModal();
                      handleBookNow(selectedRoom.type);
                    }}
                    sx={{ flex: 1 }}
                  >
                    Book This Room
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default Rooms;
