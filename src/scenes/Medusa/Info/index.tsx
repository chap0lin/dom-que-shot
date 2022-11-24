import React from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import './Info.css';

interface coverProps {
  coverImg: string;
  title: string;
  coverPage: any;
  endPage: any;
}

export default function InfoPage({
  title,
  coverImg,
  coverPage,
  endPage,
}: coverProps) {
  const info = (
    <>
      Este jogo deve ser jogado fora do aparelho. Funciona assim:
      <br />
      <br />
      É recomendado jogar com várias pessoas. Façam um círculo com todos olhando para baixo.
      <br />
      Depois de uma contagem, todos devem levantar a cabeça e olhar fixamente para outra pessoa.
      Se a pessoa escolhida por você não estiver te encarando, você ganha a rodada.
      <br />
      Se duas pessoas olharem ao mesmo tempo uma para a outra, quem gritar "Medusa!" por último deve virar uma dose.
    </>
  );

  return (
    <Background>
      <Header logo={coverImg} goBackArrow={coverPage} title={title} />
      <div className="MedusaDiv">
        <p className="MedusaInfoDiv">{info}</p>
        <Button>
          <div onClick={coverPage}>Voltar</div>
        </Button>
      </div>
    </Background>
  );
}
