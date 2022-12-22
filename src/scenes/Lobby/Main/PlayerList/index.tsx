import React from 'react';
import ListedPlayer from './ListedPlayer';
import './PlayerList.css';

interface PlayerListProps {
  players: {
    avatarSeed: string;
    nickname: string;
    beers: number;
    playerID: number;
  }[];
}

export default function PlayerList({ players }: PlayerListProps) {
  return (
    <div className="PlayerListSlider">
      {players.map((player, i) => (
        <div key={`${i}`}>
          <ListedPlayer
            seed={player.avatarSeed}
            nickname={player.nickname}
            beers={player.beers}
          />
        </div>
      ))}
    </div>
  );
}
