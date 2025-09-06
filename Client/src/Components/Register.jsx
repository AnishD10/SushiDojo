import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/users/register', form);
      setMessage('Registration successful');
      // Optionally, close modal or do more here
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Register</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>
          <label>
            Address
            <input type="text" name="address" value={form.address} onChange={handleChange} required />
          </label>
          {message && (
            <div className={`text-center text-sm ${message === 'Registration successful' ? 'text-green-600' : 'text-red-500'}`}>{message}</div>
          )}
          <button type="submit" className="modal-submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
