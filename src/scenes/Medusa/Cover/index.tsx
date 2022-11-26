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
    gsap.from('.MedusaCoverDiv', {
      duration: 2,
      yPercent: 100,
      ease: 'elastic',
    });
    gsap.from('.MedusaCoverTitle', { opacity: 0, duration: 1, delay: 1.25 });
    gsap.from('.MedusaCoverImage', {
      yPercent: 100,
      duration: 2,
      delay: 0.25,
      ease: 'elastic',
    });
    gsap.from('.MedusaCoverStartButton', {
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
      <div className="MedusaDiv">
        <div className="MedusaCoverDiv">
          <img className="MedusaCoverImage" src={coverImg} />
          <p className="MedusaCoverTitle">{title}</p>
        </div>
        <div className="MedusaCoverStartButton">
          <Button>
            <div onClick={endPage}>Começar jogo</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
