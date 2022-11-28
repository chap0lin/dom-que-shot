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
      Cada jogador escolhe um bicho. Com as escolhas feitas, o primeiro faz a
      pergunta:
      <br />
      Ex.: Tartaruga bebe? &#40;a pessoa que escolheu a tartaruga responde&#41;
      <br />
      Tartaruga não bebe, quem beb é o cachorro &#40;a pessoa que escolheu o
      cachorro segue com a resposta e pergunta&#41;
      <br />
      Cachorro não bebe, quem bebe é o pombo &#40;e assim por diante&#41;
      <br />
      Quem errar, seja chamando um bicho que não existe ou não percebendo que
      foi chamado, tem de virar uma dose.
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
