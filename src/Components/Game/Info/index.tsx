import React from 'react';
import Background from '../../Background';
import Header from '../../Header';
import Button from '../../Button';
import './Info.css';

interface InfoProps {
  coverImg: string;
  title: string;
  coverPage: any;
  description: JSX.Element | string;
}

export default function InfoPage({ title, coverImg, coverPage, description }: InfoProps) {
  return (
    <Background>
      <Header logo={coverImg} goBackArrow={coverPage} title={title} />
      <div className="InfoPageDiv">
        <p className="InfoPageDescription">{description}</p>
        <Button>
          <div onClick={coverPage}>Voltar</div>
        </Button>
      </div>
    </Background>
  );
}
