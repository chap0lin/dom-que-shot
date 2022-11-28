import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coverImg from '../../assets/game-covers/eu-nunca.png';
import socketConnection from '../../lib/socket';
import Background from '../../components/Background';
import CoverPage from './Cover';
import InfoPage from './Info';
import GamePage from './Game';
import './EuNunca.css';

enum Game {
  Cover,
  Info,
  Game,
}

export default function EuNunca() {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [currentGameState, setCurrentGameState] = useState<Game>(Game.Cover);

  const title = 'Eu Nunca';
  const navigate = useNavigate();

  const endOfGame = () => {
    navigate('/WhoDrank', {
      state: {
        //apagar estas linhas e deixar somente o que está comentado (descomentado, obviamente) quando for integrar ao resto do código
        coverImg: coverImg,
      },
    });
    // socket.push('move-room-to', {
    //   roomCode: userData.roomCode,
    //   destination: '/WhoDrank',
    // });
  };

  const backToLobby = () => {
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/Lobby',
    });
  };

  const [euNuncaSuggestions, setEuNuncaSuggestions] = useState<string[]>();

  //SOCKET////////////////////////////////////////////////////////////////////////////////////////////

  const socket = socketConnection.getInstance();

  useEffect(() => {
    socket.connect();
    socket.addEventListener('room-is-moving-to', (destination) => {
      navigate(destination, {
        state: {
          coverImg: coverImg,
        },
      });
    });

    socket.addEventListener('eu-nunca-suggestions', (suggestions) => {
      console.log('Recebidas as sugestões de Eu Nunca do backend.');
      setEuNuncaSuggestions(suggestions);
    });

    socket.push('eu-nunca-suggestions', 'please');

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
          endPage={() => setCurrentGameState(Game.Game)}
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

    case Game.Game:
      return (
        <GamePage
          suggestions={euNuncaSuggestions}
          finishPage={endOfGame}
          coverImg={coverImg}
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
