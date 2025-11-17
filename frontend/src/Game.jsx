import React, { useState } from 'react';

const Game = () => {
  const [userCards, setUserCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [message, setMessage] = useState('');

  const startGame = () => {
    // Logic to start the game
    setUserCards(['Card1', 'Card2']);
    setDealerCards(['Card1', 'Card2']);
    setMessage('Game started! Your move.');
  };

  const hit = () => {
    // Logic for user to draw a card
    setUserCards([...userCards, 'NewCard']);
    setMessage('You drew a card.');
  };

  const stand = () => {
    // Logic for user to stand
    setMessage('You chose to stand. Dealer\'s turn.');
  };

  return (
    <div>
      <h1>Blackjack Game</h1>
      <div>
        <h2>Your Cards</h2>
        <p>{userCards.join(', ')}</p>
      </div>
      <div>
        <h2>Dealer's Cards</h2>
        <p>{dealerCards.join(', ')}</p>
      </div>
      <p>{message}</p>
      <button onClick={startGame}>Start Game</button>
      <button onClick={hit}>Hit</button>
      <button onClick={stand}>Stand</button>
    </div>
  );
};

export default Game;