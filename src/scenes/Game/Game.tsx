// import { Link } from 'react-router-dom';
import logo from '../../assets/dummy/game-logo.png';
import './Game.css';

function Game() {
  return (
    <div className="App">
      <div>
        <img src={logo} className="logo" alt="Vite logo" />
      </div>
      <div className="card">
        <p>This is the game screen. the end of the line.</p>
      </div>
    </div>
  );
}

export default Game;
