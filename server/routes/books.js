const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', protect, adminOnly, bookController.createBook);

module.exports = router;
