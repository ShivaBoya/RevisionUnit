import React, { useState } from 'react';
import { signup } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup(){
  const [form, setForm] = useState({ name: '', email: '', password: ''});
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    const res = await signup(form);
    if (res?.message === 'User created') {
      setMsg({ type: 'success', text: 'Account created. Please login.'});
      setTimeout(()=> navigate('/login'), 1200);
    } else {
      setMsg({ type: 'error', text: res.message || 'Signup failed' });
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      {msg && <div className={`message ${msg.type === 'success' ? 'success':'error'}`}>{msg.text}</div>}
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <label>Email</label>
        <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        <label>Password</label>
        <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:10}}>
          <button type="submit">Create account</button>
          <Link to="/login">Already have account?</Link>
        </div>
      </form>
    </div>
  );
}
