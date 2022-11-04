import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';
import gsap from 'gsap';
import './Finish.css';

interface votedPlayerProps {
  nickname: string;
  avatarSeed: string;
}

interface coverProps {
  votedPlayer: votedPlayerProps[];
  coverPage: any;
}

export default function FinishPage({ votedPlayer, coverPage }: coverProps) {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from('.ResultsOuterCard', {
      opacity: 0,
      xPercent: 100,
      duration: 1,
      ease: 'back',
    });
    gsap.from('.ResultsInnerCard', {
      opacity: 0,
      xPercent: -400,
      duration: 1,
      ease: 'back',
    });
    gsap.from('.ResultsAvatar', {
      opacity: 0,
      rotation: 180,
      delay: 1,
      duration: 1,
      ease: 'back',
    });
    gsap.from('.Nickname', { opacity: 0, delay: 1, duration: 1 });
    gsap.from('.ResultsButtons', { opacity: 0, duration: 1, delay: 2 });
  }, []);

  if (votedPlayer.length == 1) {
    return (
      <Background>
        <Header goBackArrow={coverPage} />
        <div className="OEscolhidoDiv">
          <p className="ResultsTitle">E o mais votado foi:</p>
          <div className="ResultsOuterCard">
            <p className="ResultsText" />
            <div className="ResultsInnerCard">
              <p className="ResultsText" />
              <div className="ResultsAvatar">
                <Avatar seed={votedPlayer.at(0).avatarSeed} />
              </div>
              <p className="ResultsText Nickname">
                {votedPlayer.at(0).nickname}
              </p>
            </div>
            <p className="ResultsText">8 Votos</p>
          </div>
          <div className="ResultsButtons">
            <Button>
              <div
                onClick={() => {
                  navigate('/Home');
                }}>
                Finalizar
              </div>
            </Button>
            <div className="ResultsButtonsSpacer" />
            <Button>
              <div onClick={coverPage}>Jogar Novamente</div>
            </Button>
          </div>
        </div>
      </Background>
    );
  }

  return (
    <Background>
      <Header />
      <div className="OEscolhidoDiv">
        <p className="ResultsTitle">Tivemos um empate!</p>
        <div className="Tie">
          <div className="ResultsOuterCard TieOuter">
            <p className="ResultsText TieText" />
            <div className="ResultsInnerCard TieInner">
              <div className="ResultsAvatar TieAvatar">
                <Avatar seed={votedPlayer.at(0).avatarSeed} />
              </div>
              <p className="ResultsText TieText Nickname">
                {votedPlayer.at(0).nickname}
              </p>
            </div>
            <p className="ResultsText TieText">8 Votos</p>
          </div>
          <div className="TieSpacer" />
          <div className="ResultsOuterCard TieOuter">
            <p className="ResultsText TieText" />
            <div className="ResultsInnerCard TieInner">
              <div className="ResultsAvatar TieAvatar">
                <Avatar seed={votedPlayer.at(1).avatarSeed} />
              </div>
              <p className="ResultsText TieText Nickname">
                {votedPlayer.at(1).nickname}
              </p>
            </div>
            <p className="ResultsText TieText">8 Votos</p>
          </div>
        </div>
        <p className="ResultsText TieTitle">
          Neste caso, todos os empatados devem beber!
        </p>
        <div className="ResultsButtons">
          <Button>
            <div
              onClick={() => {
                navigate('/Home');
              }}>
              Finalizar
            </div>
          </Button>
          <div className="ResultsButtonsSpacer" />
          <Button>
            <div onClick={coverPage}>Jogar Novamente</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
