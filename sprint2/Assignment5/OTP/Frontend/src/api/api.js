const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export const signup = (data) => fetch(`${BASE}/api/auth/signup`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).then(r => r.json());

export const login = (data) => fetch(`http://localhost:5000/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).then(r => r.json());

export const verifyOtp = (data) => fetch(`http://localhost:5000/api/auth/verify-otp`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).then(r => r.json());
