import React from 'react';
import './HeroBanner.css'; // Is component ka styling file
import { useNavigate } from 'react-router-dom'; // Navigation ke liye hook

const HeroBanner = () => {
  const navigate = useNavigate(); // Page redirect karne ke liye navigate function

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>📚 Discover Your Next Favorite Book</h1> {/* Heading message */}
        <p>Explore a wide collection of novels, thrillers, biographies, and more.</p> {/* Short description */}
        
        {/* Button click pe user ko books page pe bhej diya jaata hai */}
        <button onClick={() => navigate('/books')}>Explore Books</button>
      </div>
    </section>
  );
};

export default HeroBanner; // Component ko export kar rahe hain
