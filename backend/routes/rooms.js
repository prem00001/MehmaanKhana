const express = require('express');
const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');
const { auth } = require('../middleware/auth');
const { validateBooking } = require('../middleware/validation');

const router = express.Router();

// Get all rooms by city
router.get('/city/:city', async (req, res) => {
  try {
    const { city } = req.params;
    
    // Find hotels in the city
    const hotels = await Hotel.find({ 
      city: { $regex: city, $options: 'i' },
      isActive: true 
    });

    if (hotels.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No hotels found in this city'
      });
    }

    const hotelIds = hotels.map(hotel => hotel._id);

    // Find rooms in these hotels
    const rooms = await Room.find({
      hotelId: { $in: hotelIds },
      isActive: true
    }).populate('hotelId', 'name city address rating');

    // Group rooms by type
    const roomsByType = {};
    rooms.forEach(room => {
      if (!roomsByType[room.type]) {
        roomsByType[room.type] = {
          ...room.toObject(),
          hotels: []
        };
      }
      roomsByType[room.type].hotels.push({
        hotelId: room.hotelId._id,
        hotelName: room.hotelId.name,
        address: room.hotelId.address,
        rating: room.hotelId.rating,
        availableRooms: room.availableRooms,
        totalRooms: room.totalRooms
      });
    });

    res.json({
      success: true,
      city,
      rooms: Object.values(roomsByType)
    });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rooms'
    });
  }
});

// Get room details
router.get('/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    
    const room = await Room.findById(roomId)
      .populate('hotelId', 'name city address rating amenities');

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    res.json({
      success: true,
      room
    });
  } catch (error) {
    console.error('Get room details error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch room details'
    });
  }
});

// Hold a room
router.post('/hold', auth, async (req, res) => {
  try {
    const { roomId, hotelId, checkIn, checkOut, guests } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    if (room.availableRooms <= 0) {
      return res.status(400).json({
        success: false,
        message: 'No rooms available'
      });
    }

    // Check for existing hold by same user
    const existingHold = await Booking.findOne({
      user: req.user._id,
      room: roomId,
      status: 'on_hold',
      holdExpiresAt: { $gt: new Date() }
    });

    if (existingHold) {
      return res.status(400).json({
        success: false,
        message: 'You already have a hold on this room'
      });
    }

    // Hold the room
    const holdSuccess = room.holdRoom();
    if (!holdSuccess) {
      return res.status(400).json({
        success: false,
        message: 'Failed to hold room'
      });
    }

    await room.save();

    // Create booking with hold status
    const booking = new Booking({
      user: req.user._id,
      hotel: hotelId,
      room: roomId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests,
      status: 'on_hold',
      holdExpiresAt: new Date(Date.now() + 3 * 60 * 1000), // 3 minutes
      bookingDetails: {
        roomType: room.type,
        city: room.hotelId.city,
        hotelName: room.hotelId.name
      },
      guestDetails: {
        name: req.user.name,
        age: req.user.age,
        phone: req.user.phone,
        email: req.user.email
      }
    });

    await booking.save();

    res.json({
      success: true,
      message: 'Room held successfully',
      bookingId: booking._id,
      holdExpiresAt: booking.holdExpiresAt,
      availableRooms: room.availableRooms
    });
  } catch (error) {
    console.error('Hold room error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to hold room'
    });
  }
});

// Extend hold
router.post('/extend-hold/:bookingId', auth, async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({
      _id: bookingId,
      user: req.user._id,
      status: 'on_hold'
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Hold not found or expired'
      });
    }

    await booking.extendHold();

    res.json({
      success: true,
      message: 'Hold extended successfully',
      holdExpiresAt: booking.holdExpiresAt
    });
  } catch (error) {
    console.error('Extend hold error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to extend hold'
    });
  }
});

// Release hold
router.post('/release-hold/:bookingId', auth, async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({
      _id: bookingId,
      user: req.user._id,
      status: 'on_hold'
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Hold not found'
      });
    }

    // Release the room
    const room = await Room.findById(booking.room);
    if (room) {
      room.releaseRoom();
      await room.save();
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Hold released successfully',
      availableRooms: room.availableRooms
    });
  } catch (error) {
    console.error('Release hold error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to release hold'
    });
  }
});

module.exports = router;
