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
      Os jogadores devem se organizar em uma roda. Começando em sentido horário,
      cada participante vai ter que dizer uma dessas três opções quando chegar a
      sua vez:
      <br />
      <br />
      1 - Falar VRUM &#40;imitando o barulho de um motor de carro&#41;: O jogo
      segue normal, sendo a vez do próximo jogador.
      <br />
      <br />
      2 - Falar IHHH &#40;imitando o barulho de um freio de carro&#41;: O
      sentido da roda inverte, e o próximo jogador passa a ser o que acabou de
      jogar.
      <br />
      <br />
      3 - Falar PLOFT &#40;imitando o barulho de uma lombada&#41;: O sentido da
      roda se mantém, mas o jogador seguinte é pulado.
      <br />
      <br />O resultado acaba sendo muito engraçado. Quem errar a vez, ou errar
      a palavra, tem de virar uma dose.
    </>
  );

  return (
    <Background>
      <Header logo={coverImg} goBackArrow={coverPage} title={title} />
      <div className="VrumDiv">
        <p className="VrumInfoDiv">{info}</p>
        <Button>
          <div onClick={coverPage}>Voltar</div>
        </Button>
      </div>
    </Background>
  );
}
