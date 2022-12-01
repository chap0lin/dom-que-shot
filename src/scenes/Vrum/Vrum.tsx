import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import coverImg from '../../assets/game-covers/vrum.png';
import socketConnection from '../../lib/socket';
import Background from '../../components/Background';
import CoverPage from './Cover';
import InfoPage from './Info';
import './Vrum.css';

enum Game {
  Cover,
  Info,
}

export default function Vrum() {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [currentGameState, setCurrentGameState] = useState<Game>(Game.Cover);
  const turnVisibility = useLocation().state.isYourTurn;
  const ownerVisibility = useLocation().state.isOwner;

  const title = 'Vrum';
  const navigate = useNavigate();

  const endOfGame = () => {
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/WhoDrank',
    });
  };

  const backToLobby = () => {
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/Lobby',
    });
  };

  //SOCKET////////////////////////////////////////////////////////////////////////////////////////////

  const socket = socketConnection.getInstance();

  useEffect(() => {
    socket.connect();
    socket.addEventListener('room-is-moving-to', (destination) => {
      navigate(destination, {
        state: {
          coverImg: coverImg,
          isYourTurn: turnVisibility,
        },
      });
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  switch (currentGameState) {
    case Game.Cover:
      return (
        <CoverPage
          title={title}
          coverImg={coverImg}
          goBackPage={backToLobby}
          turnVisibility={turnVisibility}
          ownerVisibility={ownerVisibility}
          infoPage={() => setCurrentGameState(Game.Info)}
          endPage={endOfGame}
        />
      );

    case Game.Info:
      return (
        <InfoPage
          title={title}
          coverImg={coverImg}
          coverPage={() => setCurrentGameState(Game.Cover)}
        />
      );

    default:
      return (
        <Background>
          <div>Erro!</div>
        </Background>
      );
  }
}
