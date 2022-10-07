import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Home.css';

function Home() {
  return (
    <div className="App">
      <div>
        <img src={logo} className="logo" alt="Vite logo" />
      </div>
      <div className="card">
        <Link to="/CreateRoom">
          <button>Create Room</button>
        </Link>
        <Link to="/GeneralRoom">
          <button>Join Room</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
