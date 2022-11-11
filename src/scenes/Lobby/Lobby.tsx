import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Copy } from 'react-feather';
import socketConnection from '../../lib/socket';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import PlayerList from './PlayerList';
import './Lobby.css';

enum CopyWarning {
  Visible,
  Invisible,
}

function Lobby() {
  const navigate = useNavigate();

  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [copyWarning, setCopyWarning] = useState<CopyWarning>(
    CopyWarning.Invisible
  );

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
    socket.send('lobby-update', userData.roomCode);
    socket.addEventListener('room-is-moving-to', (destination) =>
      navigate(destination)
    );
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  const beginMatch = () => {
    socket.send('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/OEscolhido',
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userData.roomCode);
    console.log('código da sala copiado para a área de transferência');
    setCopyWarning(CopyWarning.Visible);
    setTimeout(() => {
      setCopyWarning(CopyWarning.Invisible);
    }, 2000);
  };

  return (
    <Background>
      <Header
        goBackArrow={() => {
          navigate('/ChooseAvatar');
        }}
        settingsPage="/Home"
      />

      <div className="LobbyDiv">
        <div className="RoomCodeTitleSpace">
          <p className="RoomCodeTitle">Código da Sala:</p>
          <div
            className={
              copyWarning === CopyWarning.Visible
                ? 'CopyIconAndWarning Visible'
                : 'CopyIconAndWarning FadeOut'
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
            color={copyWarning === CopyWarning.Visible ? 'lime' : '#8877DF'}
            onClick={copyToClipboard}
          />
        </div>
        <p className="PlayerListTitle">Jogadores:</p>
        <div className="PlayerList">
          <PlayerList players={playerList} />
        </div>
        <div className="BeginButton">
          <Button width="240px" height="56px">
            <div onClick={beginMatch}>Iniciar</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}

export default Lobby;
