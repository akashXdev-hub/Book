const Book = require('../models/Book');
const Review = require('../models/Review');

// GET /books - Get all books with average rating
// GET /books - Get all books with filters and average rating
const getAllBooks = async (req, res) => {
  try {
    const { query, genre, author } = req.query;

    let filter = {};

    if (query) {
      filter.title = { $regex: query, $options: 'i' };
    }

    if (genre) {
     filter.genre = { $in: [genre] };
    }

    if (author) {
      filter.author = { $regex: author, $options: 'i' };
    }

    const books = await Book.find(filter);

    const booksWithRating = await Promise.all(
      books.map(async (book) => {
        const reviews = await Review.find({ book: book._id });
        const avgRating =
          reviews.length > 0
            ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
            : 0;

        return {
          ...book.toObject(), // Convert Mongoose doc to plain object
          averageRating: parseFloat(avgRating.toFixed(1)),
          reviews,
        };
      })
    );

    res.status(200).json(booksWithRating);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Server error while fetching books' });
  }
};


// GET /books/:id - Get single book by ID with populated reviews
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).lean();
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const reviews = await Review.find({ book: book._id }).populate('user', 'username');
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    book.reviews = reviews;
    book.averageRating = parseFloat(avgRating.toFixed(1));

    res.json(book);
  } catch (err) {
    console.error('Error fetching book by ID:', err);
    res.status(500).json({ message: 'Server error while fetching book' });
  }
};

// POST /books - Admin creates a new book
const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message || 'Failed to create book' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
};
