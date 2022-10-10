import { Link } from 'react-router-dom';
import logo from '../../assets/login-logo.png';
import { ArrowLeft } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div>
        <ArrowLeft onClick={() => navigate('/tutorial')} />
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
