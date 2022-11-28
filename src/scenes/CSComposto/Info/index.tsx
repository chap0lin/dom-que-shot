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

export default function InfoPage({ title, coverImg, coverPage }: coverProps) {
  const info = (
    <>
      Este jogo deve ser jogado fora do aparelho. Funciona assim:
      <br />
      <br />
      A regra geral do jogo é que estão proibidas palavras que comecem em C, S
      ou que sejam compostas &#40;que levem espaço ou hífen&#41;.
      <br />
      Os participantes se organizam numa roda e come&ccedil;am a brincadeira. Um
      jogador inicia a partida falando qualquer palavra &#40;desde que não
      infrinja as regras iniciais&#41;, e em seguida, o próximo da roda continua
      o jogo dizendo uma palavra relacionada &agrave; anterior.
      <br />O primeiro que demorar a falar uma palavra ou infringir as regras
      acima deve virar uma dose!
    </>
  );

  return (
    <Background>
      <Header logo={coverImg} goBackArrow={coverPage} title={title} />
      <div className="CSCompostoDiv">
        <p className="CSCompostoInfoDiv">{info}</p>
        <Button>
          <div onClick={coverPage}>Voltar</div>
        </Button>
      </div>
    </Background>
  );
}
