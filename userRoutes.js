// Import necessary modules
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Set up PostgreSQL connection
const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

// Route to create a new user
router.post('/register', async (req, res) => {
  const { username, password, displayName } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (username, password, display_name) VALUES ($1, $2, $3) RETURNING *',
      [username, password, displayName]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Route to login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Route to edit display name
router.put('/edit-display-name', async (req, res) => {
  const { userId, newDisplayName } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET display_name = $1 WHERE id = $2 RETURNING *',
      [newDisplayName, userId]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating display name' });
  }
});

module.exports = router;