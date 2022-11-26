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
      Este jogo deve ser jogado fora do aparelho. Funciona assim:
      <br />
      <br />
      O jogo testa não só a capacidade alcoólica, mas também os conhecimentos de quem participa.
      <br />
      Você pode organizar um quiz com perguntas diversas, dividindo os participantes em duas ou três equipes.
      <br />
      Os temas podem variar de filmes, cultura pop, ou até mesmo esportes. Cabe a você pensar no que combina
      com o perfil dos seus convidados.
      <br />
      Conforme as perguntas são feitas, o jogador precisa pensar na resposta enquanto bebe a cerveja &#40;ou qualquer seja a bebida&#41;
      e só pode parar quando estiver pronto para responder.
    </>
  );

  return (
    <Background>
      <Header logo={coverImg} goBackArrow={coverPage} title={title} />
      <div className="PensaRapidoDiv">
        <p className="PensaRapidoInfoDiv">{info}</p>
        <Button>
          <div onClick={coverPage}>Voltar</div>
        </Button>
      </div>
    </Background>
  );
}
