import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './Layout.jsx';
import App from './App.jsx';
import Game from './Game.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/game" element={<Game />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
);
