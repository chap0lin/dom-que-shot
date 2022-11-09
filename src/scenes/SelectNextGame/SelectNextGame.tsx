import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import RouletteTriangle from '../../assets/roulette-triangle.png';
import './SelectNextGame.css';

export default function SelectNextGame() {
  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const navigate = useNavigate();
  const [nextGameName, setNextGameName] = useState('');

  const games = [
    //jogos da roleta. futuramente deve ser atualizado de maneira dinâmica
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
    //legado da GAME-50. Se alguém girou a roleta, o servidor responde com o valor do giro (random).
    socket.addEventListener('selected-a-game', (random) => {
      //assim, se outra pessoa girar a roleta, a do usuário atual gira também
      spin(random);
    });
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  const spin = (id) => {
    const timeline = gsap.timeline();
    timeline
      .to('.RouletteCard', {
        y: `-${3 * (games.length - 2) * 142}px`,
        duration: 1,
        ease: 'linear',
      })
      .to('.RouletteCard', {
        y: `-${id * 142}px`,
        duration: 2,
        ease: 'power3',
      })
      .to('.NextGameName', {
        opacity: 1,
        duration: 1,
      });

    id += 2;
    if (id > games.length) {
      id -= games.length;
    }

    const selectedGame = games.find((game) => game.id === id);
    const gameName = selectedGame.text;
    setNextGameName(gameName);

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
          <div className="RouletteSideIconSpace" />
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
            <img src={RouletteTriangle} width="40px" height="44px" />
          </div>
        </div>
        <p className="NextGameName">{nextGameName}</p>
        <div className="RouletteButton">
          <Button>
            <div onClick={turnTheWheel}>Girar</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
