import React, { useEffect } from 'react';
import { CheckCircle } from 'react-feather';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';
import PingTracker from '../../../components/Debug/PingTracker';
import gsap from 'gsap';
import './Awaiting.css';
interface AwaitingProps {
  msTimeLeft: number;
  gamePage: () => void;
  finishPage: () => void;
}

export default function AwaitingResults({
  gamePage,
  msTimeLeft,
}: AwaitingProps) {
  const votedPlayer = JSON.parse(window.localStorage.getItem('voted-player'));

  useEffect(() => {
    gsap.from('.AwaitingTitle, .AwaitingCheck', {
      opacity: 0,
      yPercent: 600,
      delay: 0.25,
      duration: 1,
      ease: 'power1',
    });
    gsap.from('.AwaitingOuterCard', {
      scale: 0,
      rotation: 45,
      opacity: 0,
      duration: 1,
      ease: 'power3',
    });
    gsap.from('.ChangeVoteButton', { opacity: 0, duration: 1, delay: 1 });
  }, []);

  const voteAgain = () => {
    gamePage();
  };

  return (
    <Background noImage>
      <Header timer={msTimeLeft} />
      <div className="OEscolhidoDiv">
        <p className="AwaitingTitle">Você votou!</p>

        <div className="AwaitingCheck">
          <CheckCircle color="lime" width="100%" height="100%" />
        </div>

        <div className="AwaitingOuterCard">
          <div className="AwaitingInnerCard">
            <div className="AwaitingAvatar">
              <Avatar seed={votedPlayer.avatarSeed} />
            </div>
            <p className="AwaitingText">{votedPlayer.nickname}</p>
          </div>
        </div>
        <div className="ChangeVoteButton">
          <p className="AwaitingText">Aguardando os demais jogadores...</p>
          {/* sumir com o div abaixo quando for possível alterar o voto */}
          <div style={{ display: 'none' }}>
            <Button onClick={voteAgain}>Alterar voto</Button>
          </div>
        </div>
      </div>
      <PingTracker />
    </Background>
  );
}
