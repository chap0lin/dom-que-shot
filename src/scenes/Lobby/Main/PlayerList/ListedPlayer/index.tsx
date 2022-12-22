import React from 'react';
import Avatar from '../../../../../components/Avatar';
import Beer from '../../../../../assets/beer.png';
import './ListedPlayer.css';

interface ListedPlayerProps {
  seed: string;
  nickname: string;
  beers: number;
}

export default function ListedPlayer({
  seed,
  nickname,
  beers,
}: ListedPlayerProps) {
  const beerGroup: JSX.Element[] = [];
  for (let i = 0; i < beers; i++) {
    beerGroup.push(
      <img key={i} className="ListedPlayerBeer" src={Beer} alt="" />
    );
  }

  return (
    <div className="ListedPlayer">
      <div className="ListedPlayerAvatarAndNickname">
        <div className="ListedPlayerAvatar">
          <Avatar seed={seed} />
        </div>
        <p className="ListedPlayerNickname">{nickname}</p>
      </div>
      <div className="ListedPlayerBeerGroup">{beerGroup}</div>
    </div>
  );
}
