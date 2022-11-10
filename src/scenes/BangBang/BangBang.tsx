import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socketConnection from '../../lib/socket';
import './BangBang.css';
import targetImage from '../../assets/BangBang/target.png';
import balloon1 from '../../assets/BangBang/balao1.png';
import balloon2 from '../../assets/BangBang/balao2.png';
import balloon3 from '../../assets/BangBang/balao3.png';
import balloonReady from '../../assets/BangBang/balao-prontos.png';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
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
  const bangBangRoom = '1';

  const [msTimer, setMsTimer] = useState(5000);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(
    ButtonStatus.disabled
  );
  const [timer, setTimer] = useState<NodeJS.Timer>();
  const [winnerStatus, setWinnerStatus] = useState<WinnerStatus>(
    WinnerStatus.waiting
  );

  const [balloonImg, setBalloonImg] = useState(balloonReady);

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
    socketConn.joinRoom(userData);
    socketConn.pushMessage(bangBangRoom, 'player_ready', '');
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

  const animationBalloon = () => {
    const timeline = gsap.timeline()
    timeline
      .to('.animation-balloon', { opacity: 1, duration: 0.5 })
      .to('.animation-balloon', { opacity: 0, duration: 1.0 }).call( () => {
        setBalloonImg(balloon3)
      })
      .to('.animation-balloon', { opacity: 1, duration: 0.2 })
      .to('.animation-balloon', { opacity: 0, duration: 1.0 }).call( () => {
        setBalloonImg(balloon2)
      })
      .to('.animation-balloon', { opacity: 1, duration: 0.2 })
      .to('.animation-balloon', { opacity: 0, duration: 1.0 }).call( () => {
        setBalloonImg(balloon1)
      })
      .to('.animation-balloon', { opacity: 1, duration: 0.2 })
      .to('.animation-balloon', { opacity: 0, duration: 1.0 })
        setBalloonImg(balloonReady)
  }


  return (
    <div id="game-bang-bang" className="container">
      <div className="cronometer-container" onClick={animationBalloon}>
        <h2>{`${formatedTime()}s`}</h2>
      </div>

      <img src={targetImage} alt="Target image" className="target-image" />

      <div className="animation-balloon">
        <img src={balloonImg}/>
      </div>

      <button className='button-bang' onClick={handleClick} disabled={!buttonStatus}>
      </button>

      <Link to="/Ranking">Ranking</Link>

      {winnerStatus !== WinnerStatus.waiting && (
        <p>You {winnerStatus === WinnerStatus.won ? 'won' : 'lost'}!</p>
      )}
    </div>
  );
};

export { BangBang };
