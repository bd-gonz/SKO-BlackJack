import React, { useState, useEffect } from 'react';
import './Game.css';

const Game = () => {
  const [deckId, setDeckId] = useState(null);
  const [userCards, setUserCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [message, setMessage] = useState('Click "Start Game" to begin!');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  // Initialize a new deck when component mounts
  useEffect(() => {
    initializeDeck();
  }, []);

  const initializeDeck = async () => {
    try {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data = await response.json();
      setDeckId(data.deck_id);
    } catch (error) {
      console.error('Error initializing deck:', error);
      setMessage('Error loading cards. Please refresh the page.');
    }
  };

  // Calculate hand value
  const calculateScore = (cards) => {
    let score = 0;
    let aces = 0;

    cards.forEach(card => {
      const value = card.value;
      if (value === 'ACE') {
        aces += 1;
        score += 11;
      } else if (['JACK', 'QUEEN', 'KING'].includes(value)) {
        score += 10;
      } else {
        score += parseInt(value);
      }
    });

    // Adjust for aces
    while (score > 21 && aces > 0) {
      score -= 10;
      aces -= 1;
    }

    return score;
  };

  const drawCards = async (count) => {
    if (!deckId) return [];
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
      const data = await response.json();
      return data.cards;
    } catch (error) {
      console.error('Error drawing cards:', error);
      return [];
    }
  };

  const startGame = async () => {
    if (!deckId) {
      await initializeDeck();
      return;
    }

    // Draw 2 cards for player and 2 for dealer
    const allCards = await drawCards(4);
    if (allCards.length < 4) {
      setMessage('Error drawing cards. Please try again.');
      return;
    }

    const newUserCards = [allCards[0], allCards[1]];
    const newDealerCards = [allCards[2], allCards[3]];
    
    setUserCards(newUserCards);
    setDealerCards(newDealerCards);
    
    const userScoreValue = calculateScore(newUserCards);
    const dealerScoreValue = calculateScore(newDealerCards);
    
    setUserScore(userScoreValue);
    setDealerScore(dealerScoreValue);
    setGameStarted(true);
    setGameOver(false);
    
    if (userScoreValue === 21) {
      setMessage('Blackjack! You win!');
      setGameOver(true);
    } else {
      setMessage('Game started! Your move.');
    }
  };

  const hit = async () => {
    if (gameOver || !deckId) return;
    
    const newCards = await drawCards(1);
    if (newCards.length === 0) {
      setMessage('Error drawing card. Please try again.');
      return;
    }

    const newCard = newCards[0];
    const newUserCards = [...userCards, newCard];
    const newScore = calculateScore(newUserCards);
    
    setUserCards(newUserCards);
    setUserScore(newScore);
    
    if (newScore > 21) {
      setMessage('Bust! You lose!');
      setGameOver(true);
    } else if (newScore === 21) {
      setMessage('21! Standing automatically.');
      setGameOver(true);
      await dealerPlay(newUserCards);
    } else {
      setMessage('You drew a card. Hit or Stand?');
    }
  };

  const dealerPlay = async (finalUserCards) => {
    let currentDealerCards = [...dealerCards];
    let currentScore = calculateScore(currentDealerCards);
    
    // Dealer draws until 17 or higher
    while (currentScore < 17) {
      const newCards = await drawCards(1);
      if (newCards.length === 0) break;
      
      currentDealerCards.push(newCards[0]);
      currentScore = calculateScore(currentDealerCards);
    }
    
    setDealerCards(currentDealerCards);
    setDealerScore(currentScore);
    
    // Determine winner
    const finalUserScore = calculateScore(finalUserCards);
    if (currentScore > 21) {
      setMessage('Dealer busts! You win!');
    } else if (currentScore > finalUserScore) {
      setMessage('Dealer wins!');
    } else if (currentScore < finalUserScore) {
      setMessage('You win!');
    } else {
      setMessage('Push! It\'s a tie!');
    }
  };

  const stand = async () => {
    if (gameOver) return;
    
    setGameOver(true);
    setMessage('Dealer\'s turn...');
    
    await dealerPlay(userCards);
  };

  return (
    <div className="game-container">
      <h1>Blackjack Game</h1>
      
      <div className="dealer-section">
        <h2>Dealer's Cards {gameStarted && `(Score: ${dealerScore})`}</h2>
        <div className="cards-container">
          {dealerCards.length > 0 ? (
            dealerCards.map((card, index) => (
              <img 
                key={index} 
                src={card.image} 
                alt={`${card.value} of ${card.suit}`}
                className="card-image"
              />
            ))
          ) : (
            <p className="no-cards">No cards yet</p>
          )}
        </div>
      </div>

      <div className="user-section">
        <h2>Your Cards {gameStarted && `(Score: ${userScore})`}</h2>
        <div className="cards-container">
          {userCards.length > 0 ? (
            userCards.map((card, index) => (
              <img 
                key={index} 
                src={card.image} 
                alt={`${card.value} of ${card.suit}`}
                className="card-image"
              />
            ))
          ) : (
            <p className="no-cards">No cards yet</p>
          )}
        </div>
      </div>

      <div className="message-section">
        <p className="message">{message}</p>
      </div>

      <div className="controls">
        <button onClick={startGame} className="btn btn-primary" disabled={!deckId}>
          {gameStarted ? 'New Game' : 'Start Game'}
        </button>
        <button onClick={hit} disabled={!gameStarted || gameOver || !deckId} className="btn btn-success">
          Hit
        </button>
        <button onClick={stand} disabled={!gameStarted || gameOver || !deckId} className="btn btn-warning">
          Stand
        </button>
      </div>
    </div>
  );
};

export default Game;