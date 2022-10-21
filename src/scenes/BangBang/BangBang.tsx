import { useState, useEffect } from 'react';
import { SocketConnection } from '../../lib/socket';
import { useNavigate } from 'react-router-dom';
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
  const [msTimer, setMsTimer] = useState(5000);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(
    ButtonStatus.disabled
  );
  const [timer, setTimer] = useState<NodeJS.Timer>();
  const [winnerStatus, setWinnerStatus] = useState<WinnerStatus>(
    WinnerStatus.waiting
  );

  // const {user_id} = useGlobalContext()

  const socketConn = SocketConnection.getInstance();
  const navigateTo = useNavigate();

  const startTimer = () => {
    setTimer(setInterval(run, 10));
  };

  let updatedMs = msTimer;
  const run = () => {
    updatedMs -= 10;
    return setMsTimer(updatedMs);
  };

  useEffect(() => {
    socketConn.pushMessage('1', 'player_ready');
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
    if (winnerStatus !== WinnerStatus.waiting) {
      setTimeout(() => {
        navigateTo(-1);
      }, 3000);
    }
  }, [setWinnerStatus, winnerStatus]);

  const formatedTime = (): string => {
    return (msTimer / 1000).toFixed(2);
  };

  const handleClick = () => {
    clearInterval(timer);
    socketConn.pushMessage('1', BangBangEvents.FireEvent, { time: msTimer });
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
