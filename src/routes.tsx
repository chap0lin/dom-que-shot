import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Welcome from './scenes/Welcome';
import Tutorial from './scenes/Tutorial';
import Login from './scenes/Login';
import Home from './scenes/Home';
import ChooseAvatar from './scenes/ChooseAvatar';
import Lobby from './scenes/Lobby';
import OEscolhido from './scenes/OEscolhido';
import BangBang from './scenes/BangBang';
import SelectNextGame from './scenes/SelectNextGame';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Tutorial" element={<Tutorial />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ChooseAvatar" element={<ChooseAvatar />} />
        <Route path="/Lobby" element={<Lobby />} />
        <Route path="/OEscolhido" element={<OEscolhido />} />
        <Route path="/BangBang" element={<BangBang />} />
        <Route path="/SelectNextGame" element={<SelectNextGame />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
