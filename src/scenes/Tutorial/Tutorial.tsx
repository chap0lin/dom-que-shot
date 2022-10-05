import { Link } from 'react-router-dom';
import logo from '../../assets/tutorial-logo.png';
import './Tutorial.css';

function Tutorial() {
  return (
    <div className="App">
      <div>
        <img src={logo} className="logo" alt="Vite logo" />
      </div>
      <div className="card">
        <Link to="/Login">
          <button>Go to Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Tutorial;