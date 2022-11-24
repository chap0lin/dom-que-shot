import React from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import D1 from './Dice/1.png';
import D2 from './Dice/2.png';
import D3 from './Dice/3.png';
import D4 from './Dice/4.png';
import D5 from './Dice/5.png';
import D6 from './Dice/6.png';
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
      Este jogo deve ser jogado com dados.
      O número que cair corresponde a um comando, conforme a seguir:
      <br />
      <br />
      <div className="DireitaEsquerdaDiceRules">
        <div className="DireitaEsquerdaDiceRule">
          <img className="DireitaEsquerdaDiceSide" src={D1}/>
          Pessoa &agrave; sua esquerda bebe
        </div>
        <div className="DireitaEsquerdaDiceRule">
          <img className="DireitaEsquerdaDiceSide" src={D2}/>
          Pessoa &agrave; sua direita bebe
        </div>
        <div className="DireitaEsquerdaDiceRule">
          <img className="DireitaEsquerdaDiceSide" src={D3}/>
          Você &agrave; bebe
        </div>
        <div className="DireitaEsquerdaDiceRule">
          <img className="DireitaEsquerdaDiceSide" src={D4}/>
          Você aponta quem deve beber
        </div>
        <div className="DireitaEsquerdaDiceRule">
          <img className="DireitaEsquerdaDiceSide" src={D5}/>
          Todos bebem
        </div>
        <div className="DireitaEsquerdaDiceRule">
          <img className="DireitaEsquerdaDiceSide" src={D6}/>
          Você bebe duas vezes
        </div>
      </div>
    </>
  );

  return (
    <Background>
      <Header logo={coverImg} goBackArrow={coverPage} title={title} />
      <div className="DireitaEsquerdaDiv">
        <p className="DireitaEsquerdaInfoDiv">{info}</p>
        <Button>
          <div onClick={coverPage}>Voltar</div>
        </Button>
      </div>
    </Background>
  );
}
