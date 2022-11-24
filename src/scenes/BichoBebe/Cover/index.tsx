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
}

export default function CoverPage({
  title,
  coverImg,
  infoPage,
  endPage,
}: coverProps) {
  useEffect(() => {
    gsap.from('.BichoBebeCoverDiv', {
      duration: 2,
      yPercent: 100,
      ease: 'elastic',
    });
    gsap.from('.BichoBebeCoverTitle', { opacity: 0, duration: 1, delay: 1.25 });
    gsap.from('.BichoBebeCoverImage', {
      yPercent: 100,
      duration: 2,
      delay: 0.25,
      ease: 'elastic',
    });
    gsap.from('.BichoBebeCoverStartButton', {
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
      <div className="BichoBebeDiv">
        <div className="BichoBebeCoverDiv">
          <img className="BichoBebeCoverImage" src={coverImg} />
          <p className="BichoBebeCoverTitle">{title}</p>
        </div>
        <div className="BichoBebeCoverStartButton">
          <Button>
            <div onClick={endPage}>Próximo jogo</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
