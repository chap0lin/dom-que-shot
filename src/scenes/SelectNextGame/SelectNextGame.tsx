import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Roulette from '../../components/Roulette';
import RouletteCard from '../../components/Roulette/RouletteCard';
import SocketConnection from '../../lib/socket';
import gameList from '../../contexts/games';

import RouletteTriangle from '../../assets/roulette-triangle.png';
import './SelectNextGame.css';

enum Visibility {
  Invisible,
  Visible,
}

interface GameCard {
  id: number;
  text: string;
  src: string;
}

export default function SelectNextGame() {
  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const navigate = useNavigate();
  const [nextGameName, setNextGameName] = useState('');
  const [games, updateGames] = useState<GameCard[]>(gameList);
  const [turnVisibility, setTurnVisibility] = useState<Visibility>(
    Visibility.Invisible
  );
  const [ownerVisibility, setOwnerVisibility] = useState<Visibility>(
    Visibility.Invisible
  );

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();
  let isMyTurn = false;
  let amIOwner = false;

  useEffect(() => {
    socket.addEventListener('player-turn', (turnID) => {
      if (turnID === socket.socket.id) {
        setTurnVisibility(Visibility.Visible);
        isMyTurn = true;
      }
    });
    socket.push('player-turn', userData.roomCode);

    socket.addEventListener('room-owner-is', (ownerID) => {
      if (ownerID === socket.socket.id) {
        setOwnerVisibility(Visibility.Visible);
        amIOwner = true;
      }
    });
    socket.push('room-owner-is', userData.roomCode);

    socket.addEventListener('games-update', (newGames) => {
      updateGameList(newGames);
    });
    socket.addEventListener('roulette-number-is', (number) => {
      console.log(`A roleta sorteou o número ${number}`);
      spin(number);
    });
    socket.addEventListener('room-is-moving-to', (destination) => {
      console.log(`Movendo a sala para ${destination}.`);
      navigate(destination, {
        state: {
          isYourTurn: isMyTurn,
          isOwner: amIOwner,
        },
      });
    });
    socket.push('games-update', userData.roomCode);

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  const updateGameList = (newGames: string[]) => {
    let id = -1;
    const rouletteGames = games.filter((game) => newGames.includes(game.text));
    console.log(rouletteGames.map((game) => game.text));

    updateGames(
      rouletteGames.map((game) => {
        id += 1;
        return { ...game, id: id };
      })
    );
  };

  const spin = (id) => {
    gsap.to('.RouletteButton', { opacity: 0, display: 'none', duration: 0.25 });
    const timeline = gsap.timeline();
    timeline
      .to('.RouletteCard', {
        y: `-${3 * (gameList.length - 2) * 142}px`,
        duration: 1,
        ease: 'linear',
      })
      .to('.RouletteCard', {
        y: `-${(gameList.length - 1 + id) * 142}px`,
        duration: 2,
        ease: 'elastic',
      })
      .to('.NextGameName', {
        opacity: 1,
        duration: 1,
        ease: 'power2',
      });

    const selectedGame = gameList.find((game) => game.id === id);
    const gameName = selectedGame.text;
    setNextGameName(gameName);
  };

  const turnTheWheel = () => {
    socket.push('roulette-number-is', userData.roomCode);
  };

  const backToLobby = () => {
    if (nextGameName === '') {
      console.log('Voltando ao lobby.');
      socket.push('move-room-to', {
        roomCode: userData.roomCode,
        destination: '/Lobby',
      });
    }
  };

  const header =
    ownerVisibility === Visibility.Visible ? (
      <Header goBackArrow={backToLobby} logo />
    ) : (
      <Header logo />
    );

  return (
    <Background>
      {header}
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
        <div
          className="RouletteButton"
          onClick={turnTheWheel}
          style={
            turnVisibility === Visibility.Visible
              ? { visibility: 'visible' }
              : { visibility: 'hidden' }
          }>
          <Button>
            <div>Girar</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
