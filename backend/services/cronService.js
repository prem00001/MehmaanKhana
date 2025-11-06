const cron = require('node-cron');
const Booking = require('../models/Booking');
const Room = require('../models/Room');

// Run every minute to check for expired holds
cron.schedule('* * * * *', async () => {
  try {
    console.log('Checking for expired holds...');
    
    const expiredHolds = await Booking.find({
      status: 'on_hold',
      holdExpiresAt: { $lt: new Date() }
    });

    for (const booking of expiredHolds) {
      // Release the room
      const room = await Room.findById(booking.room);
      if (room) {
        room.releaseRoom();
        await room.save();
      }

      // Update booking status
      booking.status = 'cancelled';
      booking.paymentStatus = 'failed';
      await booking.save();

      console.log(`Released hold for booking ${booking._id}`);
    }

    if (expiredHolds.length > 0) {
      console.log(`Released ${expiredHolds.length} expired holds`);
    }
  } catch (error) {
    console.error('Cron job error:', error);
  }
});

// Run every hour to clean up old cancelled bookings
cron.schedule('0 * * * *', async () => {
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const result = await Booking.deleteMany({
      status: 'cancelled',
      createdAt: { $lt: oneWeekAgo }
    });

    if (result.deletedCount > 0) {
      console.log(`Cleaned up ${result.deletedCount} old cancelled bookings`);
    }
  } catch (error) {
    console.error('Cleanup cron job error:', error);
  }
});

module.exports = {};
