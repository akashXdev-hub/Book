const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ Signup validation
const validateSignup = async (req, res, next) => {
  const { username, email, password, role } = req.body;
    // Check if all required fields are present
  if (!username || typeof username !== "string" || username.trim().length < 3) {
    return res.status(400).json({ message: "Username is required and must be at least 3 characters." });
  }
    // Check if email is valid
  if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "A valid email is required." });
  }
    // Check if password is valid
  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: "Password is required and must be at least 6 characters." });
  }
    // Check if role is valid
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists." });
    }
    // Check if email is already registered
    const existingUserByEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingUserByEmail) {
      return res.status(409).json({ message: "Email is already registered." });
    }
    // Validate role if provided
    if (role && typeof role !== 'string') {
        return res.status(400).json({ message: "Role must be a string." });
        }
    if (role && !['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be either 'user' or 'admin'." });
    }
    // If all checks pass, proceed to the next middleware
    req.body.email = email.toLowerCase(); // Normalize email to lowercase
    next();
  } catch (error) {
    console.error('Error in signup validation:', error);
    res.status(500).json({ message: 'Server error during signup validation.' });
  }

};

// ✅ Login validation
const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || typeof username !== 'string' || username.trim() === '') {
    return res.status(400).json({ message: 'Username is required.' });
  }

  if (!password || typeof password !== 'string' || password.trim() === '') {
    return res.status(400).json({ message: 'Password is required.' });
  }

  next();
};

// ✅ Protect middleware (JWT token check)
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
 
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    next();
  } catch (err) {
    console.error('JWT Error:', err);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

//  Admin-only middleware 
 
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only' });
  }
};

module.exports = {
  validateSignup,
  validateLogin,
  protect,
  adminOnly,
};
