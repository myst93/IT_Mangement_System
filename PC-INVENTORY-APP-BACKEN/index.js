// index.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');

// Routes
app.use('/api/users', userRoutes);

const pcRoutes = require('./routes/pcRoutes');
app.use('/api/pcs', pcRoutes);


// Root test route
app.get('/', (req, res) => {
  res.send('PC Inventory App API is live and MongoDB is connected!');
});

// Connect to DB and start server (same as before)
const { PORT = 3000, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
});
