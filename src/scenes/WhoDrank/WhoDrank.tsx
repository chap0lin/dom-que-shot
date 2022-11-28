import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import socketConnection from '../../lib/socket';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import gsap from 'gsap';
import './WhoDrank.css';

interface playerProps {
  nickname: string;
  avatarSeed: string;
  id: number;
}

export default function WhoDrankPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const coverImg = location.state.coverImg;

  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [playerList, updatePlayerList] = useState<playerProps[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<playerProps>({
    avatarSeed: '',
    nickname: '',
    id: 0,
  });

  //SOCKET////////////////////////////////////////////////////////////////////////////////////////////

  const socket = socketConnection.getInstance();

  useEffect(() => {
    socket.connect();
    socket.setLobbyUpdateListener(updatePlayerList);
    //socket.send('lobby-update', userData.roomCode);

    socket.addEventListener('room-is-moving-to', (destination) => {
      navigate(destination);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (selectedPlayer) {
      gsap.to('.WhoDrankSelectedItem', { scale: 1.08, duration: 0.5 });
      gsap.to('.WhoDrankUnselectedItem', { scale: 1, duration: 0.5 });

      gsap.to('.WhoDrankSelectedAvatar', { rotate: 180, duration: 0.5 });
      gsap.to('.WhoDrankUnselectedAvatar', { rotate: 0, duration: 0.5 });
      window.localStorage.setItem(
        'voted-player',
        JSON.stringify(selectedPlayer)
      ); //guardamos temporariamente o nome e o seed do avatar no localstorage
    }
  }, [selectedPlayer]);

  const selectPlayer = (player) => {
    setSelectedPlayer(player);
  };

  const backToRoulette = () => {
    socket.push('player-who-drank-is', {
      roomCode: userData.roomCode,
      player: JSON.stringify(selectedPlayer),
    });
    socket.push('move-room-to', {
      roomCode: userData.roomCode,
      destination: '/SelectNextGame',
    });
  };

  return (
    <Background>
      <Header logo={coverImg} />
      <div className="WhoDrankDiv">
        <p className="WhoDrankTitle">E aí, quem perdeu?</p>
        <p style={{ margin: 0 }}>Selecione o jogador que bebeu uma dose:</p>
        <div className="WhoDrankPlayerListDiv">
          {playerList.map((player) => (
            <div
              onClick={() => {
                selectPlayer(player);
              }}
              className={
                player.avatarSeed === selectedPlayer.avatarSeed &&
                player.nickname === selectedPlayer.nickname
                  ? 'WhoDrankSelectedItem WhoDrankPlayerListItem'
                  : 'WhoDrankUnselectedItem WhoDrankPlayerListItem'
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
            <div onClick={backToRoulette}>Finalizar jogo</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
