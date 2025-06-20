import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchPopup from '../../components/SearchPopup';
import BookCard from '../../components/BookCard/BookCard';
import './BookListingPage.css';

const BookListingPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  const fetchBooks = async (filters = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters);
      const res = await axios.get(`http://localhost:5000/api/books?${params}`);
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="book-listing-page">
      <h1 className="page-title">Explore New World</h1>

      <button onClick={() => setShowSearch(true)} className="search-popup-toggle">
        🔍 Search Your Book
      </button>

      {loading ? (
        <p className="loading-text">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="no-books-text">No books found.</p>
      ) : (
        <div className="book-list-grid">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      {/* ✅ Search Popup */}
      <SearchPopup
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        onSearch={fetchBooks}
      />
    </div>
  );
};

export default BookListingPage;
