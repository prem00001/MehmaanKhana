const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail, sendBookingConfirmation } = require('../services/emailService');
const { sendOTP } = require('../services/smsService');
const { validateUserRegistration, validateUserLogin, validatePhoneOTP } = require('../middleware/validation');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Register with email
router.post('/register', validateUserRegistration, async (req, res) => {
  try {
    const { name, email, phone, age, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      phone,
      age,
      password
    });

    // Generate email verification token
    const token = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email
    await sendVerificationEmail(email, token);

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check your email for verification.',
      userId: user._id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

// Verify email
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Email verification failed'
    });
  }
});

// Send phone OTP
router.post('/send-phone-otp', async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with this phone number'
      });
    }

    const otp = user.generatePhoneOTP();
    await user.save();

    // Send OTP via SMS
    const smsResult = await sendOTP(phone, otp);

    res.json({
      success: true,
      message: 'OTP sent successfully',
      smsResult
    });
  } catch (error) {
    console.error('OTP sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP'
    });
  }
});

// Verify phone OTP
router.post('/verify-phone-otp', validatePhoneOTP, async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ 
      phone,
      phoneVerificationOTP: otp,
      otpExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    user.isPhoneVerified = true;
    user.phoneVerificationOTP = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Phone verified successfully'
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'OTP verification failed'
    });
  }
});

// Login
router.post('/login', validateUserLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    if (!user.isEmailVerified) {
      return res.status(401).json({
        success: false,
        message: 'Please verify your email first'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isPhoneVerified: user.isPhoneVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
});

module.exports = router;
