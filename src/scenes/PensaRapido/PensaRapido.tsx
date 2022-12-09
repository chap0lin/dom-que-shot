import React from 'react';
import coverImg from '../../assets/game-covers/pensa-rapido.png';
import SimpleCardGame from '../../components/Game/SimpleCardGame';

export default function PensaRapido() {
  const title = 'Pensa Rápido';
  const description = (
    <>
      Este jogo deve ser jogado fora do aparelho. Funciona assim:
      <br />
      <br />
      O jogo testa não só a capacidade alcoólica, mas também os conhecimentos de
      quem participa.
      <br />
      Você pode organizar um quiz com perguntas diversas, dividindo os
      participantes em duas ou três equipes.
      <br />
      Os temas podem variar de filmes, cultura pop, ou até mesmo esportes. Cabe
      a você pensar no que combina com o perfil dos seus convidados.
      <br />
      Conforme as perguntas são feitas, o jogador precisa pensar na resposta
      enquanto bebe a cerveja &#40;ou qualquer seja a bebida&#41; e só pode
      parar quando estiver pronto para responder.
    </>
  );

  return (
    <SimpleCardGame
      title={title}
      description={description}
      coverImg={coverImg}
    />
  );
}
