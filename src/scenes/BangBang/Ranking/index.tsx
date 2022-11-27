import React, { useEffect, useState } from 'react';
import socketConnection from '../../../lib/socket';
import './Ranking.css';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import RankingItem from '../../../components/RankingItem';
import thumbDown from '../../../assets/BangBang/thumbs-down.png';
import crown from '../../../assets/BangBang/crown.png';

enum Visibility {
  Visible,
  Invisible
}

type Player = {
  id: string;
  nickname: string;
  seed: string;
  shotTime: string;
};

interface RankingProps {
  data: Player[];
  finalRanking: boolean;
  roulettePage: () => void;
  gamePage: () => void;
}

export function RankingPage({ data, finalRanking, roulettePage }: RankingProps) {
  const [turnVisibility, setTurnVisibility] = useState<Visibility>(
    Visibility.Invisible
  );
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const socket = socketConnection.getInstance();

  useEffect(() => {
    socket.addEventListener('player-turn', (turnID) => {
      if (turnID === socket.socket.id) {
        setTurnVisibility(Visibility.Visible);
      }
    });
  }, []);

  if (data.length === 0) {
    return <p>Loading...</p>;
  }
  const winner = data[0];
  const loser = data[data.length - 1];

  return (
    <div id="ranking-page" className="ranking-page">
      <div className="container-header">
        <div className="container-winner">
          <div className="background-avatar">
            <img className="crown" src={crown} />
            <Avatar seed={winner.seed} />
          </div>
          <p>{winner.nickname}</p>
          <span>{(parseInt(winner.shotTime) / -1000).toFixed(2)}s</span>
        </div>

        <div className="container-loser">
          <div className="background-avatar">
            {finalRanking && <Avatar seed={loser.seed} />}
            <img className="thumbDown" src={thumbDown} />
          </div>
          {finalRanking && <p>{loser.nickname}</p>}
          {finalRanking && (
            <span>{(parseInt(loser.shotTime) / -1000).toFixed(2)}s</span>
          )}
        </div>
      </div>

      <div className="container-body">
        <div className="ranking-container">
          {data.map((player, i) => (
            <RankingItem
              key={i}
              name={player.nickname}
              time={parseInt(player.shotTime) / -1000}
              position={i}
            />
          ))}
        </div>
        <div style={

          turnVisibility === Visibility.Visible
            ? { visibility: 'visible' }
            : { visibility: 'hidden' }

        }>
          <Button onClick={roulettePage}>Próximo jogo</Button>
        </div>

      </div>
    </div>
  );
}
