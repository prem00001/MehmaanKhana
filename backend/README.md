# MehmaanKhana Hotel Backend API

A comprehensive backend system for hotel booking with real-time room availability, payment processing, and user management.

## 🚀 Features

### Core Features
- **Room Management**: 3 rooms per type per location initially
- **Hold System**: 3-minute hold with automatic release
- **Real-time Updates**: Socket.io for live room availability
- **Payment Integration**: Razorpay payment gateway
- **User Authentication**: Email/Phone OTP verification
- **Booking Management**: Complete booking lifecycle

### Advanced Features
- **Cron Jobs**: Automatic hold expiration cleanup
- **Email Notifications**: Booking confirmations
- **SMS Integration**: OTP and booking alerts
- **Admin Dashboard**: Complete management system
- **Rate Limiting**: API protection
- **Data Validation**: Comprehensive input validation

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + OTP
- **Payment**: Razorpay
- **Email**: Nodemailer (Gmail)
- **SMS**: Twilio
- **Real-time**: Socket.io
- **Cron Jobs**: node-cron

## 📦 Installation

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Database Setup**
```bash
# Start MongoDB
mongod

# Seed initial data
npm run seed
```

4. **Start Server**
```bash
# Development
npm run dev

# Production
npm start
```

## 🔧 Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/mehmaankhana_hotel

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Email (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Payment (Razorpay)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Frontend
FRONTEND_URL=http://localhost:3000
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify-email` - Email verification
- `POST /api/auth/send-phone-otp` - Send phone OTP
- `POST /api/auth/verify-phone-otp` - Verify phone OTP
- `GET /api/auth/profile` - Get user profile

### Rooms
- `GET /api/rooms/city/:city` - Get rooms by city
- `GET /api/rooms/:roomId` - Get room details
- `POST /api/rooms/hold` - Hold a room
- `POST /api/rooms/extend-hold/:bookingId` - Extend hold
- `POST /api/rooms/release-hold/:bookingId` - Release hold

### Bookings
- `POST /api/bookings/create-payment` - Create payment order
- `POST /api/bookings/confirm-payment` - Confirm payment
- `GET /api/bookings/my-bookings` - Get user bookings
- `GET /api/bookings/:bookingId` - Get booking details
- `POST /api/bookings/cancel/:bookingId` - Cancel booking

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `POST /api/admin/hotels` - Create hotel
- `POST /api/admin/rooms` - Create room
- `GET /api/admin/bookings` - Get all bookings
- `PATCH /api/admin/bookings/:id/status` - Update booking status
- `GET /api/admin/users` - Get all users

## 🏗️ Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  phone: String (unique),
  age: Number,
  password: String (hashed),
  isEmailVerified: Boolean,
  isPhoneVerified: Boolean,
  role: String (user/admin)
}
```

### Hotel
```javascript
{
  name: String,
  city: String,
  address: String,
  coordinates: { lat: Number, lng: Number },
  description: String,
  amenities: [String],
  rating: Number
}
```

### Room
```javascript
{
  hotelId: ObjectId,
  type: String,
  price: Number,
  capacity: Number,
  totalRooms: Number (default: 3),
  availableRooms: Number,
  onHoldRooms: Number,
  facilities: [{ icon: String, text: String }]
}
```

### Booking
```javascript
{
  user: ObjectId,
  hotel: ObjectId,
  room: ObjectId,
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  status: String (pending/on_hold/confirmed/cancelled),
  paymentStatus: String (pending/completed/failed),
  holdExpiresAt: Date,
  totalAmount: Number
}
```

## 🔄 Room Hold System

1. **Hold Room**: User holds room for 3 minutes
2. **Extend Hold**: User can extend hold before expiry
3. **Auto Release**: Cron job releases expired holds
4. **Confirm Booking**: Payment confirmation converts hold to booking
5. **Real-time Updates**: Socket.io notifies room availability changes

## 💳 Payment Flow

1. **Create Order**: Generate Razorpay order
2. **Hold Room**: Room is held during payment
3. **Verify Payment**: Verify Razorpay signature
4. **Confirm Booking**: Update booking status
5. **Send Notifications**: Email and SMS confirmations

## 🚀 Deployment

### Using PM2
```bash
npm install -g pm2
pm2 start server.js --name "hotel-api"
pm2 startup
pm2 save
```

### Using Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📊 Monitoring

- **Health Check**: `GET /api/health`
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Error Logging**: Comprehensive error handling
- **Database Monitoring**: Connection status and queries

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin protection
- **Rate Limiting**: DDoS protection
- **JWT**: Secure authentication
- **Input Validation**: Data sanitization
- **Password Hashing**: bcrypt encryption

## 📈 Performance

- **MongoDB Indexing**: Optimized queries
- **Connection Pooling**: Database efficiency
- **Caching**: Room availability caching
- **Compression**: Response optimization

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## 📝 Scripts

```json
{
  "start": "node server.js",
  "dev": "nodemon server.js",
  "seed": "node seeders/runSeeder.js",
  "test": "jest"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support, email support@mehmaankhana.com or call +91 99822 96888
