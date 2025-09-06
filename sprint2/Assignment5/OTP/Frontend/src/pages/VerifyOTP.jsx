import React, { useRef, useState } from 'react';
import { verifyOtp } from '../api/api';
import { useLocation, useNavigate } from 'react-router-dom';

export default function VerifyOTP(){
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;
  const email = location.state?.email;
  const [msg, setMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // 4 inputs
  const [digits, setDigits] = useState(['','','','']);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  if (!userId) {
    // if user hits this URL directly
    return (
      <div className="container">
        <h3>No OTP session</h3>
        <p>Please login first.</p>
      </div>
    );
  }

  const handleChange = (idx, value) => {
    if (!/^\d?$/.test(value)) return; // only single digit
    const d = [...digits];
    d[idx] = value;
    setDigits(d);
    if (value && idx < refs.length - 1) {
      refs[idx+1].current.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      refs[idx-1].current.focus();
    }
  };

  const submit = async () => {
    setMsg(null);
    const otp = digits.join('');
    if (otp.length !== 4) {
      setMsg({ type:'error', text: 'Enter 4 digit OTP' });
      return;
    }
    setSubmitting(true);
    const res = await verifyOtp({ userId, otp });
    setSubmitting(false);
    if (res?.message === 'Verified' && res.token) {
      // store token and redirect
      localStorage.setItem('token', res.token);
      navigate('/dashboard');
    } else {
      setMsg({ type:'error', text: res.message || 'Invalid OTP' });
    }
  };

  const resend = async () => {
    // Optionally implement a "resend" endpoint. For now, ask user to login again.
    setMsg({ type:'error', text: 'Resend not implemented in this demo. Please login again.'});
  };

  return (
    <div className="container center">
      <h2>Verify OTP</h2>
      <p>Enter the 4-digit code sent to <strong>{email}</strong></p>
      {msg && <div className={`message ${msg.type === 'success' ? 'success':'error'}`}>{msg.text}</div>}

      <div className="otp-wrap">
        {digits.map((d, i) => (
          <input
            key={i}
            className="otp-input"
            maxLength={1}
            ref={refs[i]}
            value={d}
            onChange={(e)=>handleChange(i, e.target.value)}
            onKeyDown={(e)=>handleKeyDown(e,i)}
            inputMode="numeric"
            autoFocus={i === 0}
          />
        ))}
      </div>

      <div style={{display:'flex', gap:10, justifyContent:'center'}}>
        <button onClick={submit} disabled={submitting}>{submitting ? 'Verifying...' : 'Verify'}</button>
        <button onClick={resend} style={{background:'#6c757d'}}>Resend</button>
      </div>
    </div>
  );
}
