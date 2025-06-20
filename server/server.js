const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Route files
const userAuthRoutes = require('./routes/userRoute');       // handles /signup, /login
const userProfileRoutes = require('./routes/users');        // handles /users/:id (profile)
const bookRoutes = require('./routes/books');               // book APIs
const reviewRoutes = require('./routes/reviews');           // review APIs
const uploadRoutes = require('./routes/uploadRoutes.js');   // image/file uploads

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form submissions

// Serve static files
app.use('/uploads', express.static('uploads'));

// Route setup — CLEAN ORDER
app.use('/api/auth', userAuthRoutes);             // /api/auth/signup, /api/auth/login
app.use('/api/auth/users', userProfileRoutes);         // /api/users/:id for profile
app.use('/api/books', bookRoutes);                // /api/books
app.use('/api/reviews', reviewRoutes);            // /api/reviews
app.use('/api/upload', uploadRoutes);             // /api/upload

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.error(' MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
