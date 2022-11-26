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
    gsap.from('.BuzzCoverDiv', {
      duration: 2,
      yPercent: 100,
      ease: 'elastic',
    });
    gsap.from('.BuzzCoverTitle', { opacity: 0, duration: 1, delay: 1.25 });
    gsap.from('.BuzzCoverImage', {
      yPercent: 100,
      duration: 2,
      delay: 0.25,
      ease: 'elastic',
    });
    gsap.from('.BuzzCoverStartButton', {
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
      <div className="BuzzDiv">
        <div className="BuzzCoverDiv">
          <img className="BuzzCoverImage" src={coverImg} />
          <p className="BuzzCoverTitle">{title}</p>
        </div>
        <div className="BuzzCoverStartButton">
          <Button>
            <div onClick={endPage}>Começar jogo</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
