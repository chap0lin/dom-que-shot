import { useEffect, useState } from 'react';
import { CheckCircle, Copy, AlertTriangle } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import socketConnection from '../../lib/socket';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import PlayerList from './PlayerList';
import './Lobby.css';

enum Visibility {
  Visible,
  Invisible,
}

function Lobby() {
  const navigate = useNavigate();
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [copyWarning, setCopyWarning] = useState<Visibility>(
    Visibility.Invisible
  );
  const [lobbyWarning, setLobbyWarning] = useState<Visibility>(
    Visibility.Invisible
  );
  const [ownerVisibility, setOwnerVisibility] = useState<Visibility>(
    Visibility.Invisible
  );

  const [playerList, updatePlayerList] = useState([
    {
      avatarSeed: userData.avatarSeed,
      nickname: userData.nickname,
      beers: 0,
      playerID: 5,
    },
  ]);

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = socketConnection.getInstance();

  useEffect(() => {
    socket.connect();
    socket.joinRoom(userData, () => navigate('/Home'));
    socket.setLobbyUpdateListener(updatePlayerList);

    socket.addEventListener('room-owner-is', (ownerID) => {
      if (ownerID === socket.socket.id) {
        setOwnerVisibility(Visibility.Visible);
        return;
      }
      setOwnerVisibility(Visibility.Invisible);
    });

    socket.addEventListener('room-is-moving-to', (destination) => {
      console.log(`Movendo a sala para ${destination}.`);
      navigate(destination);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userData.roomCode);
    console.log('código da sala copiado para a área de transferência');
    setCopyWarning(Visibility.Visible);
    setTimeout(() => {
      setCopyWarning(Visibility.Invisible);
    }, 2000);
  };

  const beginMatch = () => {
    if (playerList.length >= 2) {
      console.log('Iniciando a partida.');
      socket.push('move-room-to', {
        roomCode: userData.roomCode,
        destination: '/SelectNextGame',
      });
      return;
    }
    setLobbyWarning(Visibility.Visible);
    setTimeout(() => {
      setLobbyWarning(Visibility.Invisible);
    }, 2000);
  };

  const header =
    ownerVisibility === Visibility.Visible ? (
      <Header
        goBackArrow={() => {
          navigate('/ChooseAvatar', {
            state: { option: 'update', roomCode: userData.roomCode },
          });
        }}
        settingsPage={() => {}}
      />
    ) : (
      <Header
        goBackArrow={() => {
          navigate('/ChooseAvatar', {
            state: { option: 'update', roomCode: userData.roomCode },
          });
        }}
      />
    );

  return (
    <Background>
      {header}
      <div className="LobbyDiv">
        <div className="RoomCodeTitleSpace">
          <p className="RoomCodeTitle">Código da Sala:</p>
          <div
            className={
              copyWarning === Visibility.Visible
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
            color={copyWarning === Visibility.Visible ? 'lime' : '#8877DF'}
            onClick={copyToClipboard}
          />
        </div>
        <p className="PlayerListTitle">Jogadores:</p>
        <div className="PlayerList">
          <PlayerList players={playerList} />
        </div>
        <div
          className="BeginButton"
          style={
            ownerVisibility === Visibility.Visible
              ? { visibility: 'visible' }
              : { visibility: 'hidden' }
          }>
          <Button width="240px" height="56px" onClick={beginMatch}>
            Iniciar
          </Button>
        </div>
        <div
          className={
            lobbyWarning === Visibility.Visible
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
