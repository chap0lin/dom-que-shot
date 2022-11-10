import React from "react";
import { Link } from "react-router-dom";
import './Ranking.css';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/adventurer';
import Button from "../../components/Button";

const players = [
  { "name": "Alan", "time": "0.1" },
  { "name": "Júlia", "time": "1.1" },
  { "name": "Roberta", "time": "1.4" },
  { "name": "Denise", "time": "2.1" },
  { "name": "Ricardo", "time": "3.3" },
  { "name": "Júnior", "time": "10" },
];



const Ranking = () => {

  const newAvatarSeed1 = Math.random().toString(36).substring(2, 6);
  const src1 = `data:image/svg+xml;utf8,${encodeURIComponent(
    createAvatar(style, { seed: newAvatarSeed1 })
  )}`;
  const newAvatarSeed2 = Math.random().toString(20).substring(2, 6);
  const src2 = `data:image/svg+xml;utf8,${encodeURIComponent(
    createAvatar(style, { seed: newAvatarSeed2 })
  )}`;

  return (
    <div id="ranking-page" className="ranking-page">

      <div className="container-header">
        <div className="container-winner">
          <div className="background-avatar">
            <img src={src1} alt="" />
          </div>
          <p>{players[1].name}</p>
          <span>{players[1].time}s</span>
        </div>
        <div className="container-loser">
          <div className="background-avatar">
            <img src={src2} alt="" />
          </div>
          <p>{players[players.length - 1].name}</p>
          <span>{players[players.length - 1].time}s</span>
        </div>
      </div>

      <div className="container-body">
        <div className="ranking-container">

          <div className="ranking-item">
            <div className="position">
              <div className="circle-border">
                <p>1º</p>
              </div>
            </div>
            <div className="infos">
              <p>{players[1].name}</p>
              <p>{players[1].time}s</p>
            </div>
          </div>

          <div className="ranking-item">
            <div className="position">
              <div className="circle-border">
                <p>2º</p>
              </div>
            </div>
            <div className="infos">
              <p>{players[2].name}</p>
              <p>{players[2].time}s</p>
            </div>
          </div>

        </div>

        <Link to="/Home">
          <Button>Finalizar</Button>
        </Link>

        <Link to="/InstructionsBangBang">
          <Button>Jogar novamente</Button>
        </Link>

      </div>
    </div>
  );
};

export { Ranking };