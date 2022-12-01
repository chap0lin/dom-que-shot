import React from 'react';
import './Info.css';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Background from '../../../components/Background';

interface InfoProps {
  title: string;
  coverPage: () => void;
  gamePage: () => void;
  turnVisibility: boolean;
  coverImg: string;
}

export function InfoPage({ title, coverPage, gamePage, turnVisibility, coverImg }: InfoProps) {
  return (
    <div id="info-page">
      <Background>
        <Header logo={coverImg} goBackArrow={coverPage} title={title} />

        <div className="content">
          <p>
            Neste jogo, cada participante vai jogar com o seu aparelho. <br />
            <br />
            Inciada a partida, todos os jogadores devem atirar no alvo dentro do
            tempo de 10 segundos.
            <br />
            <br />
            Quem atirar por último ou quem não atirar dentro do tempo, bebe uma
            dose.
          </p>

          <div className="button-container" style={
            turnVisibility
              ? { visibility: 'visible' }
              : { visibility: 'hidden' }
          }>
            <Button onClick={gamePage}>Iniciar</Button>
          </div>
        </div>
      </Background>
    </div>
  );
}
