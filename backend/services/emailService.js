const nodemailer = require('nodemailer');

const createTransporter = () => {
  const hasEmail = process.env.EMAIL_USER && process.env.EMAIL_PASS;
  if (!hasEmail) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      return { success: false, message: 'Email disabled (not configured)' };
    }
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email - MehmaanKhana Hotel',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f1c40f;">Welcome to MehmaanKhana Hotel!</h2>
          <p>Thank you for registering with us. Please verify your email address to complete your registration.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #f1c40f; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            If you didn't create an account with us, please ignore this email.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Verification email sent successfully' };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, message: 'Failed to send verification email' };
  }
};

const sendBookingConfirmation = async (email, bookingDetails) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      return { success: false, message: 'Email disabled (not configured)' };
    }
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Booking Confirmed - MehmaanKhana Hotel',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f1c40f;">Booking Confirmed!</h2>
          <p>Dear ${bookingDetails.guestDetails.name},</p>
          <p>Your booking has been confirmed. Here are the details:</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3>Booking Details</h3>
            <p><strong>Booking ID:</strong> ${bookingDetails._id}</p>
            <p><strong>Hotel:</strong> ${bookingDetails.bookingDetails.hotelName}</p>
            <p><strong>City:</strong> ${bookingDetails.bookingDetails.city}</p>
            <p><strong>Room Type:</strong> ${bookingDetails.bookingDetails.roomType}</p>
            <p><strong>Check-in:</strong> ${new Date(bookingDetails.checkIn).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> ${new Date(bookingDetails.checkOut).toLocaleDateString()}</p>
            <p><strong>Guests:</strong> ${bookingDetails.guests}</p>
            <p><strong>Total Nights:</strong> ${bookingDetails.totalNights}</p>
            <p><strong>Total Amount:</strong> ₹${bookingDetails.totalAmount}</p>
          </div>
          
          <p>Thank you for choosing MehmaanKhana Hotel. We look forward to hosting you!</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            For any queries, contact us at +91 99822 96888
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Booking confirmation email sent' };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, message: 'Failed to send confirmation email' };
  }
};

module.exports = {
  sendVerificationEmail,
  sendBookingConfirmation
};
