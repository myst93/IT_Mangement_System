// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors())

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
  app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server listening on http://0.0.0.0:${PORT}`);
});
});

