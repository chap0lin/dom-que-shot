import React from 'react';
import ListedPlayer from './ListedPlayer';
import './PlayerList.css';

interface PlayerListProps {
  players: {
    avatarSeed: string;
    nickname: string;
    beers: number;
    id: number;
  }[];
}

export default function PlayerList({ players }: PlayerListProps) {
  return (
    <div className="PlayerListSlider">
      {players.map((player) => (
        <div key={player.id}>
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
