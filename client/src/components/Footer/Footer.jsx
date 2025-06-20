import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section company">
          <h3>PageTurner</h3>
          <p>Your gateway to honest reviews, passionate readers, and timeless books.</p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/books">Explore</a></li>
            <li><a href="/profile">My Profile</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email: support@pageturner.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} PageTurner. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
