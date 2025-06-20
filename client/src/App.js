import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/AuthPopup';
import BookDetailPage from './pages/BookDetail/BookDetailPage';
import BookListingPage from './pages/BookListing/BookListingPage';
import Navbar from './components/navbar/Navbar';
import ProfilePage from './pages/ProfilePage/ProfilePage';  

import SearchPopup from './components/SearchPopup';

const AppContent = () => {
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (filters) => {
    const params = new URLSearchParams(filters).toString();
    navigate(`/books?${params}`);
    setShowSearchPopup(false);
  };

  return (
    <>
      <Navbar onSearchClick={() => setShowSearchPopup(true)} />
      <SearchPopup
        isOpen={showSearchPopup}
        onSearch={handleSearch}
        onClose={() => setShowSearchPopup(false)}
      />
      {showLoginPopup && (
        <Login onClose={() => setShowLoginPopup(false)} />
      )}
   

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<BookListingPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />

      </Routes>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
