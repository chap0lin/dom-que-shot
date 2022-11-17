import { useEffect, useState } from 'react';
import { CheckCircle, Copy, AlertTriangle } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import socketConnection from '../../lib/socket';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import PlayerList from './PlayerList';
import './Lobby.css';

enum Warning {
  Visible,
  Invisible,
}

function Lobby() {
  const navigate = useNavigate();
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [copyWarning, setCopyWarning] = useState<Warning>(Warning.Invisible);

  const [lobbyWarning, setLobbyWarning] = useState<Warning>(Warning.Invisible);

  const [playerList, updatePlayerList] = useState([
    {
      avatarSeed: userData.avatarSeed,
      nickname: userData.nickname,
      beers: 0,
      id: 5,
    },
  ]);

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = socketConnection.getInstance();

  useEffect(() => {
    socket.connect();
    socket.joinRoom(userData);
    socket.setLobbyUpdateListener(updatePlayerList);
    socket.addEventListener('room-is-moving-to', (destination) => {
      console.log(`Movendo a sala para ${destination}.`);
      navigate(destination);
    });
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userData.roomCode);
    console.log('código da sala copiado para a área de transferência');
    setCopyWarning(Warning.Visible);
    setTimeout(() => {
      setCopyWarning(Warning.Invisible);
    }, 2000);
  };

  const startGame = () => {
    if (playerList.length >= 2) {
      console.log('Iniciando a partida.');
      socket.send('move-room-to', {
        roomCode: userData.roomCode,
        destination: '/SelectNextGame',
      });
      return;
    }
    setLobbyWarning(Warning.Visible);
    setTimeout(() => {
      setLobbyWarning(Warning.Invisible);
    }, 2000);
  };

  return (
    <Background>
      <Header goBackArrow settingsPage="/Home" />

      <div className="LobbyDiv">
        <div className="RoomCodeTitleSpace">
          <p className="RoomCodeTitle">Código da Sala:</p>
          <div
            className={
              copyWarning === Warning.Visible
                ? 'Warning Visible'
                : 'Warning FadeOut'
            }>
            <CheckCircle width="20px" height="20px" color="lime" />
            <p className="CopyWarning">Copiado!</p>
          </div>
        </div>
        <div className="RoomCodeSpace">
          <p className="RoomCodeItself">{userData.roomCode}</p>
          <Copy
            width="22px"
            height="22px"
            color={copyWarning === Warning.Visible ? 'lime' : '#8877DF'}
            onClick={copyToClipboard}
          />
        </div>
        <p className="PlayerListTitle">Jogadores:</p>
        <div className="PlayerList">
          <PlayerList players={playerList} />
        </div>
        <div className="BeginButton">
          <Button width="240px" height="56px">
            <div onClick={startGame}>Iniciar</div>
          </Button>
        </div>
        <div
          className={
            lobbyWarning === Warning.Visible
              ? 'Lobby Warning Visible'
              : 'Lobby Warning FadeOut'
          }>
          <AlertTriangle width="20px" height="20px" color="red" />
          <p className="LobbyWarning">Mínimo de 2 jogadores!</p>
        </div>
      </div>
    </Background>
  );
}

export default Lobby;
