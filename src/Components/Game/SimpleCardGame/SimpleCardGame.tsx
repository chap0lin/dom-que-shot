import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SocketConnection from '../../../lib/socket';
import Background from '../../Background';
import CoverPage from '../Cover';
import InfoPage from '../Info';
import './SimpleCardGame.css';

enum Game {
  Cover,
  Info,
}

interface SimpleCardGameProps {
  title: string;
  description: string | JSX.Element;
  coverImg: string;
}

export default function SimpleCardGame({
  title,
  description,
  coverImg,
}: SimpleCardGameProps) {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [currentGameState, setCurrentGameState] = useState<Game>(Game.Cover);
  const turnVisibility = useLocation().state.isYourTurn;
  const ownerVisibility = useLocation().state.isOwner;
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

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.connect();
    socket.addEventListener('room-is-moving-to', (destination) => {
      navigate(destination, {
        state: {
          coverImg: coverImg,
          isYourTurn: turnVisibility,
          isOwner: ownerVisibility,
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
          type="simple"
          title={title}
          coverImg={coverImg}
          goBackPage={backToLobby}
          infoPage={() => setCurrentGameState(Game.Info)}
          turnVisibility={turnVisibility}
          ownerVisibility={ownerVisibility}
          gamePage={endOfGame}
        />
      );

    case Game.Info:
      return (
        <InfoPage
          title={title}
          coverImg={coverImg}
          description={description}
          coverPage={() => setCurrentGameState(Game.Cover)}
        />
      );
  }
}
