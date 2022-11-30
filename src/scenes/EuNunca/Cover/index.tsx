import React, { useEffect } from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import gsap from 'gsap';
import './Cover.css';

interface coverProps {
  title: string;
  coverImg: string;
  infoPage: any;
  endPage: any;
  turnVisibility: boolean;
}

export default function CoverPage({
  title,
  coverImg,
  infoPage,
  endPage,
  turnVisibility,
}: coverProps) {
  useEffect(() => {
    gsap.from('.EuNuncaCoverDiv', {
      duration: 2,
      xPercent: 10,
      scale: 0.5,
      rotate: 45,
      ease: 'elastic',
    });
    gsap.from('.EuNuncaCoverTitle', { opacity: 0, duration: 1, delay: 1.25 });
    gsap.from('.EuNuncaCoverImage', {
      xPercent: -10,
      duration: 2,
      scale: 0.5,
      rotate: 45,
      delay: 0.25,
      ease: 'elastic',
    });
    gsap.from('.EuNuncaCoverStartButton', {
      opacity: 0,
      scale: 0,
      yPercent: -600,
      duration: 1.5,
      delay: 1,
      ease: 'power3',
    });
  }, []);

  return (
    <Background>
      <Header goBackArrow infoPage={infoPage} />
      <div className="EuNuncaDiv">
        <div className="EuNuncaCoverDiv">
          <img className="EuNuncaCoverImage" src={coverImg} />
          <p className="EuNuncaCoverTitle">{title}</p>
        </div>
        <div
          className="EuNuncaCoverStartButton"
          style={
            turnVisibility === true
              ? { visibility: 'visible' }
              : { visibility: 'hidden' }
          }>
          <Button>
            <div onClick={endPage}>Começar jogo</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
