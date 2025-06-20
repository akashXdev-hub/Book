import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHome, FaUserPlus, FaBookOpen, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';
import Login from '../../pages/Login/AuthPopup'; // Login popup component

const Navbar = ({ onSearchClick }) => {
  const [showLogin, setShowLogin] = useState(false); // Login popup dikhe ya nahi
  const [isLoggedIn, setIsLoggedIn] = useState(false); // User logged in hai ya nahi
  const navigate = useNavigate();

  useEffect(() => {
    // Jab page load ho tab check karein user login hai ya nahi
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Logout hone par token hata do, flag false karo, home page bhejo
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleLoginSuccess = () => {
    // Jab login ho jaye toh login popup band karo aur state update karo
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  return (
    <>
      <nav className="custom-navbar">
        {/* Left section: Logo and brand name */}
        <div className="navbar-left">
          <FaBookOpen className="logo-icon" />
          <Link to="/" className="navbar-brand">PageTurner</Link>
        </div>

        {/* Center section: Links for Home, Search, and Books */}
        <div className="navbar-center">
          <Link to="/" className="nav-link"><FaHome /> Home</Link>
          <button className="nav-link btn-as-link" onClick={onSearchClick}><FaSearch /> Search</button>
          <Link to="/books" className="nav-link"><FaBookOpen /> Books</Link>
        </div>

        {/* Right section: Login/Logout/Profile buttons based on user login state */}
        <div className="navbar-right">
          {!isLoggedIn ? (
            // Agar user login nahi hai toh login button dikhao
            <button className="signup-button" onClick={() => setShowLogin(true)}>
              <FaUserPlus /> <span>Log In</span>
            </button>
          ) : (
            <>
              {/* Agar user login hai toh profile aur logout dikhana */}
              <Link to="/profile" className="signup-button">
                <FaUserCircle /> Profile
              </Link>
              <button className="signup-button" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </nav>

      {/* Login popup dikha de agar showLogin true hai toh */}
      {showLogin && <Login onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />}
    </>
  );
};

export default Navbar;
