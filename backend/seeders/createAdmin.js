require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const email = 'premprakashmotwani@gmail.com';
    const phone = '9999999999';

    let admin = await User.findOne({ email });
    if (admin) {
      console.log('Admin already exists:', email);
    } else {
      admin = new User({
        name: 'Admin',
        email,
        phone,
        age: 30,
        password: 'Crashjee@01',
        isEmailVerified: true,
        isPhoneVerified: true,
        role: 'admin',
      });
      await admin.save();
      console.log('Admin created:', email);
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Failed to create admin:', err);
    process.exit(1);
  }
}

run();


