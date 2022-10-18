import { Copy } from 'react-feather';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import PlayerList from './PlayerList';
import './Lobby.css';

function Lobby() {
  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const jogadores = [
    { avatarSeed: 'dqxt', nickname: 'Dom Quixote', beers: 3, id: 1 },
    { avatarSeed: 'sxpc', nickname: 'Sancho Pança', beers: 1, id: 2 },
    { avatarSeed: 'dcna', nickname: 'Dulcineia', beers: 2, id: 3 },
    {
      avatarSeed: userData.avatarSeed,
      nickname: userData.nickname,
      beers: 1,
      id: 4,
    },
  ];

  const copyToClipboard = () => {
    console.log('código da sala copiado para a área de transferência');
  };

  return (
    <Background>
      <Header goBackArrow settingsPage="/Home" />

      <div className="LobbyDiv">
        <p className="RoomCodeSpaceTitle">Código da Sala:</p>
        <div className="RoomCodeSpace">
          <p className="RoomCodeItself">{userData.roomCode}</p>
          <Copy
            width="22px"
            height="22px"
            color="#8877DF"
            onClick={copyToClipboard}
          />
        </div>
        <p className="PlayerListTitle">Jogadores:</p>
        <div className="PlayerList">
          <PlayerList players={jogadores} />
        </div>
        <div className="BeginButton">
          <Button width="240px" height="56px">
            Iniciar
          </Button>
        </div>
      </div>
    </Background>
  );
}

export default Lobby;
