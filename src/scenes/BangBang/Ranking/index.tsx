import React from "react";
import { Link } from "react-router-dom";
import './Ranking.css';
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import RankingItem from "../../../components/RankingItem";

type Player = {
  name: string;
  seed: string;
  time: string;
}

interface RankingProps {
  data: Player[];
  finishPage: () => void;
  gamePage: () => void;
}

export function RankingPage({data, finishPage, gamePage} : RankingProps) {
  const winner = data[0];
  const loser = data[data.length -1];

  return (
    <div id="ranking-page" className="ranking-page">
      <div className="container-header">
        <div className="container-winner">
          <div className="background-avatar">
            <Avatar seed={winner.seed} />
          </div>
          <p>{winner.name}</p>
          <span>{winner.time}s</span>
        </div>
        <div className="container-loser">
          <div className="background-avatar">
            <Avatar seed={loser.seed} />
          </div>
          <p>{loser.name}</p>
          <span>{loser.time}s</span>
        </div>
      </div>

      <div className="container-body">
        <div className="ranking-container">
          {data.map((player, i) => (
            <RankingItem key={i} name={player.name} time={player.time} position={i} />
          ))}
        </div>

        <Button onClick={finishPage}>Finalizar</Button>
        <Button onClick={gamePage}>Jogar novamente</Button>
      </div>
    </div>
  );
};
