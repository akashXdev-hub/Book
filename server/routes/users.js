const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// GET /users/:id
// GET /api/users/:id - Get user by ID (excluding password)
router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // ✅ Fetch and populate favorites
    const user = await User.findById(id)
      .select('-password')
      .populate('favorites'); // Must be defined in schema

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /users/:id
router.put('/:id', protect, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
