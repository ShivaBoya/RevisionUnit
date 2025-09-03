import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/api';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    try {
      const res = await api.put('/auth/profile', { displayName });
      setUser({ ...user, displayName: res.data.displayName });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Failed to update profile.',err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Profile
      </button>
    </div>
  );
}
