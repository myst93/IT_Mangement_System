const auth = require('../middlewares/authMiddleware');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'IT_Admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

// POST /api/users - Create a new user (Admin only)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const { username, password, role, fullName, designation } = req.body;

    if (!username || !password || !role || !fullName || !designation) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = new User({
      username,
      password: hashedPassword,
      role,
      fullName,
      designation,
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/users/login - User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'default_secret', // Fallback if env var not set
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        username: user.username,
        role: user.role,
        fullName: user.fullName,
        designation: user.designation,
      },
    });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
