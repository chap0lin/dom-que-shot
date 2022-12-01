import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socketConnection from '../../../lib/socket';
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

export default function SimpleCardGame({title, description, coverImg} : SimpleCardGameProps) {

  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [currentGameState, setCurrentGameState] = useState<Game>(Game.Cover);
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
          isYourTurn: Math.round(Math.random()) === 0 ? true : false,
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
          type='simple'
          title={title}
          coverImg={coverImg}
          goBackPage={backToLobby}
          infoPage={() => setCurrentGameState(Game.Info)}
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

    default:
      return (
        <Background>
          <div>Algo deu errado.</div>
        </Background>
      );
  }
}
