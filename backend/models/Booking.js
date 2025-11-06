const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  checkIn: {
    type: Date,
    required: [true, 'Check-in date is required']
  },
  checkOut: {
    type: Date,
    required: [true, 'Check-out date is required']
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: [1, 'At least 1 guest required'],
    max: [10, 'Maximum 10 guests allowed']
  },
  totalNights: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'on_hold', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMode: {
    type: String,
    enum: ['razorpay', 'offline', 'cash'],
    default: 'razorpay'
  },
  paymentId: String,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  holdExpiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 3 * 60 * 1000); // 3 minutes from now
    }
  },
  bookingDetails: {
    roomType: String,
    city: String,
    hotelName: String
  },
  guestDetails: {
    name: String,
    age: Number,
    phone: String,
    email: String
  },
  specialRequests: String,
  cancellationPolicy: {
    canCancel: {
      type: Boolean,
      default: true
    },
    cancellationFee: {
      type: Number,
      default: 0
    },
    cancellationDeadline: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate total nights before saving
bookingSchema.pre('save', function(next) {
  if (this.checkIn && this.checkOut) {
    const timeDiff = Math.abs(this.checkOut - this.checkIn);
    this.totalNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }
  this.updatedAt = Date.now();
  next();
});

// Virtual for checking if booking is on hold and expired
bookingSchema.virtual('isHoldExpired').get(function() {
  return this.status === 'on_hold' && new Date() > this.holdExpiresAt;
});

// Method to extend hold time
bookingSchema.methods.extendHold = function() {
  this.holdExpiresAt = new Date(Date.now() + 3 * 60 * 1000);
  return this.save();
};

// Method to confirm booking
bookingSchema.methods.confirmBooking = function() {
  this.status = 'confirmed';
  this.paymentStatus = 'completed';
  return this.save();
};

// Method to cancel booking
bookingSchema.methods.cancelBooking = function() {
  this.status = 'cancelled';
  return this.save();
};

module.exports = mongoose.model('Booking', bookingSchema);
