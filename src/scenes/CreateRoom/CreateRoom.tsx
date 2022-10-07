import { Link } from 'react-router-dom';
import logo from '../../assets/create-room-logo.png';
import './CreateRoom.css';

function CreateRoom() {
  return (
    <div className="App">
      <div>
        <img src={logo} className="logo" alt="Vite logo" />
      </div>
      <div className="card">
        <Link to="/StandardMode">
          <button>Go to Standard Mode</button>
        </Link>
        <Link to="/RandomMode ">
          <button>Go to Random Mode</button>
        </Link>
      </div>
    </div>
  );
}

export default CreateRoom;