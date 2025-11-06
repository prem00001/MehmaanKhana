const express = require('express');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { auth } = require('../middleware/auth');
const { createOrder, verifyPayment } = require('../services/paymentService');
const { sendBookingConfirmation, sendBookingSMS } = require('../services/emailService');

const router = express.Router();

// Create payment order
router.post('/create-payment', auth, async (req, res) => {
  try {
    const { bookingId, amount } = req.body;

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

    // Create Razorpay order
    const orderResult = await createOrder(
      amount,
      'INR',
      `booking_${bookingId}`
    );

    if (!orderResult.success) {
      return res.status(400).json({
        success: false,
        message: orderResult.message
      });
    }

    // Update booking with order details
    booking.razorpayOrderId = orderResult.orderId;
    booking.totalAmount = amount;
    await booking.save();

    res.json({
      success: true,
      orderId: orderResult.orderId,
      amount: orderResult.amount,
      currency: orderResult.currency
    });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order'
    });
  }
});

// Verify payment and confirm booking
router.post('/confirm-payment', auth, async (req, res) => {
  try {
    const { bookingId, paymentId, signature } = req.body;

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

    // Verify payment
    const verificationResult = await verifyPayment(
      booking.razorpayOrderId,
      paymentId,
      signature
    );

    if (!verificationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }

    // Confirm the room booking
    const room = await Room.findById(booking.room);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    const confirmSuccess = room.confirmBooking();
    if (!confirmSuccess) {
      return res.status(400).json({
        success: false,
        message: 'Failed to confirm booking'
      });
    }

    await room.save();

    // Update booking status
    booking.status = 'confirmed';
    booking.paymentStatus = 'completed';
    booking.paymentId = paymentId;
    booking.razorpayPaymentId = paymentId;
    await booking.save();

    // Send confirmation emails and SMS
    await sendBookingConfirmation(booking.guestDetails.email, booking);
    await sendBookingSMS(booking.guestDetails.phone, booking);

    res.json({
      success: true,
      message: 'Booking confirmed successfully',
      booking: {
        id: booking._id,
        status: booking.status,
        totalAmount: booking.totalAmount,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut
      }
    });
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to confirm payment'
    });
  }
});

// Get user bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('hotel', 'name city address')
      .populate('room', 'type price facilities')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
});

// Get booking details
router.get('/:bookingId', auth, async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({
      _id: bookingId,
      user: req.user._id
    })
      .populate('hotel', 'name city address rating')
      .populate('room', 'type price facilities description');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Get booking details error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking details'
    });
  }
});

// Cancel booking
router.post('/cancel/:bookingId', auth, async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({
      _id: bookingId,
      user: req.user._id,
      status: { $in: ['confirmed', 'on_hold'] }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or cannot be cancelled'
      });
    }

    // Release the room if it was on hold
    if (booking.status === 'on_hold') {
      const room = await Room.findById(booking.room);
      if (room) {
        room.releaseRoom();
        await room.save();
      }
    }

    // Update booking status
    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking'
    });
  }
});

module.exports = router;
