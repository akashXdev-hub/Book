import React, { useState } from 'react';
import axios from 'axios';
import './ReviewForm.css';

const ReviewForm = ({ bookId, onReviewSubmitted, book }) => {
  // State variables: user ka comment, rating aur koi error message
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');

  // Review submit karne par ye function call hota hai
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page reload hone se rokte hain
    setError(''); // Pichle error clear karte hain

    try {
      // LocalStorage se user token uthate hain
      const token = localStorage.getItem('userToken');

      // Review POST request bhejna backend ko
      await axios.post(
        `http://localhost:5000/api/reviews`,
        {
          book: bookId,
          rating: Number(rating),
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Auth header bhejna
          },
        }
      );

      // Form reset kar dete hain successful review ke baad
      setComment('');
      setRating(5);

      // Agar parent component ne function diya hai toh usko call kar dete hain
      if (onReviewSubmitted) onReviewSubmitted(); // Book data refresh ke liye
    } catch (err) {
      // Agar error aayi toh error message dikhate hain
      setError(err.response?.data?.message || 'Failed to submit review.');
    }
  };

  // Agar book ka data hi nahi mila toh kuch mat dikhao
  if (!book) return null;

  return (
    <div className="reviews-section">
      <h3>Reviews & Ratings</h3>

      <div className="reviews-container">
        {/* Left side: Form for adding new review */}
        <div className="review-form-wrapper">
          <h4>Leave a Review</h4>
          <form className="review-form" onSubmit={handleSubmit}>
            {/* Comment box */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              required
            />
            {/* Dropdown for selecting rating */}
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? 's' : ''}
                </option>
              ))}
            </select>

            {/* Submit button */}
            <button type="submit">Submit Review</button>

            {/* Error message dikhana agar kuch galat ho */}
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>

        {/* Right side: Existing reviews ka list */}
        <div className="review-list-wrapper">
          <h4>{book.reviews?.length || 0} User Review{book.reviews?.length !== 1 ? 's' : ''}</h4>
          <ul className="reviews-list">
            {book.reviews?.map((rev, idx) => (
              <li key={idx} className="review-card">
                <p><strong>⭐ {rev.rating}</strong> - {rev.comment}</p>
                <p className="review-user">— {rev.user?.username || 'Anonymous'}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
