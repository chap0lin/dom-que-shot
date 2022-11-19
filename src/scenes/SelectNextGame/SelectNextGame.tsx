import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Roulette from '../../components/Roulette';
import RouletteCard from '../../components/Roulette/RouletteCard';
import socketConnection from '../../lib/socket';

import EuNunca from '../../assets/game-covers/eu-nunca.png';
import Roleta from '../../assets/game-covers/roleta.png';
import Vrum from '../../assets/game-covers/vrum.png';
import BichoBebe from '../../assets/game-covers/bicho-bebe.png';
import Medusa from '../../assets/game-covers/medusa.png';
import RouletteTriangle from '../../assets/roulette-triangle.png';
import './SelectNextGame.css';

const defaultGameList = [
  {
    id: 0,
    text: 'Eu Nunca',
    src: EuNunca
  },
  {
    id: 1,
    text: 'Roleta',
    src: Roleta
  },
  {
    id: 2,
    text: 'Vrum',
    src: Vrum
  },
  {
    id: 3,
    text: 'Bicho Bebe',
    src: BichoBebe
  },
  {
    id: 4,
    text: 'Medusa',
    src: Medusa
  },
];

interface GameCard {
  id: number;
  text: string;
  src: string;
}

export default function SelectNextGame() {
  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const navigate = useNavigate();
  const [games, updateGames] = useState<GameCard[]>(defaultGameList);
  const [nextGameName, setNextGameName] = useState('');

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = socketConnection.getInstance();

  useEffect(() => {
    socket.addEventListener('games-update', (newGames) => {
      updateGameList(newGames);
      console.log('Os jogos da roleta foram atualizados.');
    });

    socket.addEventListener('roulette-number-is', (number) => {
      console.log(`A roleta sorteou o número ${number}`);
      spin(number);
    });

    socket.send('games-update', userData.roomCode);
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  const updateGameList = (newGames: string[]) => {
    updateGames(games.filter((game) => newGames.includes(game.text)));
  };

  const spin = (id) => {
    gsap.to('.RouletteButton', { opacity: 0, display: 'none', duration: 0.25 });
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
    if (id >= games.length) {
      id -= games.length;
    }
    console.log(`id: ${id}`);
    console.log(games); //games é um useState configurado previamente. Não entendo estar aparecendo vazio aqui.

    const selectedGame = games.find((game) => game.id === id); //retorna undefined, apesar de games teoricamente ter alguma coisa a essa altura.
    console.log(`selectedGame: ${selectedGame}`);

    const gameName = selectedGame.text;                          //se descomentar estas linhas, o socket vai dar o bug de recriar a conexão.
    setNextGameName(gameName);

    setNextGameName(`I should be set dinamically.`); //comentar essa linha se descomentar as duas de cima.
  };

  const turnTheWheel = () => {
    console.log('Solicitado o sorteio do próximo jogo.');
    socket.send('roulette-number-is', userData.roomCode);
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
