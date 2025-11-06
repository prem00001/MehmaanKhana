let razorpay = null;
try {
  const hasKeys = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET;
  if (hasKeys) {
    const Razorpay = require('razorpay');
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  } else {
    console.warn('Razorpay not configured. Payment features are disabled.');
  }
} catch (e) {
  console.warn('Razorpay initialization failed. Payment features are disabled.');
}

const createOrder = async (amount, currency = 'INR', receipt) => {
  try {
    if (!razorpay) {
      return { success: false, message: 'Payments disabled (Razorpay not configured)' };
    }
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    return {
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt
    };
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return {
      success: false,
      message: 'Failed to create payment order'
    };
  }
};

const verifyPayment = async (orderId, paymentId, signature) => {
  try {
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(orderId + '|' + paymentId);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === signature) {
      return {
        success: true,
        message: 'Payment verified successfully'
      };
    } else {
      return {
        success: false,
        message: 'Payment verification failed'
      };
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return {
      success: false,
      message: 'Payment verification failed'
    };
  }
};

const capturePayment = async (paymentId, amount) => {
  try {
    if (!razorpay) {
      return { success: false, message: 'Payments disabled (Razorpay not configured)' };
    }
    const payment = await razorpay.payments.capture(paymentId, amount * 100);
    return {
      success: true,
      payment
    };
  } catch (error) {
    console.error('Payment capture error:', error);
    return {
      success: false,
      message: 'Payment capture failed'
    };
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  capturePayment
};
