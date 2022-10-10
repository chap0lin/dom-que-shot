import { Link } from 'react-router-dom';
import logo from '../../assets/dummy/random-mode-logo.png';
import './RandomMode.css';

function RandomMode() {
  return (
    <div className="App">
      <div>
        <img src={logo} className="logo" alt="Vite logo" />
      </div>
      <div className="card">
        <Link to="/ChooseAvatar">
          <button>Go to Choose Name and Avatar</button>
        </Link>
      </div>
    </div>
  );
}

export default RandomMode;
