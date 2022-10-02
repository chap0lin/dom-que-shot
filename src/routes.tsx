import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './scenes/Home/Home';
import GeneralRoom from './scenes/GeneralRoom/GeneralRoom';
import BangBang from './scenes/BangBang';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/GeneralRoom" element={<GeneralRoom />} />
        <Route path="/BangBang" element={<BangBang />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
