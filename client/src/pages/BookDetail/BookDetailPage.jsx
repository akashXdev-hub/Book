import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import './BookDetailPage.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/books/${id}`);
      setBook(res.data);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (!book) return <p>Loading book...</p>;

  return (
    <div className="book-detail-container">
      <div className="book-main">
        <img src={`http://localhost:5000${book.coverImage}`} alt={book.title} />
        <div className="book-info">
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre.join(', ')}</p>
          <p><strong>Description:</strong> {book.description}</p>
        </div>
      </div>

      <div className="reviews-section">
        <h3>Reviews ({book.reviews?.length || 0})</h3>
        <ul className="reviews-list">
          {book.reviews?.map((rev, idx) => (
            <li key={idx}>
              <strong>⭐ {rev.rating}</strong> - {rev.comment}
            </li>
          ))}
        </ul>

       <ReviewForm
  bookId={book._id}
  book={book}
  onReviewSubmitted={fetchBook}
/>
      </div>
    </div>
  );
};

export default BookDetails;
