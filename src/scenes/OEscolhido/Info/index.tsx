import React from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import './Info.css';

interface InfoProps {
  coverImg: string;
  coverPage: () => void;
  gamePage: () => void;
  turnVisibility: boolean;
}

export default function InfoPage({ coverImg, coverPage, gamePage, turnVisibility }: InfoProps) {
  const info = (
    <>
      Neste jogo, cada participante vai jogar com o seu aparelho.
      <br />
      <br />
      Aparecerá uma lista com todos os participantes da sala e cada um votará em
      uma pessoa da lista para virar uma dose.
      <br />
      <br />
      Boa sorte!
    </>
  );

  return (
    <Background>
      <Header logo={coverImg} goBackArrow={coverPage} title="O Escolhido" />
      <div className="OEscolhidoDiv">
        <p className="InfoDiv">{info}</p>
        <div style={
            turnVisibility
              ? { visibility: 'visible' }
              : { visibility: 'hidden' }
          }>
          <Button>
            <div onClick={gamePage}>Iniciar</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
