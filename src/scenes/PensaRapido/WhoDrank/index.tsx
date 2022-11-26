import React, { useState, useEffect } from 'react';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';
import gsap from 'gsap';
import './WhoDrank.css';

interface playerProps {
  nickname: string;
  avatarSeed: string;
  id: number;
}

interface whoDrankProps {
  coverImg: string;
  finishPage: () => void;
  playerList: playerProps[];
}

export default function WhoDrankPage({
  finishPage,
  playerList,
  coverImg,
}: whoDrankProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<playerProps>({
    avatarSeed: '',
    nickname: '',
    id: 0,
  });

  useEffect(() => {
    if (selectedPlayer) {
      gsap.to('.selectedItem', { scale: 1.08, duration: 0.5 });
      gsap.to('.unselectedItem', { scale: 1, duration: 0.5 });

      gsap.to('.WhoDrankSelectedAvatar', {rotate: 180, duration: 0.5});
      gsap.to('.WhoDrankUnselectedAvatar', {rotate: 0, duration: 0.5});
      window.localStorage.setItem(
        'voted-player',
        JSON.stringify(selectedPlayer)
      ); //guardamos temporariamente o nome e o seed do avatar no localstorage
    }
  }, [selectedPlayer]);

  const selectPlayer = (player) => {
    setSelectedPlayer(player);
  };

  return (
    <Background>
      <Header logo={coverImg}/>
      <div className="PensaRapidoDiv">
        <p className="WhoDrankTitle">E aí, quem perdeu?</p>
        <p style={{margin: 0}}>Selecione o jogador que bebeu uma dose:</p>
        <div className="WhoDrankPlayerListDiv">
          {playerList.map((player) => (
            <div
              onClick={() => {
                selectPlayer(player);
              }}
              className={
                player.avatarSeed === selectedPlayer.avatarSeed &&
                player.nickname === selectedPlayer.nickname
                  ? 'selectedItem WhoDrankPlayerListItem'
                  : 'unselectedItem WhoDrankPlayerListItem'
              }
              key={player.id}>
              <p className="WhoDrankPlayerListNickname">{player.nickname}</p>
              <div
                className={
                  player.avatarSeed === selectedPlayer.avatarSeed &&
                  player.nickname === selectedPlayer.nickname
                    ? 'WhoDrankSelectedAvatar WhoDrankPlayerListAvatar'
                    : 'WhoDrankUnselectedAvatar WhoDrankPlayerListAvatar'
                }>
                <Avatar seed={player.avatarSeed} />
              </div>
            </div>
          ))}
        </div>
        <div className="WhoDrankVoteButton">
          <Button>
            <div onClick={finishPage}>Finalizar jogo</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
