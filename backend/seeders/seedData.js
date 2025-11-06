const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const User = require('../models/User');

const seedData = async () => {
  try {
    // Clear existing data
    await Hotel.deleteMany({});
    await Room.deleteMany({});
    await User.deleteMany({});

    // Create hotels
    const hotels = [
      {
        name: "MehmaanKhana Chandigarh",
        city: "Chandigarh",
        address: "Sector 17, Chandigarh, 160017",
        coordinates: { lat: 30.7333, lng: 76.7794 },
        description: "Luxury hotel in the heart of Chandigarh with modern amenities",
        amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Parking"],
        images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945"],
        rating: 4.5,
        contact: {
          phone: "+91 9982296888",
          email: "chandigarh@mehmaankhana.com"
        }
      },
      {
        name: "MehmaanKhana Delhi",
        city: "Delhi",
        address: "Connaught Place, New Delhi, 110001",
        coordinates: { lat: 28.6139, lng: 77.2090 },
        description: "Premium hotel in central Delhi with heritage charm",
        amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Parking", "Gym"],
        images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945"],
        rating: 4.7,
        contact: {
          phone: "+91 9982296889",
          email: "delhi@mehmaankhana.com"
        }
      },
      {
        name: "MehmaanKhana Mumbai",
        city: "Mumbai",
        address: "Marine Drive, Mumbai, 400020",
        coordinates: { lat: 19.0760, lng: 72.8777 },
        description: "Luxury hotel overlooking the Arabian Sea",
        amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Parking", "Gym", "Beach Access"],
        images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945"],
        rating: 4.8,
        contact: {
          phone: "+91 9982296890",
          email: "mumbai@mehmaankhana.com"
        }
      }
    ];

    const createdHotels = await Hotel.insertMany(hotels);

    // Create rooms for each hotel
    const roomTypes = [
      {
        type: "Simple Room",
        price: 1299,
        capacity: 2,
        size: "180 sq ft",
        view: "City View",
        facilities: [
          { icon: "bed", text: "Queen Size Bed" },
          { icon: "wifi", text: "Free WiFi" },
          { icon: "ac", text: "Air Conditioning" },
          { icon: "tv", text: "32\" LED TV" },
          { icon: "bathroom", text: "Private Bathroom" },
          { icon: "service", text: "Room Service" }
        ],
        description: "Comfortable and cozy room perfect for budget-conscious travelers"
      },
      {
        type: "Deluxe Room",
        price: 1799,
        capacity: 3,
        size: "280 sq ft",
        view: "Garden View",
        facilities: [
          { icon: "bed", text: "King Size Bed" },
          { icon: "wifi", text: "High-Speed WiFi" },
          { icon: "ac", text: "Climate Control" },
          { icon: "tv", text: "43\" Smart TV" },
          { icon: "bathroom", text: "Marble Bathroom" },
          { icon: "balcony", text: "Private Balcony" },
          { icon: "bar", text: "Mini Bar" },
          { icon: "service", text: "24/7 Room Service" }
        ],
        description: "Spacious and elegantly designed room with premium amenities"
      },
      {
        type: "Standard Room",
        price: 2999,
        capacity: 4,
        size: "350 sq ft",
        view: "Lake & Mountain View",
        facilities: [
          { icon: "bed", text: "King Size Bed + Sofa" },
          { icon: "wifi", text: "Premium WiFi" },
          { icon: "ac", text: "Smart Climate Control" },
          { icon: "tv", text: "55\" Ultra HD TV" },
          { icon: "bathroom", text: "Jacuzzi Bathroom" },
          { icon: "balcony", text: "Two-Facing Balcony" },
          { icon: "bar", text: "Premium Mini Bar" },
          { icon: "pool", text: "Pool Access" },
          { icon: "service", text: "Concierge Service" }
        ],
        description: "Premium room with luxury amenities and stunning views"
      }
    ];

    const rooms = [];
    for (const hotel of createdHotels) {
      for (const roomType of roomTypes) {
        rooms.push({
          hotelId: hotel._id,
          ...roomType,
          totalRooms: 3,
          availableRooms: 3,
          onHoldRooms: 0,
          images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"]
        });
      }
    }

    await Room.insertMany(rooms);

    // Create admin user
    const adminUser = new User({
      name: "Admin User",
      email: "admin@mehmaankhana.com",
      phone: "9999999999",
      age: 30,
      password: "admin123",
      isEmailVerified: true,
      isPhoneVerified: true,
      role: "admin"
    });

    await adminUser.save();

    console.log("✅ Database seeded successfully!");
    console.log(`📊 Created ${createdHotels.length} hotels`);
    console.log(`🏨 Created ${rooms.length} rooms`);
    console.log(`👤 Created admin user`);
  } catch (error) {
    console.error("❌ Seeding error:", error);
  }
};

module.exports = seedData;
