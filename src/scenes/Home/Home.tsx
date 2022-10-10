import { Link } from 'react-router-dom';
import { gameCards } from './GameCards';
import ImageSlider from './ImageSlider';
import './Home.css';
import Background from '../../Components/Background';

function Home() {
  return (
    <Background>
      <div className="HomeHeaderDiv">
        <div className="HomeHeaderTitle">
          <p>Vamos Começar?</p>
        </div>
        <div className="HomeHeaderLogoSpace">
          <Link to="/">
            <div className="HomeHeaderLogo" />
          </Link>
        </div>
      </div>

      <div className="JoinRoomDiv">
        <input
          className="JoinRoomEnterCode"
          placeholder="Digite o código da sala"
        />
        <Link to="/JoinRoom">
          <button className="JoinRoomButton" />
        </Link>
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
