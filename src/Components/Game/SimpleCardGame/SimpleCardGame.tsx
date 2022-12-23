import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SocketConnection from '../../../lib/socket';
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
  sizeOfDescription?: number;
  coverImg: string;
}

export default function SimpleCardGame({
  title,
  description,
  sizeOfDescription,
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
          description={description} //full game info is now loaded here
          sizeOfDescription={sizeOfDescription}
          turnVisibility={turnVisibility}
          ownerVisibility={ownerVisibility}
          gamePage={endOfGame}
        />
      );

    case Game.Info: //TODO Rafa, change this to the 'kickstart' game page (full game info is now already provided on the Game.Cover)
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
