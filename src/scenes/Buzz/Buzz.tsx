import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coverImg from '../../assets/game-covers/buzz.png';
import socketConnection from '../../lib/socket';
import Background from '../../components/Background';
import CoverPage from './Cover';
import InfoPage from './Info';
import WhoDrankPage from './WhoDrank';
import './Buzz.css';

enum Game {
  Cover,
  Info,
  WhoDrank,
}
interface listedPlayerProps {
  nickname: string;
  avatarSeed: string;
  id: number;
}

export default function Buzz() {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [playerList, updatePlayerList] = useState<listedPlayerProps[]>([]);
  const [currentGameState, setCurrentGameState] = useState<Game>(Game.Cover);

  const title = 'Buzz';
  const navigate = useNavigate();

  const endOfGame = () => {
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/SelectNextGame',
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
    socket.setLobbyUpdateListener(updatePlayerList);
    //socket.send('lobby-update', userData.roomCode);

    socket.addEventListener('room-is-moving-to', (destination) => {
      if (typeof destination === 'string') {
        return navigate(destination);
      }
      setCurrentGameState(destination);
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
          infoPage={() => setCurrentGameState(Game.Info)}
          endPage={() => setCurrentGameState(Game.WhoDrank)}
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

    case Game.WhoDrank:
      return (
        <WhoDrankPage
          coverImg={coverImg}
          playerList={playerList}
          finishPage={endOfGame}
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
