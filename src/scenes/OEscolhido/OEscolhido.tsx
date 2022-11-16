import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socketConnection from '../../lib/socket';
import Background from '../../components/Background';
import CoverPage from './Cover';
import InfoPage from './Info';
import GamePage from './Game';
import FinishPage from './Finish';
import AwaitingResults from './Awaiting';
import coverImg from '../../assets/game-covers/o-escolhido.png';
import './OEscolhido.css';

interface listedPlayerProps {
  nickname: string;
  avatarSeed: string;
  id: number;
}
interface votedPlayerProps {
  nickname: string;
  avatarSeed: string;
  votes: number;
}

enum Game {
  Cover,
  Info,
  Game,
  AwaitingResults,
  Finish,
}

export default function OEscolhido() {
  const title = 'O Escolhido';
  const information = (
    <>
      Neste jogo, cada participante vai jogar com o seu aparelho.
      <br />
      <br />
      Aparecerá uma lista com todos os participantes da sala e cada um votará em
      uma pessoa da lista para virar uma dose.
      <br />
      <br />
      Boa sorte!
    </>
  );

  //TIMER//////////////////////////////////////////////////////////////////////////////////////

  const gameTime = 10000;

  const [msTimer, setMsTimer] = useState(gameTime);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const startTimer = () => {
    setTimer(setInterval(run, 10));
  };

  let updatedMs = msTimer;
  const run = () => {
    if (updatedMs > 0) {
      updatedMs -= 10;
      if (updatedMs === 0) {
        console.log('Acabou o tempo.');
        socket.pushMessage(userData.roomCode, 'vote-results', null);
        //socket.send('vote-results', userData.roomCode);
      }
      setMsTimer(updatedMs);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////

  const navigate = useNavigate();
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [currentGameState, setCurrentGameState] = useState<Game>(Game.Cover);
  const [votedPlayers, setVotedPlayers] = useState<votedPlayerProps[]>([
    //contém o(s) jogador(es) mais votado(s)
    {
      nickname: 'Dom Que Shot',
      avatarSeed: 'dqxt',
      votes: 5,
    },
  ]);

  const [playerList, updatePlayerList] = useState<listedPlayerProps[]>([
    {
      avatarSeed: userData ? userData.avatarSeed : 'Dom que shot',
      nickname: userData ? userData.nickname : 'Dom quixote',
      id: 0,
    },
    {
      avatarSeed: 'sanchopança',
      nickname: 'Sancho Pança',
      id: 1,
    },
    {
      avatarSeed: 'dcna',
      nickname: 'Dulcineia',
      id: 2,
    },
  ]);

  const playAgain = () => {
    clearInterval(timer);
    setMsTimer(gameTime);
    console.log('O usuário pediu para jogar novamente.');
    socket.send('start-game', {roomCode: userData.roomCode, gameName: 'O Escolhido'});
    socket.send('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/OEscolhido',
    });
  };

  const backToLobby = () => {
    console.log('O usuário desejou voltar ao lobby');
    clearInterval(timer);
    socket.send('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/Lobby',
    });
  };

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  let socket = socketConnection.getInstance();

  useEffect(() => {
    socket.setLobbyUpdateListener(updatePlayerList);
    socket.send('lobby-update', userData.roomCode);

    socket.addEventListener('vote-results', (mostVotedPlayers) => {
      console.log(
        'resultados da votação disponíveis. Jogadores mais votados: '
      );
      const result = JSON.parse(mostVotedPlayers);
      console.log(result);
      setCurrentGameState(Game.Finish);
      setVotedPlayers(result);
    });

    socket.addEventListener('room-is-moving-to', (destination) => {
      if (typeof destination === 'string') {
        if (destination === '/OEscolhido') {
          updatedMs = msTimer;
          return setCurrentGameState(Game.Cover);
        }
        return navigate(destination);
      }
      setCurrentGameState(destination);
    });
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (currentGameState === Game.Game) {
      socket.send('move-room-to', {
        roomCode: userData.roomCode,
        destination: Game.Game,
      });
      startTimer();
    } else if (currentGameState === Game.AwaitingResults) {
      const votedPlayer = window.localStorage.getItem('voted-player');
      console.log(votedPlayer);

      socket.pushMessage(userData.roomCode, 'voted-player', {
        roomCode: userData.roomCode, player: votedPlayer,
      });

    } else if (currentGameState === Game.Finish) {
      clearInterval(timer);
      setMsTimer(gameTime);
    }
  }, [currentGameState]);

  switch (currentGameState) {
    case Game.Cover:
      return (
        <CoverPage
          title={title}
          coverImg={coverImg}
          infoPage={() => setCurrentGameState(Game.Info)}
          gamePage={() => setCurrentGameState(Game.Game)}
        />
      );

    case Game.Info:
      return (
        <InfoPage
          info={information}
          coverImg={coverImg}
          coverPage={() => setCurrentGameState(Game.Cover)}
          gamePage={() => setCurrentGameState(Game.Game)}
        />
      );

    case Game.Game:
      return (
        <GamePage
          msTimeLeft={msTimer}
          playerList={playerList}
          //coverPage={() => setCurrentGameState(Game.Cover)}
          finishPage={() => setCurrentGameState(Game.AwaitingResults)}
        />
      );

    case Game.AwaitingResults:
      return (
        <AwaitingResults
          msTimeLeft={msTimer}
          gamePage={() => setCurrentGameState(Game.Game)}
          finishPage={() => setCurrentGameState(Game.Finish)}
        />
      );

    case Game.Finish:
      return (
        <FinishPage
          votedPlayer={votedPlayers}
          coverPage={() => playAgain()}
          endGamePage={() => backToLobby()}
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


// socket.send('voted-player', {
//   roomCode: userData.roomCode,
//   player: votedPlayer,
// });