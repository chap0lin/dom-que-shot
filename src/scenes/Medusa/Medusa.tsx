import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coverImg from '../../assets/game-covers/medusa.png';
import socketConnection from '../../lib/socket';
import Background from '../../components/Background';
import CoverPage from './Cover';
import InfoPage from './Info';
import './Medusa.css';

enum Game {
  Cover,
  Info,
}

export default function BichoBebe() {
  const [currentGameState, setCurrentGameState] = useState<Game>(Game.Cover);
  const title = 'Medusa';
  const navigate = useNavigate();

  const endOfGame = () => {
    navigate('/SelectNextGame');
  };

  // //SOCKET////////////////////////////////////////////////////////////////////////////////////////////

  //     let socket = socketConnection.getInstance();

  //     useEffect(() => {
  //         socket.setLobbyUpdateListener(updatePlayerList);
  //         socket.send('lobby-update', userData.roomCode);

  //         socket.addEventListener('vote-results', (mostVotedPlayers) => {
  //         console.log(
  //             'resultados da votação disponíveis. Jogadores mais votados: '
  //         );
  //         const result = JSON.parse(mostVotedPlayers);
  //         console.log(result);
  //         setCurrentGameState(Game.Finish);
  //         setVotedPlayers(result);
  //         });

  //         socket.addEventListener('room-is-moving-to', (destination) => {
  //         if (typeof destination === 'string') {
  //             if (destination === '/OEscolhido') {
  //             updatedMs = msTimer;
  //             return setCurrentGameState(Game.Cover);
  //             }
  //             return navigate(destination);
  //         }
  //         setCurrentGameState(destination);
  //         });
  //     }, []);

  // //////////////////////////////////////////////////////////////////////////////////////////////////////

  switch (currentGameState) {
    case Game.Cover:
      return (
        <CoverPage
          title={title}
          coverImg={coverImg}
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
          endPage={endOfGame}
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
