import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [message, setMessage] = useState('');

  // Register handler
  const register = async () => {
    try {
      const res = await axios.post('/api/auth/register', { name: 'Your Name', email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setMessage('Registered & Logged In!');
    } catch (err) {
      setMessage(err.response?.data.error || 'Registration failed');
    }
  };

  // Login handler
  const login = async () => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setMessage('Login successful!');
    } catch (err) {
      setMessage(err.response?.data.error || 'Login failed');
    }
  };

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(`Hello, ${res.data.user.name} (${res.data.user.email})`);
    } catch (err) {
      setMessage('Fetch profile failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>MatchHub Auth Demo</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br/>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br/>

      <button onClick={register}>Register</button>
      <button onClick={login} style={{ marginLeft: '1rem' }}>Login</button>
      <button onClick={fetchProfile} style={{ marginLeft: '1rem' }}>Fetch Profile</button>

      {message && (
        <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>
      )}
    </div>
  );
}

export default App;