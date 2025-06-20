import React from "react";
import { Link } from "react-router-dom"; // Navigation ke liye Link use kar rahe hain
import "./BookCard.css";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaRegHeart
} from "react-icons/fa"; // Icons ke liye Font Awesome ka use ho raha hai

// Functional component jo ek book card dikhata hai
const BookCard = ({ book }) => {
  const BASE_URL = "http://localhost:5000"; // Image ya file ka base URL

  // Agar rating available hai toh usko lo, warna 0
  const averageRating = book.averageRating || 0;
  const reviewCount = book.reviews?.length || 0; // Reviews ka count

  // Star icons banane ke liye function
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(averageRating); // Kitne full stars honge
    const hasHalfStar = averageRating - fullStars >= 0.5; // Half star ki condition

    // Full star icons add karo
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="star-icon filled" />);
    }

    // Agar half star hai toh add karna
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star-icon half" />);
    }

    // Bache hue stars ko empty star se fill karna
    while (stars.length < 5) {
      stars.push(
        <FaRegStar key={`empty-${stars.length}`} className="star-icon empty" />
      );
    }

    return stars;
  };

  return (
    // Pure card pe click karne se book detail page  open hoga
    // Link component ka use karke navigation kar rahe hain
    <Link to={`/books/${book._id}`} className="book-card-link">
      <div className="book-card">
        <div className="image-container">
          {/* Book cover image */}
          <img
            src={`${BASE_URL}${book.coverImage}`}
            alt={book.title}
            className="book-image"
          />

          
          <button className="heart-icon">
            <FaRegHeart />
          </button>

          {/* Genre badge (agar genre na ho toh "Genre" dikhane ke liye) */}
          <span className="genre-badge">{book.genre?.[0] || "Genre"}</span>
        </div>

        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">by {book.author}</p>

          {/* Rating stars and number of reviews */}
          <div className="rating">
            {renderStars()}
            <span className="rating-value"> {averageRating.toFixed(1)}</span>
            <span className="review-count">
              ({reviewCount} review{reviewCount !== 1 ? "s" : ""})
            </span>
          </div>

         
          <p className="book-description">{book.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
