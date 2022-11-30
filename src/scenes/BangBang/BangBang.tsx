import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socketConnection from '../../lib/socket';
import Background from '../../components/Background';
import { CoverPage } from './Cover';
import { InfoPage } from './Info';
import { RankingPage } from './Ranking';
import { GamePage } from './Game';

const bangBangRoom = '1';

enum Game {
  Cover,
  Info,
  Game,
  Ranking,
}

const BangBangEvents = {
  StartTimer: 'start_timer',
  Result: 'bangbang_result',
  FireEvent: 'shot',
  FinalRanking: 'bangbang_ranking',
};

export function BangBang() {
  const [currentGameState, setCurrentGameState] = useState<Game>(Game.Cover);
  const [ready, setReady] = useState(false);
  const [currentRanking, setCurrentRanking] = useState([]);
  const [finalRanking, setFinalRanking] = useState(false);
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const bangBangRoom = userData.roomCode;

  const [msTimer, setMsTimer] = useState(5000);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(
    ButtonStatus.disabled
  );
  const [timer, setTimer] = useState<NodeJS.Timer>();
  const [winnerStatus, setWinnerStatus] = useState<WinnerStatus>(
    WinnerStatus.waiting
  );

  // const {user_id} = useGlobalContext()

  const navigateTo = useNavigate();
  const socketConn = socketConnection.getInstance();

  useEffect(() => {
    socketConn.addEventListener('room-is-moving-to', (destination) => {
      //TODO: verificar onde enviar evento para mover sala
      console.log(`Movendo a sala para ${destination}.`);
      navigateTo(destination);
    });

    return () => {
      socketConn.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    socketConn.onMessageReceived(({ message, ranking }) => {
      switch (message) {
        case BangBangEvents.StartTimer:
          setReady(true);
          break;
        case BangBangEvents.Result:
          setCurrentRanking(ranking);
          break;
        case BangBangEvents.FinalRanking:
          setCurrentRanking(ranking);
          setFinalRanking(true);
      }
    });
  }, []);

  useEffect(() => {
    if (msTimer <= 0 && buttonStatus === ButtonStatus.disabled) {
      setButtonStatus(ButtonStatus.enabled);
    }
  }, [setButtonStatus, buttonStatus, msTimer]);

  useEffect(() => {
    if (winnerStatus === WinnerStatus.won) {
      setTimeout(() => {
        console.log('Encerrando o jogo Bang Bang.'); //TODO: o destino não necessariamente é o Lobby. Quando houver mais jogos deve haver a opção de retornar ao lobby ou a de voltar à roleta
        socketConn.push('move-room-to', {
          roomCode: userData.roomCode,
          destination: '/Lobby',
        });
      }, 3000);
    }
  }, [currentGameState]);

  const handleShot = (msTimer) => {
    socketConn.pushMessage(bangBangRoom, BangBangEvents.FireEvent, {
      time: msTimer,
    });
  };

  switch (currentGameState) {
    case Game.Cover:
      return (
        <CoverPage
          infoPage={() => setCurrentGameState(Game.Info)}
          gamePage={() => setCurrentGameState(Game.Game)}
        />
      );
    case Game.Info:
      return (
        <InfoPage
          coverPage={() => setCurrentGameState(Game.Cover)}
          gamePage={() => setCurrentGameState(Game.Game)}
        />
      );
    case Game.Game:
      return (
        <GamePage
          ready={ready}
          shot={handleShot}
          rankingPage={() => setCurrentGameState(Game.Ranking)}
        />
      );
    case Game.Ranking:
      return (
        <RankingPage
          data={currentRanking}
          gamePage={() => setCurrentGameState(Game.Game)}
          finishPage={() => navigateTo('/Home')}
          finalRanking={finalRanking}
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
