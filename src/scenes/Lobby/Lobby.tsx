import { Link } from 'react-router-dom';
import logo from '../../assets/dummy/lobby-logo.png';
import './Lobby.css';

function Lobby() {
  return (
    <div className="App">
      <div>
        <img src={logo} className="logo" alt="Vite logo" />
      </div>
      <div className="card">
        <Link to="/Game">
          <button>Start Game!</button>
        </Link>
      </div>
    </div>
  );
}

export default Lobby;
