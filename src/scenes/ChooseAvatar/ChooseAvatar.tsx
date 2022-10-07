// import { Link } from 'react-router-dom';
import logo from '../../assets/choose-avatar-logo.png';
import './ChooseAvatar.css';

function ChooseAvatar() {
  return (
    <div className="App">
      <div>
        <img src={logo} className="logo" alt="Vite logo" />
      </div>
      <div className="card">
        {/* <Link to="/ChooseAvatar"> */}
        <button>This is where we choose avatars and names!</button>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default ChooseAvatar;
