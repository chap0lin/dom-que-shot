import React, { useEffect } from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import gsap from 'gsap';
import './Cover.css';

interface coverProps {
  title: string;
  coverImg: string;
  infoPage: () => void;
  gamePage: () => void;
  goBackPage: () => void;
}

export default function CoverPage({
  title,
  coverImg,
  infoPage,
  gamePage,
  goBackPage,
}: coverProps) {
  useEffect(() => {
    gsap.from('.CoverDiv', {
      rotation: -45,
      scale: 0,
      duration: 1,
      ease: 'bounce',
    });
    gsap.from('.CoverTitle', { opacity: 0, duration: 1, delay: 1.25 });
    gsap.from('.CoverImage', {
      rotation: 45,
      scale: 0,
      duration: 1,
      delay: 0.25,
      ease: 'bounce',
    });
    gsap.from('.CoverStartButton', {
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
      <Header goBackArrow={goBackPage} infoPage={infoPage} />
      <div className="OEscolhidoDiv">
        <div className="CoverDiv">
          <img className="CoverImage" src={coverImg} />
          <p className="CoverTitle">{title}</p>
        </div>
        <div className="CoverStartButton">
          <Button>
            <div onClick={gamePage}>Começar</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
