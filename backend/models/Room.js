const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  type: {
    type: String,
    required: [true, 'Room type is required'],
    enum: ['Simple Room', 'Deluxe Room', 'Standard Room']
  },
  price: {
    type: Number,
    required: [true, 'Room price is required'],
    min: [0, 'Price cannot be negative']
  },
  capacity: {
    type: Number,
    required: [true, 'Room capacity is required'],
    min: [1, 'Capacity must be at least 1'],
    max: [10, 'Capacity cannot exceed 10']
  },
  size: {
    type: String,
    required: [true, 'Room size is required']
  },
  view: {
    type: String,
    required: [true, 'Room view is required']
  },
  facilities: [{
    icon: String,
    text: String
  }],
  images: [String],
  description: {
    type: String,
    required: [true, 'Room description is required']
  },
  totalRooms: {
    type: Number,
    default: 3,
    min: [0, 'Total rooms cannot be negative']
  },
  availableRooms: {
    type: Number,
    default: 3,
    min: [0, 'Available rooms cannot be negative']
  },
  onHoldRooms: {
    type: Number,
    default: 0,
    min: [0, 'On hold rooms cannot be negative']
  },
  isActive: {
    type: Boolean,
    default: true
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

// Update available rooms when total rooms change
roomSchema.pre('save', function(next) {
  if (this.isModified('totalRooms')) {
    this.availableRooms = this.totalRooms - this.onHoldRooms;
  }
  this.updatedAt = Date.now();
  next();
});

// Virtual for checking if room is available
roomSchema.virtual('isAvailable').get(function() {
  return this.availableRooms > 0;
});

// Method to hold a room
roomSchema.methods.holdRoom = function() {
  if (this.availableRooms > 0) {
    this.availableRooms -= 1;
    this.onHoldRooms += 1;
    return true;
  }
  return false;
};

// Method to release a held room
roomSchema.methods.releaseRoom = function() {
  if (this.onHoldRooms > 0) {
    this.availableRooms += 1;
    this.onHoldRooms -= 1;
    return true;
  }
  return false;
};

// Method to confirm booking (convert hold to booking)
roomSchema.methods.confirmBooking = function() {
  if (this.onHoldRooms > 0) {
    this.onHoldRooms -= 1;
    return true;
  }
  return false;
};

module.exports = mongoose.model('Room', roomSchema);
