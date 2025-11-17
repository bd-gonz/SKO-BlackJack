import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, displayName }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful!');
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('Error registering user.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
};

export default Register;