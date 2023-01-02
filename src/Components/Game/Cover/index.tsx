import React, { useState, useEffect } from 'react';
import Background from '../../Background';
import Header from '../../Header';
import Button from '../../Button';
import PingTracker from '../../Debug/PingTracker';
import gsap from 'gsap';
import './Cover.css';

interface CoverProps {
  title: string;
  coverImg: string;
  type: string;
  infoPage: () => void;
  gamePage: () => void;
  goBackPage: () => void;
  turnVisibility: boolean;
  ownerVisibility: boolean;
}

export default function CoverPage({
  type,
  title,
  coverImg,
  infoPage,
  gamePage,
  goBackPage,
  turnVisibility,
  ownerVisibility,
}: CoverProps) {
  const [cardColor, setCardColor] = useState('#000000');

  const header = ownerVisibility ? (
    <Header goBackArrow={goBackPage} infoPage={infoPage} />
  ) : (
    <Header infoPage={infoPage} />
  );

  useEffect(() => {
    switch (type) {
      case 'simple':
        setCardColor('#403A55');
        gsap.from('.CoverPageCardDiv', {
          duration: 2,
          yPercent: 100,
          ease: 'elastic',
        });
        gsap.from('.CoverPageTitle', { opacity: 0, duration: 1, delay: 1.25 });
        gsap.from('.CoverPageImage', {
          yPercent: 100,
          duration: 2,
          delay: 0.25,
          ease: 'elastic',
        });
        break;

      case 'dynamic':
        setCardColor('#8877DF');
        gsap.from('.CoverPageCardDiv', {
          duration: 2,
          xPercent: 10,
          scale: 0.5,
          rotate: 45,
          ease: 'elastic',
        });
        gsap.from('.CoverPageTitle', { opacity: 0, duration: 1, delay: 1.25 });
        gsap.from('.CoverPageImage', {
          xPercent: -10,
          duration: 2,
          scale: 0.5,
          rotate: 45,
          delay: 0.25,
          ease: 'elastic',
        });
        break;

      case 'round':
        setCardColor('#800080');
        gsap.from('.CoverPageCardDiv', {
          rotation: -45,
          scale: 0,
          duration: 1,
          ease: 'bounce',
        });
        gsap.from('.CoverPageTitle', { opacity: 0, duration: 1, delay: 1.25 });
        gsap.from('.CoverPageImage', {
          rotation: 45,
          scale: 0,
          duration: 1,
          delay: 0.25,
          ease: 'bounce',
        });
        break;
    }

    gsap.from('.CoverPageStartButton', {
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
      {header}
      <div className="CoverPageDiv">
        <div
          className="CoverPageCardDiv"
          style={{ backgroundColor: cardColor }}>
          <img className="CoverPageImage" src={coverImg} />
          <p className="CoverPageTitle">{title}</p>
        </div>
        <div
          className="CoverPageStartButton"
          style={
            turnVisibility === true
              ? { visibility: 'visible' }
              : { visibility: 'hidden' }
          }>
          <Button onClick={gamePage}>Começar jogo</Button>
        </div>
      </div>
      <PingTracker />
    </Background>
  );
}
