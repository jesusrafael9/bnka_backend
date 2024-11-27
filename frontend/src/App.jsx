import React from 'react';
import './App.css';
import RegisterForm from './components/RegisterForm';
import BalanceChecker from './components/BalanceChecker';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

const App = () => {
  return (
    <div>
      <h1>BNKA App</h1>
      <RegisterForm />
      <BalanceChecker />
      <TransactionForm />
      <TransactionList />
    </div>
  );
};

export default App;
