import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import titleImage from '../../assets/BangBang/title-bangbang.png';
import logoGame from '../../assets/BangBang/bangbang-logo.png';
import './InstructionPage.css';
import Button from "../../components/Button";


const InstructionPage = () => {
  const navigateTo = useNavigate();

  return (
    <div id="instructions-bangbang" className="container-page">
      <div className="container-header">
        <div className="return-icon">
          <ArrowLeft
            width="30px"
            height="30px"
            onClick={() => navigateTo(-1)}
          />
        </div>

        <img src={titleImage} alt="Título BangBang" className="title-image" />

        <div className="logo-game">
          <img src={logoGame} alt="Logo BangBang" className="logo-game" />
        </div>
      </div>

      <div className="content">
        <p>
          Neste jogo, cada participante vai jogar com o seu aparelho. <br /><br />
          Inciada a partida, todos os jogadores devem atirar no alvo dentro do tempo de 10 segundos.<br /><br />
          Quem atirar por último ou quem não atirar dentro do tempo, bebe uma dose.
        </p>

        <div className="button-container">
          <Link to="/BangBang">
            <Button>Iniciar</Button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export { InstructionPage };
