import { Link } from 'react-router-dom';
import logo from '../../assets/dummy/login-logo.png';
import './Login.css';

function Login() {
  return (
    <div className="App">
      <div>
        <img src={logo} className="logo" alt="Vite logo" />
      </div>
      <div className="card">
        <Link to="/Home">
          <button>Go to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
