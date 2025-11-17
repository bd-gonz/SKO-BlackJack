# Blackjack Web Application

A full-stack web application for playing Blackjack (21) with user authentication and game statistics tracking.

## Features

- **User Management**
  - User registration
  - User login
  - Edit display name
  
- **Game Features**
  - Play Blackjack against the dealer
  - Track game statistics
  - Store game history

- **Technology Stack**
  - **Frontend**: React with Vite
  - **Backend**: Node.js with Express
  - **Database**: PostgreSQL
  - **Routing**: React Router

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/bd-gonz/SKO-BlackJack.git
cd SKO-BlackJack
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

### 4. Set up PostgreSQL database

Create a PostgreSQL database named `blackjack`:

```bash
psql -U postgres
CREATE DATABASE blackjack;
\q
```

Run the setup SQL script to create the necessary tables:

```bash
psql -U postgres -d blackjack -f setup.sql
```

### 5. Configure environment variables

The `.env` file is already created with default values. Update it if needed:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=blackjack
DB_PASSWORD=postgres
DB_PORT=5432
PORT=3000
JWT_SECRET=your_jwt_secret_key_change_in_production
```

## Running the Application

### Development Mode

You need to run both the backend and frontend servers:

#### Terminal 1 - Backend Server

```bash
npm run dev
```

The backend server will start on `http://localhost:3000`

#### Terminal 2 - Frontend Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## Project Structure

```
SKO-BlackJack/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── App.jsx       # Main app component with navigation
│   │   ├── Game.jsx      # Blackjack game component
│   │   ├── Login.jsx     # Login page
│   │   ├── Register.jsx  # Registration page
│   │   └── main.jsx      # Entry point with routing
│   ├── package.json
│   └── vite.config.js    # Vite configuration with proxy
├── index.js              # Backend server entry point
├── userRoutes.js         # User management API routes
├── setup.sql             # Database schema
├── .env                  # Environment variables
├── package.json          # Backend dependencies
└── README.md            # This file
```

## API Endpoints

### User Management

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `PUT /api/users/edit-display-name` - Update user display name

## Database Schema

### Users Table
- `id` - Serial primary key
- `username` - Unique username
- `password` - Hashed password
- `display_name` - User's display name

### Games Table
- `id` - Serial primary key
- `user_id` - Foreign key to users
- `dealer_score` - Dealer's final score
- `user_score` - User's final score
- `result` - Game result (win/loss/tie)
- `played_at` - Timestamp

### Statistics Table
- `user_id` - Foreign key to users (primary key)
- `total_games` - Total games played
- `wins` - Number of wins
- `losses` - Number of losses

## Development Notes

- The frontend uses Vite for fast development and hot module replacement
- API requests from the frontend are proxied to the backend server
- CORS is enabled on the backend for cross-origin requests
- Environment variables are used for configuration

## Future Enhancements

- Implement full Blackjack game logic
- Add real-time game statistics
- Implement JWT authentication
- Add password hashing with bcrypt
- Create profile page for users
- Add game history view
- Implement betting system

## License

ISC

## Author

Your Name
