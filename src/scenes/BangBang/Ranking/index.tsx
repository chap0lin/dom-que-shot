import React from 'react';
import './Ranking.css';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import RankingItem from '../../../components/RankingItem';
import thumbDown from '../../../assets/BangBang/thumbs-down.png';
import crown from '../../../assets/BangBang/crown.png';

type Player = {
  id: string;
  nickname: string;
  seed: string;
  shotTime: string;
};

interface RankingProps {
  data: Player[];
  finalRanking: boolean;
  finishPage: () => void;
  gamePage: () => void;
}

export function RankingPage({ data, finalRanking, finishPage }: RankingProps) {
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

        <Button onClick={finishPage}>Finalizar</Button>
      </div>
    </div>
  );
}
