import React, { useState, useEffect } from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';
import gsap from 'gsap';
import './Game.css';

interface playerProps {
  nickname: string;
  avatarSeed: string;
}

interface coverProps {
  coverPage: any;
  finishPage: any;
  playerList: playerProps[];
}

export default function GamePage({
  coverPage,
  finishPage,
  playerList,
}: coverProps) {
  const [selectedPlayer, setSelectedPlayer] = useState('');

  useEffect(() => {
    if (selectedPlayer !== '') {
      gsap.to('.selectedItem', { scale: 1.08, duration: 0.5 });
      gsap.to('.unselectedItem', { scale: 1, duration: 0.5 });
      window.localStorage.setItem('voted-player', selectedPlayer);
    }
  }, [selectedPlayer]);

  const selectPlayer = (avatarSeed) => {
    setSelectedPlayer(avatarSeed);
  };

  return (
    <Background>
      <Header goBackArrow={coverPage} />
      <div className="OEscolhidoDiv">
        <p>Escolha um participante:</p>
        <div className="GamePlayerListDiv">
          {playerList.map((player) => (
            <div
              onClick={() => {
                selectPlayer(player.avatarSeed);
              }}
              className={
                player.avatarSeed === selectedPlayer
                  ? 'selectedItem GamePlayerListItem'
                  : 'unselectedItem GamePlayerListItem'
              }
              key={player.avatarSeed}>
              <p className="GamePlayerListNickname">{player.nickname}</p>
              <div
                className={
                  player.avatarSeed === selectedPlayer
                    ? 'selectedAvatar GamePlayerListAvatar'
                    : 'unselectedAvatar GamePlayerListAvatar'
                }>
                <Avatar seed={player.avatarSeed} />
              </div>
            </div>
          ))}
        </div>
        <div className="GameVoteButton">
          <Button>
            <div onClick={finishPage}>Votar</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
