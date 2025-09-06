import React, { useState } from 'react';
import { login } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    const res = await login(form);
    if (res?.message === 'OTP sent' && res.userId) {
      // proceed to OTP page with userId
      navigate('/verify-otp', { state: { userId: res.userId, email: form.email } });
    } else {
      setMsg({ type: 'error', text: res.message || 'Login failed' });
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {msg && <div className={`message ${msg.type === 'success' ? 'success':'error'}`}>{msg.text}</div>}
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        <label>Password</label>
        <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:10}}>
          <button type="submit">Login</button>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
