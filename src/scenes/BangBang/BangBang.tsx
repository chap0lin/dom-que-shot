import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socketConnection from '../../lib/socket';
// import { useGlobalContext } from '../../contexts/GlobalContextProvider';

enum ButtonStatus {
  enabled = 1,
  disabled = 0,
}

enum WinnerStatus {
  won = 1,
  lost = -1,
  waiting = 0,
}

const BangBangEvents = {
  StartTimer: 'start_timer',
  Result: 'bangbang_result',
  FireEvent: 'shot',
};

const BangBang = () => {
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

  const startTimer = () => {
    setTimer(setInterval(run, 10));
  };

  let updatedMs = msTimer;
  const run = () => {
    updatedMs -= 10;
    return setMsTimer(updatedMs);
  };

  useEffect(() => {
    socketConn.pushMessage(bangBangRoom, 'player_ready', '');
    socketConn.addEventListener('room-is-moving-to', (destination) => {
      console.log(`Movendo a sala para ${destination}.`);
      navigateTo(destination);
    });

    return () => {
      socketConn.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    socketConn.onMessageReceived(({ message, id }) => {
      switch (message) {
        case BangBangEvents.StartTimer:
          startTimer();
          break;
        case BangBangEvents.Result:
          if (id === socketConn.getSocketId()) {
            setWinnerStatus(WinnerStatus.won);
          } else {
            setWinnerStatus(WinnerStatus.lost);
          }
          break;
        default:
        // unhandled events
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
  }, [winnerStatus]);

  const formatedTime = (): string => {
    return (msTimer / 1000).toFixed(2);
  };

  const handleClick = () => {
    clearInterval(timer);
    socketConn.pushMessage(bangBangRoom, BangBangEvents.FireEvent, {
      time: msTimer,
    });
  };

  return (
    <div>
      <h2>{formatedTime()}</h2>
      <p data-testid="label" style={{ color: msTimer >= 0 ? 'red' : 'green' }}>
        Bang Bang
      </p>
      <button onClick={handleClick} disabled={!buttonStatus}>
        Click
      </button>
      {winnerStatus !== WinnerStatus.waiting && (
        <p>You {winnerStatus === WinnerStatus.won ? 'won' : 'lost'}!</p>
      )}
    </div>
  );
};

export { BangBang };
