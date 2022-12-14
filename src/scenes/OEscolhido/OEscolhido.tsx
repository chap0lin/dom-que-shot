import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SocketConnection from '../../lib/socket';
import Background from '../../components/Background';
import CoverPage from '../../components/Game/Cover';
import InfoPage from '../../components/Game/Info';
import GamePage from './Game';
import FinishPage from './Finish';
import AwaitingResults from './Awaiting';
import coverImg from '../../assets/game-covers/o-escolhido.png';
import './OEscolhido.css';

interface ListedPlayerProps {
  nickname: string;
  avatarSeed: string;
  id: number;
}

interface VotedPlayerProps {
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
      }
      setMsTimer(updatedMs);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////

  const navigate = useNavigate();
  const ownerVisibility = useLocation().state.isOwner;
  const turnVisibility = useLocation().state.isYourTurn;
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [currentGameState, setCurrentGameState] = useState<Game>(Game.Cover);
  const [votedPlayers, setVotedPlayers] = useState<VotedPlayerProps[]>([]);
  const [playerList, updatePlayerList] = useState<ListedPlayerProps[]>([]);

  const description = (
    <>
      Neste jogo, cada participante vai jogar com o seu aparelho.
      <br />
      <br />
      Aparecer?? uma lista com todos os participantes da sala e cada um votar?? em
      uma pessoa da lista para virar uma dose.
      <br />
      <br />
      Boa sorte!
    </>
  );

  const nextRound = () => {
    socket.push('update-turn', userData.roomCode);
    clearInterval(timer);
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/SelectNextGame',
    });
  };

  const backToLobby = () => {
    console.log('O usu??rio desejou voltar ao lobby');
    clearInterval(timer);
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/Lobby',
    });
  };

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.setLobbyUpdateListener(updatePlayerList);
    socket.push('lobby-update', userData.roomCode);

    socket.addEventListener('vote-results', (mostVotedPlayers) => {
      console.log(
        'resultados da vota????o dispon??veis. Jogadores mais votados: '
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

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (currentGameState === Game.Game) {
      socket.push('move-room-to', {
        roomCode: userData.roomCode,
        destination: Game.Game,
      });
      startTimer();
    } else if (currentGameState === Game.AwaitingResults) {
      const votedPlayer = window.localStorage.getItem('voted-player');

      socket.pushMessage(userData.roomCode, 'voted-player', {
        roomCode: userData.roomCode,
        player: votedPlayer,
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
          type="round"
          title={title}
          coverImg={coverImg}
          goBackPage={backToLobby}
          turnVisibility={turnVisibility}
          ownerVisibility={ownerVisibility}
          infoPage={() => setCurrentGameState(Game.Info)}
          gamePage={() => setCurrentGameState(Game.Game)}
        />
      );

    case Game.Info:
      return (
        <InfoPage
          title={title}
          description={description}
          coverImg={coverImg}
          coverPage={() => setCurrentGameState(Game.Cover)}
          gamePage={() => setCurrentGameState(Game.Game)}
          turnVisibility={turnVisibility}
        />
      );

    case Game.Game:
      return (
        <GamePage
          msTimeLeft={msTimer}
          playerList={playerList}
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
          turnVisibility={turnVisibility}
          roulettePage={() => nextRound()}
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
