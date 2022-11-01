import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronsRight, ChevronsLeft } from 'react-feather';
import gsap from 'gsap';

import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Roulette from '../../components/Roulette';
import RouletteCard from '../../components/Roulette/RouletteCard';
import socketConnection from '../../lib/socket';

import euNunca from '../../assets/game-covers/eu-nunca.png';
import Roleta from '../../assets/game-covers/roleta.png';
import Vrum from '../../assets/game-covers/vrum.png';
import BichoBebe from '../../assets/game-covers/bicho-bebe.png';
import Medusa from '../../assets/game-covers/medusa.png';
import './SelectNextGame.css';

export default function SelectNextGame() {
  const owner = useLocation().state.owner;
  console.log(`owner: ${owner}`);
  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const navigate = useNavigate();
  const [nextGameName, setNextGameName] = useState('');

  const games = [
    {
      id: 1,
      text: 'Eu Nunca',
      src: euNunca,
    },
    {
      id: 2,
      text: 'Roleta',
      src: Roleta,
    },
    {
      id: 3,
      text: 'Vrum',
      src: Vrum,
    },
    {
      id: 4,
      text: 'Bicho Bebe',
      src: BichoBebe,
    },
    {
      id: 5,
      text: 'Medusa',
      src: Medusa,
    },
  ];

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = socketConnection.getInstance();

  useEffect(() => {
    socket.addEventListener('selected-a-game', (random) => {
      spin(random);
    });
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  const spin = (id) => {
    const timeline = gsap.timeline();
    timeline
      .to('.RouletteCard', {
        y: `0px`,
        duration: 0.5,
      })
      .to('.RouletteCard', {
        y: `-${id * 100}%`,
        duration: 2,
        ease: 'elastic',
      })
      .to('.NextGameName', {
        opacity: 1,
        duration: 1,
      });

    id += 2;
    if (id > games.length) {
      id -= games.length;
    }

    let gameName = '';

    games.forEach((game) => {
      if (game.id === id) {
        gameName = game.text;
        setNextGameName(gameName);
      }
    });

    setTimeout(() => {
      navigate('/Game', { state: { game: gameName } });
    }, 5000);
  };

  const turnTheWheel = () => {
    let random = Math.floor(Math.random() * (games.length - 1) + 1);

    while (random === 0) {
      random = Math.floor(Math.random() * (games.length - 1) + 1);
    }

    gsap.to('.RouletteButton', { opacity: 0, display: 'none', duration: 0.25 });
    socket.socket.emit('selected-a-game', userData.roomCode, random);

    spin(random);
  };

  return (
    <Background>
      <Header goBackArrow logo />
      <div className="SelectGameSection">
        <div className="RouletteDiv">
          <div className="RouletteSideIconSpace">
            <ChevronsRight
              color="#F9C95C"
              strokeWidth="3px"
              width="45px"
              height="45px"
            />
          </div>

          <Roulette>
            {games.map((rouletteCard, index) => (
              <div key={index} className="RouletteCard">
                <RouletteCard text={rouletteCard.text} src={rouletteCard.src} />
              </div>
            ))}
            {games.map((rouletteCard, index) => (
              <div key={index} className="RouletteCard">
                <RouletteCard text={rouletteCard.text} src={rouletteCard.src} />
              </div>
            ))}
            {games.map((rouletteCard, index) => (
              <div key={index} className="RouletteCard">
                <RouletteCard text={rouletteCard.text} src={rouletteCard.src} />
              </div>
            ))}
          </Roulette>

          <div className="RouletteSideIconSpace">
            <ChevronsLeft
              color="#F9C95C"
              strokeWidth="3px"
              width="45px"
              height="45px"
            />
          </div>
        </div>
        <p className="NextGameName">{nextGameName}</p>
        <div
          className="RouletteButton"
          style={{ visibility: owner ? 'visible' : 'hidden' }}>
          <Button>
            <div onClick={turnTheWheel}>Girar</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
