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
      Um jogador inicia a contagem com o número 1. O próximo na roda continua com o 2, o seguinte com o 3 e assim por diante.
      A contagem continua até que alguém cometa o erro fatal: Não dizer "Buzz" para determinados números.
      <br />
      Os números em questão são:
      <ul>
        <li>Os que contém um 7 &#40;7, 17, 27...&#41;</li>
        <li>Múltiplos de 7 &#40;7, 14, 21...&#41;</li>
        <li>Os que tiverem dígitos iguais &#40;11, 22, 33...&#41;</li>
      </ul>
      Quem errar o Buzz deve virar uma dose!
    </>
  );

  return (
    <Background>
      <Header logo={coverImg} goBackArrow={coverPage} title={title} />
      <div className="BuzzDiv">
        <p className="BuzzInfoDiv">{info}</p>
        <Button>
          <div onClick={coverPage}>Voltar</div>
        </Button>
      </div>
    </Background>
  );
}
