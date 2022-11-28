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
  const [playerList, updatePlayerList] = useState<playerProps[]>([
    {
      nickname: 'Alex',
      avatarSeed: 'alex',
      id: 0,
    },
    {
      nickname: 'Carlos',
      avatarSeed: 'carlos',
      id: 1,
    },
  ]);

  const [selectedPlayers, setSelectedPlayers] = useState<playerProps[]>([]);  //por algum motivo estranho esse useState não dispara o useEffect da linha 65 quando é vetor player[] ao invés de só player
  const [dummyNumber, setDummyNumber] = useState<number>(0);                  //aí para conseguir que ele funcione eu precisei setar esse useState auxiliar, que muda toda vez que selectedPlayers mudar
  const [buttonText, setButtonText] = useState('Ninguém bebeu');

  //SOCKET////////////////////////////////////////////////////////////////////////////////////////////

  const socket = socketConnection.getInstance();

  useEffect(() => {
    socket.connect();
    //socket.setLobbyUpdateListener(updatePlayerList);
    socket.addEventListener('lobby-update', (players) => {
      console.log("atuaizando os jogadores da sala fodasss");
      updatePlayerList(players);
    })
    socket.push('who-drank-dummy-players', 'please');   //apagar esta linha e descomentar a de baixo quando for integrar ao resto do jogo
    //socket.push('lobby-update', userData.roomCode);

    socket.addEventListener('room-is-moving-to', (destination) => {
      navigate(destination);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (selectedPlayers) {
      gsap.to('.WhoDrankSelectedItem', { scale: 1.08, duration: 0.5 });
      gsap.to('.WhoDrankUnselectedItem', { scale: 1, duration: 0.5 });

      gsap.to('.WhoDrankSelectedAvatar', { rotate: 180, duration: 0.5 });
      gsap.to('.WhoDrankUnselectedAvatar', { rotate: 0, duration: 0.5 }); 
    }
  }, [dummyNumber]);

  const selectPlayer = (player:playerProps) => {
    console.log('jogadores selecionados:');
    console.log(selectedPlayers);
    let selectedOnes = selectedPlayers;
    let index = selectedPlayers.findIndex(p => p.nickname === player.nickname);
    if(index !== -1){
      selectedOnes.splice(index, 1);
      if(selectedOnes.length === 0){
        setButtonText('Ninguém bebeu');
      }
    } else {
      selectedOnes.push(player);
      setButtonText('Salvar e continuar');
    }
    setSelectedPlayers(selectedOnes);
    setDummyNumber(Math.random())
  };

  const backToRoulette = () => {
    socket.push('players-who-drank-are', {
      //roomCode: userData.roomCode,        //descomentar esta linha e remover a de baixo quando integrar ao resto do código
      roomCode: '',
      players: JSON.stringify(selectedPlayers)
    }); 
    // socket.push('move-room-to', {      //descomentar estas também
    //   roomCode: userData.roomCode,
    //   destination: '/SelectNextGame',

    // });
  };

  return (
    <Background>
      <Header logo={coverImg} />
      <div className="WhoDrankDiv">
        <p className="WhoDrankTitle">E aí, quem perdeu?</p>
        <p style={{ margin: 0 }}>Selecione quem bebeu uma dose:</p>
        <div className="WhoDrankPlayerListDiv">
          {playerList.map((player) => (
            <div
              onClick={() => {
                console.log('aaah');
                selectPlayer(player);
              }}
              className={
                selectedPlayers.find(p => p.nickname === player.nickname)
                  ? 'WhoDrankSelectedItem WhoDrankPlayerListItem'
                  : 'WhoDrankUnselectedItem WhoDrankPlayerListItem'
              }
              key={player.id}>
              <p className="WhoDrankPlayerListNickname">{player.nickname}</p>
              <div
                className={
                  selectedPlayers.find(p => p.nickname === player.nickname)
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
            <div onClick={backToRoulette}>{buttonText}</div>
          </Button>
        </div>
      </div>
    </Background>
  );
}
