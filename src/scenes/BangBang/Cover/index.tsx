import React, { useState, useEffect } from 'react';
import SocketConnection from '../../../lib/socket';
import Background from '../../../components/Background';
import socketConnection from '../../../lib/socket';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import './Cover.css';
import coverImg from '../../../assets/BangBang/cover-bangbang.png';

enum Visibility {
  Visible,
  Invisible
}

interface CoverProps {
  title?: string;
  infoPage: any;
  gamePage: any;
}

export function CoverPage({ infoPage, gamePage }: CoverProps) {
  const [turnVisibility, setTurnVisibility] = useState<Visibility>(
    Visibility.Invisible
  );
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const socket = socketConnection.getInstance();

  useEffect(() => {
    socket.push('player-turn', userData.roomCode);
    socket.addEventListener('player-turn', (turnID) => {
      if (turnID === socket.socket.id) {
        setTurnVisibility(Visibility.Visible);
      }
    });
  }, []);
  
  return (
    <div id="cover-page" className="cover-page">
      <Background>
        <Header goBackArrow infoPage={infoPage} />

        <div className="cover-container">
          <div className="cover-infos">
            <img src={coverImg}></img>
          </div>

          <div className="button-start" style={

            turnVisibility === Visibility.Visible
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
