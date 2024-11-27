import React, { useState } from 'react';
import API from '../api';

const TransactionList = () => {
  const [userId, setUserId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  const handleFetchTransactions = async () => {
    try {
      const response = await API.get(`/transactions/${userId}`);
      setTransactions(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al obtener las transacciones');
      setTransactions([]);
    }
  };

  return (
    <div>
      <h2>Historial de Transacciones</h2>
      <input
        type="number"
        placeholder="ID de Usuario"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleFetchTransactions}>Consultar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {transactions.map((t, index) => (
          <li key={index}>
            {t.type.toUpperCase()} - ${t.amount} - {new Date(t.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
