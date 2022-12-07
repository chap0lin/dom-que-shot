import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-darker.png';
import Background from '../../components/Background';
import Button from '../../components/Button';
import api from '../../services/api';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();
  window.history.replaceState({}, 'Dom Que Shot!', 'http://localhost:5173');

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem('userData'));
    if (userData) {
      api
        .get(
          `/returningUser/${userData.roomCode}/${userData.nickname}/${userData.avatarSeed}`
        )
        .then(() => {
          console.log('OK');
          navigate('/Lobby');
        })
        .catch(() => {
          console.log('Acesso negado.');
          window.localStorage.clear();
        });
    }
  }, []);

  return (
    <Background>
      <div className="WelcomePage">
        <img className="WelcomeImage" src={logo} />

        <Link to="/Home">
          <Button>Entrar</Button>
        </Link>
      </div>
    </Background>
  );
}

export default Welcome;
