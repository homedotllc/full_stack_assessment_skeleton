// src/App.js
import React from 'react';
import HomesForUserPage from './pages/HomesForUserPage';
import './App.css';
import CardLayout from './components/CardLayout';
import UserDropdown from './components/UserDropdown';

function App() {
  return (
    <div className="App">
      <UserDropdown/>
      <CardLayout/>
    </div>
  );
}

export default App;
