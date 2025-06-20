import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  // ✅ Local storage se user ID & token uthate hain
  const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;
  const token = localStorage.getItem("userToken");

  // ✅ State: user info, loading status, edit mode aur input form
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ username: '', email: '' });

  // ✅ User data fetch karne ke liye useEffect
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache' // stale data avoid karne ke liye
          }
        });

        // Agar response me user data hai toh set karo
        if (res.data && res.data.username) {
          setUser(res.data);
          setForm({ username: res.data.username, email: res.data.email }); // Form me bhi bhar do
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    // ✅ Jab userId aur token dono mile tabhi fetch karo
    if (userId && token) {
      fetchUser();
    } else {
      setLoading(false); // Unauthorized case
    }
  }, [userId, token]);

  // Profile update karne ka function
  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/users/${userId}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data); // Update local state with fresh data
      setEditing(false); // Edit mode band
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  //  Loading ya unauthorized UI
  if (loading) return <p className="loading-text">Loading profile...</p>;
  if (!user) return <p className="error-text">User not found or not authorized.</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">👤 Profile</h2>

        {/*  Editing mode */}
        {editing ? (
          <>
            <input
              type="text"
              className="profile-input"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Username"
            />
            <input
              type="email"
              className="profile-input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
            />
            <button className="save-btn" onClick={handleSave}>💾 Save</button>
          </>
        ) : (
          //  Read-only profile view
          <>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button className="edit-btn" onClick={() => setEditing(true)}>✏️ Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
