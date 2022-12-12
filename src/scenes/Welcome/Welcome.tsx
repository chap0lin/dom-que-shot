import { Link } from 'react-router-dom';
import logo from '../../assets/logo-darker.png';
import Background from '../../components/Background';
import Button from '../../components/Button';
import PingTracker from '../../components/Debug/PingTracker';
import './Welcome.css';

function Welcome() {
  window.localStorage.clear();

  return (
    <Background>
      <div className="WelcomePage">
        <img className="WelcomeImage" src={logo} />

        <Link to="/Home">
          <Button>Entrar</Button>
        </Link>

        <PingTracker />
      </div>
    </Background>
  );
}

export default Welcome;
