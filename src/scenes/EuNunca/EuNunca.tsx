import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coverImg from '../../assets/game-covers/eu-nunca.png';
import socketConnection from '../../lib/socket';
import Background from '../../components/Background';
import CoverPage from '../../components/Game/Cover';
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
  const [turnVisibility, setTurnVisibility] = useState<boolean>(false); //TODO trocar para isMyTurn = useLocation().state.isYourTurn

  let isMyTurn = false;
  const title = 'Eu Nunca';
  const navigate = useNavigate();

  const startGame = () => {
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: Game.Game,
    });
    isMyTurn = true; //TODO remover estas duas linhas quando adequar aos fluxos do owner e do jogador da vez
    setTurnVisibility(true); //
  };

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

  const [euNuncaSuggestions, setEuNuncaSuggestions] = useState<string[]>();

  //SOCKET////////////////////////////////////////////////////////////////////////////////////////////

  const socket = socketConnection.getInstance();

  useEffect(() => {
    socket.connect();
    socket.addEventListener('room-is-moving-to', (destination) => {
      if (typeof destination === 'string') {
        return navigate(destination, {
          state: {
            coverImg: coverImg,
            isYourTurn: Math.round(Math.random()) === 0 ? true : false, //TODO adequar aos fluxos do owner e do jogador da vez
            isOwner: true, //aqui também, claro
          },
        });
      }
      setCurrentGameState(destination);
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
          type="dynamic"
          title={title}
          coverImg={coverImg}
          goBackPage={backToLobby}
          infoPage={() => setCurrentGameState(Game.Info)}
          gamePage={startGame}
          //turnVisibility={true} //TODO alterar para turnVisibility quando integrar ao resto do código
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
          turnVisibility={turnVisibility}
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
