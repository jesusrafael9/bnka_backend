import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recargar la página
    setMessage('');
    setError('');

    try {
      // Llamada al endpoint /register
      const response = await axios.post('http://localhost:5001/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Mostrar mensaje de éxito
      setMessage(`Usuario registrado exitosamente: ID ${response.data.user_id}`);
    } catch (err) {
      // Manejo de errores
      setError(err.response?.data?.error || 'Ocurrió un error al registrar el usuario');
    }
  };

  return (
    <div>
      <h2>Registrar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit">Registrar</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RegisterForm;
