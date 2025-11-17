import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <h1>Blackjack Game</h1>
      <nav>
        <ul>
          <li>
            <Link to="/game">Play Game</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <p>Welcome to the Blackjack game! Please register or login to start playing.</p>
    </div>
  );
}

export default App;
