import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(){
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetch((import.meta.env.VITE_API_BASE || 'http://localhost:5000') + '/api/protected', {
      headers: { Authorization: 'Bearer ' + token }
    }).then(r => r.json()).then(d => {
      if (d?.message === 'Protected data') setMessage('Welcome! Your session is verified.');
      else setMessage('Could not fetch protected data.');
    }).catch(err => setMessage('Error fetching protected data.'));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>{message}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
