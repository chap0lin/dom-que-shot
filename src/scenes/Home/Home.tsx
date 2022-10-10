import { Link } from 'react-router-dom';
import { gameCards } from './GameCards';
import ImageSlider from './ImageSlider';
import './Home.css';
import Background from '../../Components/Background';
import { ArrowRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Background>
      <div className="HeaderDiv">
        <div className="HeaderTitle">
          <p>Vamos Começar?</p>
        </div>
        <div className="HeaderLogoSpace">
          <Link to="/">
            <div className="HeaderLogo" />
          </Link>
        </div>
      </div>

      <div className="JoinRoomDiv">
        <input
          className="JoinRoomEnterCode"
          placeholder="Digite o código da sala"
        />
        <button className="JoinRoomButton">
          <ArrowRight
            width="30px"
            height="30px"
            onClick={() => navigate('/JoinRoom')}
          />
        </button>
      </div>

      <div className="CreateRoomDiv">
        <Link to="/CreateRoom">
          <button className="CreateRoomButton">Criar Sala</button>
        </Link>
      </div>

      <div className="ChooseGameDiv">
        <p>Já sabe o que quer?</p>

        <ImageSlider content={gameCards} />
      </div>
    </Background>
  );
}

export default Home;
