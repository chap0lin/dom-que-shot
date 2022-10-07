import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Welcome from './scenes/Welcome';
import Tutorial from './scenes/Tutorial';
import Login from './scenes/Login/Login';
import Home from './scenes/Home/Home';
import GeneralRoom from './scenes/GeneralRoom';
import BangBang from './scenes/BangBang';
import StandardMode from './scenes/StandardMode';
import RandomMode from './scenes/RandomMode';
import CreateRoom from './scenes/CreateRoom';
import ChooseAvatar from './scenes/ChooseAvatar';
import JoinRoom from './scenes/JoinRoom';
import Lobby from './scenes/Lobby';
import Game from './scenes/Game';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Tutorial" element={<Tutorial />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/GeneralRoom" element={<GeneralRoom />} />
        <Route path="/StandardMode" element={<StandardMode />} />
        <Route path="/RandomMode" element={<RandomMode />} />
        <Route path="/CreateRoom" element={<CreateRoom />} />
        <Route path="/JoinRoom" element={<JoinRoom />} />
        <Route path="/ChooseAvatar" element={<ChooseAvatar />} />
        <Route path="/Lobby" element={<Lobby />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/BangBang" element={<BangBang />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
