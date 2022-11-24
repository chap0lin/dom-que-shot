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
    gsap.from('.DireitaEsquerdaCoverDiv', {
      duration: 2,
      yPercent: 100,
      ease: 'elastic',
    });
    gsap.from('.DireitaEsquerdaCoverTitle', { opacity: 0, duration: 1, delay: 1.25 });
    gsap.from('.DireitaEsquerdaCoverImage', {
      yPercent: 100,
      duration: 2,
      delay: 0.25,
      ease: 'elastic',
    });
    gsap.from('.DireitaEsquerdaCoverStartButton', {
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
      <div className="DireitaEsquerdaDiv">
        <div className="DireitaEsquerdaCoverDiv">
          <img className="DireitaEsquerdaCoverImage" src={coverImg} />
          <p className="DireitaEsquerdaCoverTitle">{title}</p>
        </div>
        <div className="DireitaEsquerdaCoverStartButton">
          <Button>
            <div onClick={endPage}>Próximo jogo</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
