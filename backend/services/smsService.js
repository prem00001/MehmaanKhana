let client = null;
try {
  const hasCreds = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER;
  if (hasCreds) {
    const twilio = require('twilio');
    client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  } else {
    console.warn('Twilio not configured. SMS features are disabled.');
  }
} catch (e) {
  console.warn('Twilio initialization failed. SMS features are disabled.');
}

const sendOTP = async (phone, otp) => {
  try {
    if (!client) {
      return { success: false, message: 'SMS disabled (Twilio not configured)' };
    }
    const message = await client.messages.create({
      body: `Your MehmaanKhana Hotel verification code is: ${otp}. This code will expire in 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone}`
    });

    return { 
      success: true, 
      message: 'OTP sent successfully',
      messageId: message.sid 
    };
  } catch (error) {
    console.error('SMS sending error:', error);
    return { 
      success: false, 
      message: 'Failed to send OTP' 
    };
  }
};

const sendBookingSMS = async (phone, bookingDetails) => {
  try {
    if (!client) {
      return { success: false, message: 'SMS disabled (Twilio not configured)' };
    }
    const message = await client.messages.create({
      body: `Booking confirmed! ID: ${bookingDetails._id}, Hotel: ${bookingDetails.bookingDetails.hotelName}, Check-in: ${new Date(bookingDetails.checkIn).toLocaleDateString()}, Amount: ₹${bookingDetails.totalAmount}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone}`
    });

    return { 
      success: true, 
      message: 'Booking SMS sent successfully',
      messageId: message.sid 
    };
  } catch (error) {
    console.error('SMS sending error:', error);
    return { 
      success: false, 
      message: 'Failed to send booking SMS' 
    };
  }
};

module.exports = {
  sendOTP,
  sendBookingSMS
};
