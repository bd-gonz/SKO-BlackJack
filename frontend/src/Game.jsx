import React, { useState } from 'react';
import './Game.css';

const Game = () => {
  const [userCards, setUserCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [message, setMessage] = useState('Click "Start Game" to begin!');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  // Card deck
  const suits = ['♠', '♥', '♦', '♣'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  // Generate a random card
  const getRandomCard = () => {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { suit, value };
  };

  // Calculate hand value
  const calculateScore = (cards) => {
    let score = 0;
    let aces = 0;

    cards.forEach(card => {
      if (card.value === 'A') {
        aces += 1;
        score += 11;
      } else if (['J', 'Q', 'K'].includes(card.value)) {
        score += 10;
      } else {
        score += parseInt(card.value);
      }
    });

    // Adjust for aces
    while (score > 21 && aces > 0) {
      score -= 10;
      aces -= 1;
    }

    return score;
  };

  const startGame = () => {
    const newUserCards = [getRandomCard(), getRandomCard()];
    const newDealerCards = [getRandomCard(), getRandomCard()];
    
    setUserCards(newUserCards);
    setDealerCards(newDealerCards);
    setUserScore(calculateScore(newUserCards));
    setDealerScore(calculateScore(newDealerCards));
    setGameStarted(true);
    setGameOver(false);
    setMessage('Game started! Your move.');
  };

  const hit = () => {
    if (gameOver) return;
    
    const newCard = getRandomCard();
    const newUserCards = [...userCards, newCard];
    const newScore = calculateScore(newUserCards);
    
    setUserCards(newUserCards);
    setUserScore(newScore);
    
    if (newScore > 21) {
      setMessage('Bust! You lose!');
      setGameOver(true);
    } else if (newScore === 21) {
      setMessage('21! You win!');
      setGameOver(true);
    } else {
      setMessage('You drew a card. Hit or Stand?');
    }
  };

  const stand = () => {
    if (gameOver) return;
    
    setGameOver(true);
    let newDealerCards = [...dealerCards];
    let newDealerScore = calculateScore(newDealerCards);
    
    // Dealer draws until 17 or higher
    while (newDealerScore < 17) {
      const newCard = getRandomCard();
      newDealerCards.push(newCard);
      newDealerScore = calculateScore(newDealerCards);
    }
    
    setDealerCards(newDealerCards);
    setDealerScore(newDealerScore);
    
    // Determine winner
    if (newDealerScore > 21) {
      setMessage('Dealer busts! You win!');
    } else if (newDealerScore > userScore) {
      setMessage('Dealer wins!');
    } else if (newDealerScore < userScore) {
      setMessage('You win!');
    } else {
      setMessage('Push! It\'s a tie!');
    }
  };

  const renderCard = (card, index) => {
    const isRed = card.suit === '♥' || card.suit === '♦';
    return (
      <div key={index} className={`card ${isRed ? 'red' : 'black'}`}>
        <div className="card-value">{card.value}</div>
        <div className="card-suit">{card.suit}</div>
      </div>
    );
  };

  return (
    <div className="game-container">
      <h1>Blackjack Game</h1>
      
      <div className="dealer-section">
        <h2>Dealer's Cards {gameStarted && `(Score: ${dealerScore})`}</h2>
        <div className="cards-container">
          {dealerCards.length > 0 ? (
            dealerCards.map((card, index) => renderCard(card, index))
          ) : (
            <p className="no-cards">No cards yet</p>
          )}
        </div>
      </div>

      <div className="user-section">
        <h2>Your Cards {gameStarted && `(Score: ${userScore})`}</h2>
        <div className="cards-container">
          {userCards.length > 0 ? (
            userCards.map((card, index) => renderCard(card, index))
          ) : (
            <p className="no-cards">No cards yet</p>
          )}
        </div>
      </div>

      <div className="message-section">
        <p className="message">{message}</p>
      </div>

      <div className="controls">
        <button onClick={startGame} className="btn btn-primary">
          {gameStarted ? 'New Game' : 'Start Game'}
        </button>
        <button onClick={hit} disabled={!gameStarted || gameOver} className="btn btn-success">
          Hit
        </button>
        <button onClick={stand} disabled={!gameStarted || gameOver} className="btn btn-warning">
          Stand
        </button>
      </div>
    </div>
  );
};

export default Game;