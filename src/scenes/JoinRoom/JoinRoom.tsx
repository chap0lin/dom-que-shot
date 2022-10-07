import { Link } from 'react-router-dom';
import logo from '../../assets/join-room-logo.png';
import './JoinRoom.css';

function JoinRoom() {
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

export default JoinRoom;
