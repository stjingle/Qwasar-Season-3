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
          My First section!
        </div>
        <a
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go To ReactJS.org
        </a>
      </section>
    </div>
  );
}

export default App;
