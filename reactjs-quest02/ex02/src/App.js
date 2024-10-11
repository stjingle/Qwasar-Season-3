import React from 'react';
import LoremIpsum from './LoremIpsum.js';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section className="App-section">
        <div className="section-title">
          My First Component!
        </div>
        <LoremIpsum />
      </section>
    </div>
  );
}

export default App;
