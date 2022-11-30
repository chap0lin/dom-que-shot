import { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import targetImage from '../../../assets/BangBang/target.png';
import balloon1 from '../../../assets/BangBang/balao1.png';
import balloon2 from '../../../assets/BangBang/balao2.png';
import balloon3 from '../../../assets/BangBang/balao3.png';
import balloonReady from '../../../assets/BangBang/balao-prontos.png';
import gsap from 'gsap';
import './BangBang.css';
import Background from '../../../components/Background';

enum ButtonStatus {
  enabled = 1,
  disabled = 0,
  used = -1,
}

interface GameProps {
  rankingPage: () => void;
  shot: (ms: number) => void;
  ready: boolean;
}

export function GamePage({ rankingPage, shot, ready }: GameProps) {
  const [msTimer, setMsTimer] = useState(5000);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(
    ButtonStatus.disabled
  );
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const [balloonImg, setBalloonImg] = useState(balloonReady);

  const startTimer = () => {
    setTimer(setInterval(run, 10));
  };

  useEffect(() => {
    if (ready) {
      startTimer();
      animationBalloon();
    }
  }, [ready]);

  let updatedMs = msTimer;
  const run = () => {
    updatedMs -= 10;
    return setMsTimer(updatedMs);
  };

  useEffect(() => {
    if (msTimer <= 0 && buttonStatus === ButtonStatus.disabled) {
      setButtonStatus(ButtonStatus.enabled);
    }
  }, [setButtonStatus, buttonStatus, msTimer]);

  useEffect(() => {
    if (msTimer <= -10000) {
      clearInterval(timer);
      shot(-10000);
      rankingPage();
    }
  }, [msTimer]);

  const formatedTime = (): number => {
    if (msTimer > 0) {
      return 10000;
    }
    return 10000 + msTimer;
  };

  const animationBalloon = () => {
    const timeline = gsap.timeline();
    timeline
      .to('.animation-balloon', { opacity: 1, duration: 0.5 })
      .to('.animation-balloon', { opacity: 0, duration: 1.0 })
      .call(() => {
        setBalloonImg(balloon3);
      })
      .to('.animation-balloon', { opacity: 1, duration: 0.5 })
      .to('.animation-balloon', { opacity: 0, duration: 1.0 })
      .call(() => {
        setBalloonImg(balloon2);
      })
      .to('.animation-balloon', { opacity: 1, duration: 0.5 })
      .to('.animation-balloon', { opacity: 0, duration: 1.0 })
      .call(() => {
        setBalloonImg(balloon1);
      })
      .to('.animation-balloon', { opacity: 1, duration: 0.5 })
      .to('.target-image', { opacity: 1, duration: 0 })
      .to('.animation-balloon', { opacity: 0, duration: 1.0 });
    setBalloonImg(balloonReady);
  };

  const handleClick = () => {
    shot(msTimer);
    clearInterval(timer);
    setButtonStatus(ButtonStatus.used);
    rankingPage();
  };

  return (
    <Background>
      <div id="game-bang-bang" className="container">
        <Header timer={formatedTime()} />

        <div className="target-image">
          <img src={targetImage} alt="Target image" />
        </div>

        <div className="container-baloon">
          <div className="animation-balloon">
            <img src={balloonImg} />
          </div>
        </div>

        <button
          className="button-bang"
          onClick={handleClick}
          disabled={buttonStatus !== ButtonStatus.enabled}></button>
      </div>
    </Background>
  );
}
