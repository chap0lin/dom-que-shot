import { Link } from 'react-router-dom';
import logo from '../../assets/logo-darker.png';
import Background from '../../Components/Background';
import './Welcome.css';

function Welcome() {
  return (
    <Background>
      <div className="WelcomePage">
        <img className="WelcomeImage" src={logo} />

        <Link to="/Tutorial">
          <button className="WelcomeButton">Entrar</button>
        </Link>
      </div>
    </Background>
  );
}

export default Welcome;
