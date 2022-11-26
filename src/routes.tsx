import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Welcome from './scenes/Welcome';
import Tutorial from './scenes/Tutorial';
import Login from './scenes/Login';
import Home from './scenes/Home';
import GeneralRoom from './scenes/GeneralRoom';
import StandardMode from './scenes/StandardMode';
import RandomMode from './scenes/RandomMode';
import ChooseAvatar from './scenes/ChooseAvatar';
import JoinRoom from './scenes/JoinRoom';
import Lobby from './scenes/Lobby';
import Game from './scenes/Game';
import WhoDrank from './scenes/WhoDrank/WhoDrank';
import Vrum from './scenes/Vrum';
import BichoBebe from './scenes/BichoBebe';
import Medusa from './scenes/Medusa';
import CSComposto from './scenes/CSComposto';
import PensaRapido from './scenes/PensaRapido';
import DireitaEsquerda from './scenes/DireitaEsquerda';
import Buzz from './scenes/Buzz';
import OEscolhido from './scenes/OEscolhido';
import SelectNextGame from './scenes/SelectNextGame';

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
        <Route path="/JoinRoom" element={<JoinRoom />} />
        <Route path="/ChooseAvatar" element={<ChooseAvatar />} />
        <Route path="/Lobby" element={<Lobby />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/OEscolhido" element={<OEscolhido />} />
        <Route path="/SelectNextGame" element={<SelectNextGame />} />
        <Route path="/WhoDrank" element={<WhoDrank />} />
        <Route path="/Vrum" element={<Vrum />} />
        <Route path="/BichoBebe" element={<BichoBebe />} />
        <Route path="/Medusa" element={<Medusa />} />
        <Route path="/CSComposto" element={<CSComposto />} />
        <Route path="/DireitaEsquerda" element={<DireitaEsquerda />}/>
        <Route path="/PensaRapido" element={<PensaRapido />} />
        <Route path="/Buzz" element={<Buzz />}/> 
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
