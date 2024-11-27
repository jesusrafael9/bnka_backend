import React, { useState } from 'react';
import API from '../api';

const TransactionForm = () => {
  const [formData, setFormData] = useState({ user_id: '', type: 'deposito', amount: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/transaction', formData);
      setMessage(`Transacción realizada: Nuevo balance $${response.data.balance}`);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error al realizar la transacción');
    }
  };

  return (
    <div>
      <h2>Registrar Transacción</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID de Usuario"
          value={formData.user_id}
          onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
        />
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="deposito">Depósito</option>
          <option value="retiro">Retiro</option>
        </select>
        <input
          type="number"
          placeholder="Monto"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TransactionForm;
