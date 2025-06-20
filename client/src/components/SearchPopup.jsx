import React, { useState } from 'react';

const SearchPopup = ({ onSearch, isOpen, onClose }) => {
 const [filters, setFilters] = useState({
  query: '',
  genre: '',
  author: ''
});


  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFilters({ query: '', genre: '', year: '' });
    onSearch({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
    onClose(); // close popup from parent
  };

  if (!isOpen) return null;

  return (
    <div style={styles.popup}>
      <button onClick={onClose} style={styles.closeBtn}>×</button>
      <h2 style={styles.heading}>🔍 Find Your Next Adventure</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="query"
          placeholder="Search by Title, Author, or ISBN..."
          value={filters.query}
          onChange={handleChange}
          style={styles.input}
        />

        <div style={styles.row}>
          <div style={styles.field}>
            <label>Genre</label>
            <select name="genre" value={filters.genre} onChange={handleChange} style={styles.input}>
              <option value="">All Genres</option>
              <option value="fiction">Fiction</option>
              <option value="nonfiction">Non-Fiction</option>
              <option value="fantasy">Fantasy</option>
              <option value="romance">Romance</option>
               <option value="romance">Self-Help</option>
            </select>
          </div>

          <div style={styles.field}>
           
          <label>Author</label>
                      <input
                type="text"
                name="author"
                placeholder="Search by author"
                value={filters.author}
                onChange={handleChange}
                style={styles.input}
              />

          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.searchBtn}>Search</button>
          <button type="button" onClick={handleReset} style={styles.resetBtn}>Reset Filters</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  popup: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '600px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 1000,
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
    color: '#555',
    cursor: 'pointer',
  },
  heading: {
    color: '#5A00A0',
    marginTop: 0
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%'
  },
  row: {
    display: 'flex',
    gap: '15px'
  },
  field: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px'
  },
  searchBtn: {
    padding: '10px 20px',
    background: '#5A00A0',
    color: '#fff',
    border: 'none',
    borderRadius: '6px'
  },
  resetBtn: {
    padding: '10px 20px',
    background: '#f0f0f0',
    color: '#333',
    border: 'none',
    borderRadius: '6px'
  }
};

export default SearchPopup;
