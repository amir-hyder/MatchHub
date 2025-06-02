// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// 1) PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2) Helper: generate JWT
function generateToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
}

// 3) Middleware: protect routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  // Expect header: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403);
    req.user = { id: payload.userId, email: payload.email };
    next();
  });
}

// 4) Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 5) REGISTER
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password required.' });
  }

  try {
    // 5a) Check if user already exists
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    // 5b) Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // 5c) Insert into DB
    const result = await pool.query(
      'INSERT INTO users(name, email, password_hash) VALUES($1, $2, $3) RETURNING id, name, email',
      [name, email, password_hash]
    );
    const newUser = result.rows[0];

    // 5d) Issue JWT
    const token = generateToken(newUser);
    res.status(201).json({ user: { id: newUser.id, name: newUser.name, email: newUser.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// 6) LOGIN
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required.' });
  }

  try {
    // 6a) Fetch user by email
    const result = await pool.query('SELECT id, name, email, password_hash FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const user = result.rows[0];
    // 6b) Compare password
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // 6c) Issue JWT
    const token = generateToken(user);
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// 7) EXAMPLE PROTECTED ROUTE
app.get('/api/profile', authenticateToken, async (req, res) => {
  // req.user is set by authenticateToken
  try {
    const result = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching profile.' });
  }
});

// 8) Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});