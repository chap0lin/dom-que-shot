import { Link } from 'react-router-dom';
import { gameCards } from './GameCards';
import ImageSlider from './ImageSlider';
import './Home.css';

function Home() {
  return (
    <div className="App">
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
    </div>
  );
}

export default Home;

// <div>
//         <img src={logo} className="logo" alt="Vite logo" />
//       </div>
//       <div className="card">
//         <Link to="/CreateRoom">
//           <button>Create Room</button>
//         </Link>
//         <Link to="/GeneralRoom">
//           <button>Choose a Game</button>
//         </Link>
//         <Link to="/JoinRoom">
//           <button>Join Room</button>
//         </Link>
//       </div>
