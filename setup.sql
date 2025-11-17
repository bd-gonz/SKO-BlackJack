-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  display_name VARCHAR(100)
);

-- Create games table
CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  dealer_score INT NOT NULL,
  user_score INT NOT NULL,
  result VARCHAR(50) NOT NULL,
  played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create statistics table
CREATE TABLE statistics (
  user_id INT REFERENCES users(id),
  total_games INT DEFAULT 0,
  wins INT DEFAULT 0,
  losses INT DEFAULT 0,
  PRIMARY KEY (user_id)
);