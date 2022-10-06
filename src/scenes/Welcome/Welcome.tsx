import { Link } from 'react-router-dom';
import logo from '../../assets/welcome-logo.png';
import './Welcome.css';

function Welcome() {
  return (
    <div className="App">
      <div>
        <img src={logo} className="logo" alt="Vite logo" />
      </div>
      <div className="card">
        <Link to="/Tutorial">
          <button>Go to Tutorial</button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
