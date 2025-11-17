// Import necessary modules
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

// Create an instance of express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import user routes
const userRoutes = require('./userRoutes');

// Use user routes
app.use('/api/users', userRoutes);

// Set up PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'blackjack',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Blackjack game!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});