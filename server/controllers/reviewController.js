const Review = require('../models/Review');
const Book = require('../models/Book');

// GET /reviews?bookId=xyz - Get reviews for a book
const getReviewsByBook = async (req, res) => {
  try {
    const bookId = req.query.bookId;

    const reviews = await Review.find({ book: bookId }).populate('user', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching reviews' });
  }
};

// POST /reviews - Create a review
const createReview = async (req, res) => {
  const { book, rating, comment } = req.body;

  try {
    // Optional: Check if book exists
    const bookExists = await Book.findById(book);
    if (!bookExists) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const review = new Review({
      book,
      user: req.user._id,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message || 'Failed to create review' });
  }
};

module.exports = {
  getReviewsByBook,
  createReview,
};
