import { Link } from 'react-router-dom';
import { gameCards } from './GameCards';
import { ArrowRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <Background>
      <Header title="Vamos começar?" />

      <div className="JoinRoomDiv">
        <input
          className="JoinRoomEnterCode"
          placeholder="Digite o código da sala"
        />
        <button className="JoinRoomButton">
          <ArrowRight
            width="30px"
            height="30px"
            onClick={() => navigate('/ChooseAvatar')}
          />
        </button>
      </div>

      <div className="CreateRoomDiv">
        <Link to="/CreateRoom">
          <Button width="100%">Criar Sala</Button>
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
