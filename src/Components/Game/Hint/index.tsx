import React from 'react';
import Background from '../../Background';
import Header from '../../Header';
import Button from '../../Button';
import styled from '@emotion/styled';

const HintPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HintPageDescription = styled.p`
  margin: 20px 0;
  padding: 0 40px;
  font-weight: 500;
  font-size: 20px;
  max-height: 600px;
  text-align: justify;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

interface HintProps {
  coverImg: string;
  title: string;
  gameType: string;
  coverPage: () => void;
  gamePage: () => void;
  description: JSX.Element | string;
}

export default function HintPage({
  title,
  coverImg,
  gameType,
  coverPage,
  gamePage,
  description,
}: HintProps) {

  let buttonText = 'Iniciar';
  if(gameType === 'simple'){
    typeof description === 'string'
    ? description += '\n\nPodem começar! Finalizando o jogo, clique no botão abaixo.'
    : description = <>{description}<br /><br />Podem começar! Finalizando o jogo, clique no botão abaixo.</>;
    
    buttonText = 'Finalizar';
  }

  return (
    <Background>
      <Header logo={coverImg} goBackArrow={coverPage} title={title} />
      <HintPageDiv>
        <HintPageDescription>{description}</HintPageDescription>
        <div>
          <Button onClick={gamePage}>{buttonText}</Button>
        </div>
      </HintPageDiv>
    </Background>
  );
}