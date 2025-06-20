// routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save in uploads folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

// Upload Endpoint
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
