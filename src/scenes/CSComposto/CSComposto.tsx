import React from 'react';
import coverImg from '../../assets/game-covers/cs-composto.png';
import SimpleCardGame from '../../components/Game/SimpleCardGame';

export default function CSComposto() {
  const title = 'C, S, Composto';
  const description = (
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
    <SimpleCardGame
      title={title}
      description={description}
      coverImg={coverImg}
      sizeOfDescription={530}
    />
  );
}
