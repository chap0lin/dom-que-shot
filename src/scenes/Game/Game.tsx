import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../components/Header';
import Background from '../../components/Background';
import './Game.css';

function Game() {
  let game = 'No game.';

  if (useLocation().state.game) {
    game = useLocation().state.game;
  }

  return (
    <Background>
      <Header title={game} />
    </Background>
  );
}

export default Game;
