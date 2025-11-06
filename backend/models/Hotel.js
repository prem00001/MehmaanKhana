const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hotel name is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  coordinates: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  description: {
    type: String,
    required: [true, 'Hotel description is required']
  },
  amenities: [String],
  images: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  contact: {
    phone: {
      type: String,
      required: [true, 'Contact phone is required']
    },
    email: {
      type: String,
      required: [true, 'Contact email is required']
    }
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

hotelSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Hotel', hotelSchema);
