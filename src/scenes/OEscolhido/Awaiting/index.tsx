import React, { useEffect } from 'react';
import { CheckCircle } from 'react-feather';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';
import gsap from 'gsap';
import './Awaiting.css';

interface votedPlayerProps {
  nickname: string;
  avatarSeed: string;
}

interface awaitingProps {
  votedPlayer: votedPlayerProps[];
  msTimeLeft: number;
  gamePage: any;
  finishPage: any;
}

export default function AwaitingResults({
  votedPlayer,
  gamePage,
  msTimeLeft,
}: awaitingProps) {
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
    <Background>
      <Header timer={msTimeLeft} />
      <div className="OEscolhidoDiv">
        <p className="AwaitingTitle">Você votou!</p>

        <div className="AwaitingCheck">
          <CheckCircle color="lime" width="100%" height="100%" />
        </div>

        <div className="AwaitingOuterCard">
          <div className="AwaitingInnerCard">
            <div className="AwaitingAvatar">
              <Avatar seed={votedPlayer.at(0).avatarSeed} />
            </div>
            <p className="AwaitingText">{votedPlayer.at(0).nickname}</p>
          </div>
        </div>
        <div className="ChangeVoteButton">
          <p className="AwaitingText">Aguardando os demais jogadores...</p>
          <Button>
            <div onClick={voteAgain}>Alterar voto</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
