import React, { useState } from 'react';
import API from '../api';

const BalanceChecker = () => {
  const [userId, setUserId] = useState('');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  const handleCheckBalance = async (e) => {
    e.preventDefault();
    setError('');
    setBalance(null);

    try {
      const response = await API.get(`/balance/${userId}`);
      setBalance(response.data.balance);
    } catch (err) {
      setError('Error al consultar el balance');
    }
  };

  return (
    <div>
      <h2 style={{ color: '#007bff', textAlign: 'center' }}>Consultar Balance</h2>
      <form onSubmit={handleCheckBalance}>
        <input
          type="number"
          placeholder="ID de usuario"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit">Consultar</button>
      </form>
      {balance !== null && <p style={{ color: 'green' }}>Balance: ${balance}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default BalanceChecker;
