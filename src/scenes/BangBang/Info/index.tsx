import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import titleImage from '../../../assets/BangBang/title-bangbang.png';
import logoGame from '../../../assets/BangBang/bangbang-logo.png';
import './Info.css';
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Background from '../../../components/Background';


interface InfoProps {
  coverPage: () => void;
  gamePage: () => void;
}

export function InfoPage({coverPage, gamePage} : InfoProps) {

  return (
    <Background>
      <Header logo={logoGame} goBackArrow={coverPage} title="Bang Bang"/>
     
      <div className="content">
        <p>
          Neste jogo, cada participante vai jogar com o seu aparelho. <br /><br />
          Inciada a partida, todos os jogadores devem atirar no alvo dentro do tempo de 10 segundos.<br /><br />
          Quem atirar por último ou quem não atirar dentro do tempo, bebe uma dose.
        </p>

        <div className="button-container">
          <Button onClick={gamePage}>Iniciar</Button>
        </div>
      </div>
   </Background>
  );
};
