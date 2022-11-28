import React from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import './Info.css';

interface coverProps {
  coverImg: string;
  title: string;
  coverPage: any;
}

export default function InfoPage({
  title,
  coverImg,
  coverPage,
}: coverProps) {
  const info = (
    <>
      Este jogo deve ser jogado fora do aparelho, mas pode contar com o auxílio dele.
      Funciona assim:
      <br />
      <br />
      O jogador da vez deve dizer em voz alta uma frase iniciada por "Eu nunca...",
      seguidas por algo ou situação que pode ter acontecido com algum dos jogadores.
      Se faltar criatividade, na tela do celular vão aparecer algumas sugestões.
      <br />
      <br />
      Aqueles que já passaram pela situação falada pelo jogador da vez devem beber uma dose.
      Se o jogador da vez for besta a ponto de escolher uma frase direcionada a algum jogador
      específico, este pode acusá-lo de marcação - e aí o jogador que falou a frase também tem de beber.  
    </>
  );

  return (
    <Background>
      <Header logo={coverImg} goBackArrow={coverPage} title={title} />
      <div className="BichoBebeDiv">
        <p className="BichoBebeInfoDiv">{info}</p>
        <Button>
          <div onClick={coverPage}>Voltar</div>
        </Button>
      </div>
    </Background>
  );
}
