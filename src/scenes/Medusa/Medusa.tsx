import React from 'react';
import coverImg from '../../assets/game-covers/medusa.png';
import SimpleCardGame from '../../components/Game/SimpleCardGame';

export default function Medusa() {
  const title = 'Medusa';
  const description = (
    <>
      Este jogo deve ser jogado fora do aparelho. Funciona assim:
      <br />
      <br />
      É recomendado jogar com várias pessoas. Façam um círculo com todos olhando
      para baixo.
      <br />
      Depois de uma contagem, todos devem levantar a cabeça e olhar fixamente
      para outra pessoa. Se a pessoa escolhida por você não estiver te
      encarando, você ganha a rodada.
      <br />
      Se duas pessoas olharem ao mesmo tempo uma para a outra, quem gritar
      "Medusa!" por último deve virar uma dose.
    </>
  );
  const hint = (
    <>
      PREPARADOS??
      <br />
      <br />
      Formem o círculo e o jogador da vez inicia a contagem para começar o jogo.
      <br />
      <br />
      Finalizando a rodada, clique no botão abaixo para informar quem bebeu.
    </>
  );

  return (
    <SimpleCardGame
      title={title}
      description={description}
      hint={hint}
      coverImg={coverImg}
    />
  );
}
