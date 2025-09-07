import React, { useState, useContext , useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = ({ isOpen, onClose, onRegisterClick }) => {
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  const [forgotStep, setForgotStep] = useState(0); // 0: login, 1: email, 2: otp, 3: new password
  const [forgotEmail, setForgotEmail] = useState('');

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  // Reset form and message when modal is closed or opened
  useEffect(() => {
    if (!isOpen) {
      setForm({ email: "", password: "" });
      setMessage("");
      setForgotStep(0);
      setForgotEmail("");
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", form);
      setMessage("Login successful");
      setIsLoggedIn(true);
      if (res.data && res.data.data) {
        setUser({
          name: res.data.data.name,
          email: res.data.data.email,
          address: res.data.data.address
        });
      } else {
        setUser(null);
      }
      setForm({ email: "", password: "" });
      setForgotStep(0);
      setForgotEmail("");
      setTimeout(() => setMessage(""), 300); // Clear message after short delay
      onClose && onClose();
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  }


  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        {/* Heading removed as requested */}
        {forgotStep === 0 && (
          <form className="modal-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Password
              <input type="password" name="password" value={form.password} onChange={handleChange} required />
            </label>
            {message && (
              <div className={`text-center text-sm ${message === 'Login successful' ? 'text-green-600' : 'text-red-500'}`}>{message}</div>
            )}
            <button type="submit" className="modal-submit">Login</button>
            <div className="modal-links">
              <button type="button" className="modal-link-btn" onClick={() => setForgotStep(1)}>Forgot password?</button>
            </div>
            <div className="modal-links">
              <span>Don't have an account? </span>
              <button type="button" className="modal-link-btn" onClick={onRegisterClick}>Register</button>
            </div>
          </form>
        )}
        {forgotStep === 1 && (
          <form className="modal-form" onSubmit={e => { e.preventDefault(); setForgotStep(2); }}>
            <label>
              Enter your email
              <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required />
            </label>
            <button type="submit" className="modal-submit">Send OTP</button>
            <div className="modal-links">
              <button type="button" className="modal-link-btn" onClick={() => setForgotStep(0)}>Back to Login</button>
            </div>
          </form>
        )}
        {forgotStep === 2 && (
          <form className="modal-form" onSubmit={e => { e.preventDefault(); setForgotStep(3); }}>
            <label>
              Enter OTP sent to {forgotEmail}
              <input type="text" name="otp" maxLength={6} required />
            </label>
            <button type="submit" className="modal-submit">Verify OTP</button>
            <div className="modal-links">
              <button type="button" className="modal-link-btn" onClick={() => setForgotStep(1)}>Back</button>
            </div>
          </form>
        )}
        {forgotStep === 3 && (
          <form className="modal-form">
            <label>
              Enter new password
              <input type="password" name="newPassword"  required />
            </label>
            <label>
              Confirm new password
              <input type="password" name="confirmNewPassword" required />
            </label>
            <button type="submit" className="modal-submit">Set New Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
