// seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI;

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB for seeding');

    // Check if an admin already exists
    const existingAdmin = await User.findOne({ role: 'IT_Admin' });
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists');
      process.exit(0);
    }

    // Create the admin user
    const hashedPassword = await bcrypt.hash('admin123', 10); // Replace 'admin123' with a strong password
    const admin = new User({
      username: 'admin',
      password: hashedPassword,
      role: 'IT_Admin',
      fullName: 'System Administrator',
      designation: 'IT Admin',
    });

    await admin.save();
    console.log('✅ Admin user created:', admin);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
    process.exit(1);
  }
}

seedAdmin();