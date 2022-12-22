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
  max-height: 550px;
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
  const buttonText = gameType === 'SCG' ? 'Finalizar' : 'Iniciar';
  return (
    <Background>
      <Header logo={coverImg} goBackArrow={coverPage} title={title} />
      <HintPageDiv>
        <HintPageDescription>{description}</HintPageDescription>
        <div
          style={
            gameType === 'SCG' ? { visibility: 'visible' } : { display: 'none' }
          }>
          <HintPageDescription style={{ height: '50px' }}>
            {'Podem começar! Finalizando o jogo, clique no botão abaixo.'}
          </HintPageDescription>
        </div>
        <div>
          <Button onClick={gamePage}>{buttonText}</Button>
        </div>
      </HintPageDiv>
    </Background>
  );
}
