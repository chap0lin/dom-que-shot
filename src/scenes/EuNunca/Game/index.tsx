import React, { useState, useEffect } from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import glassIcon from '../../../assets/glass-icon-yellow-background.png'
import './Game.css';


interface coverProps {
  suggestions: string[],
  finishPage: () => void,
  coverImg: string;
}

export default function GamePage({ suggestions, finishPage, coverImg }: coverProps) {

  return (
    <Background>
      <Header logo={coverImg}/>
      <div className="EuNuncaDiv">
        <p className="EuNuncaGameTitle">Crie uma afirmação iniciada com "EU NUNCA..."</p>
        <div className="EuNuncaSuggestionsDiv">
          <p className="EuNuncaSuggestionsTitle">
            Ou, se preferir, use uma de nossas sugestões:
          </p>
          {suggestions.map((suggestion) => (
            <div className="EuNuncaSuggestion" key={suggestion}>
              <img className="EuNuncaSuggestionIcon" src={glassIcon}/>
              {suggestion}
            </div>
          ))}
        </div>
        <div className="GameVoteButton">
          <Button>
            <div onClick={finishPage}>Continuar</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
