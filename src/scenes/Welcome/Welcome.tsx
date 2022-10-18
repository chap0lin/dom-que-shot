import { Link } from 'react-router-dom';
import logo from '../../assets/logo-darker.png';
import Background from '../../components/Background';
import Button from '../../components/Button';
import './Welcome.css';

function Welcome() {
  window.localStorage.clear();

  return (
    <Background>
      <div className="WelcomePage">
        <img className="WelcomeImage" src={logo} />

        <Link to="/Tutorial">
          <Button>Entrar</Button>
        </Link>
      </div>
    </Background>
  );
}

export default Welcome;
