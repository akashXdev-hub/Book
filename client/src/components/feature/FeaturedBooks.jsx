import React, { useEffect, useState } from 'react'; // React hooks for lifecycle & state
import axios from 'axios'; // Data fetch karne ke liye
import './FeaturedBooks.css';
import BookCard from '../BookCard/BookCard';

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]); // Books ko store karne ke liye state  use kerna

  // Component ban ne  hone par data fetch hoga
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books'); // Server se saare books fetch karrna
        const topBooks = res.data.slice(0, 4); // Sirf top 4 books ko select kar rahe hain
        setBooks(topBooks); // Unhe state mein set kar diya
      } catch (err) {
        console.error('Failed to load featured books:', err); // Agar error aayi toh console mein show hoga
      }
    };

    fetchFeatured(); // Function call
  }, []); // Empty dependency => sirf ek baar run hoga

  return (
    <section className="featured-books-section">
      <div className="featured-container">
        <h2 className="featured-title"> Featured Books</h2>

        {/* Description of section */}
        <p className="featured-description">
          Discover the most talked-about books of the month, handpicked by our community of readers.
        </p>

        {/* Grid format mein har book ko BookCard component ke through dikhaya */}
        <div className="featured-grid">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
