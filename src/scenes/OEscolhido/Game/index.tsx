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
  id: number;
}

interface coverProps {
  finishPage: () => void;
  msTimeLeft: number;
  playerList: playerProps[];
}

export default function GamePage({
  finishPage,
  msTimeLeft,
  playerList,
}: coverProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<playerProps>({
    nickname: '',
    avatarSeed: '',
    id: 0,
  });

  let hasSelected = false;

  useEffect(() => {
    if (selectedPlayer) {
      gsap.to('.selectedItem', { scale: 1.08, duration: 0.5 });
      gsap.to('.unselectedItem', { scale: 1, duration: 0.5 });
      window.localStorage.setItem(
        'voted-player',
        JSON.stringify(selectedPlayer)
      ); //guardamos temporariamente o nome e o seed do avatar no localstorage
    }
  }, [selectedPlayer]);

  const selectPlayer = (player) => {
    setSelectedPlayer(player);
  };

  if (selectedPlayer.nickname != '') hasSelected = true;

  return (
    <Background noImage>
      <Header timer={msTimeLeft} />
      <div className="OEscolhidoDiv">
        <p>Escolha um participante:</p>
        <div className="GamePlayerListDiv">
          {playerList.map((player) => (
            <div
              onClick={() => {
                selectPlayer(player);
              }}
              className={
                player.avatarSeed === selectedPlayer.avatarSeed &&
                player.nickname === selectedPlayer.nickname
                  ? 'selectedItem GamePlayerListItem'
                  : 'unselectedItem GamePlayerListItem'
              }
              key={player.id}>
              <p className="GamePlayerListNickname">{player.nickname}</p>
              <div
                className={
                  player.avatarSeed === selectedPlayer.avatarSeed &&
                  player.nickname === selectedPlayer.nickname
                    ? 'selectedAvatar GamePlayerListAvatar'
                    : 'unselectedAvatar GamePlayerListAvatar'
                }>
                <Avatar seed={player.avatarSeed} />
              </div>
            </div>
          ))}
        </div>
        <div className="GameVoteButton">
          <Button isDisabled={!hasSelected} onClick={finishPage}>
            Votar
          </Button>
        </div>
      </div>
    </Background>
  );
}
