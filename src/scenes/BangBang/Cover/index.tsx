import React from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import './Cover.css';
import coverImg from '../../../assets/BangBang/cover-bangbang.png';

interface CoverProps {
  title?: string;
  infoPage: () => void;
  gamePage: () => void;
  goBackPage: () => void;
  turnVisibility: boolean;
  ownerVisibility: boolean;
}

export function CoverPage({
  infoPage,
  gamePage,
  goBackPage,
  turnVisibility,
  ownerVisibility,
}: CoverProps) {
  const header = ownerVisibility ? (
    <Header goBackArrow={goBackPage} infoPage={infoPage} />
  ) : (
    <Header infoPage={infoPage} />
  );

  return (
    <div id="cover-page" className="cover-page">
      <Background>
        {header}
        <div className="cover-container">
          <div className="cover-infos">
            <img src={coverImg}></img>
          </div>

          <div
            className="button-start"
            style={
              turnVisibility
                ? { visibility: 'visible' }
                : { visibility: 'hidden' }
            }>
            <Button>
              <div onClick={gamePage}>Começar</div>
            </Button>
          </div>
        </div>
      </Background>
    </div>
  );
}
