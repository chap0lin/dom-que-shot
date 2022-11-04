import React from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import './Info.css';

interface coverProps {
  info: string | JSX.Element;
  coverImg: string;
  coverPage: any;
  gamePage: any;
}

export default function InfoPage({
  info,
  coverImg,
  coverPage,
  gamePage,
}: coverProps) {
  return (
    <Background>
      <Header logo={coverImg} goBackArrow={coverPage} title="O Escolhido" />
      <div className="OEscolhidoDiv">
        <p className="InfoDiv">{info}</p>
        <Button>
          <div onClick={gamePage}>Iniciar</div>
        </Button>
      </div>
    </Background>
  );
}
