import React, { useEffect, useState } from 'react';
import socketConnection from '../../lib/socket';
import Background from '../../components/Background';
import CoverPage from './Cover';
import InfoPage from './Info';
import GamePage from './Game';
import FinishPage from './Finish';
import coverImg from '../../assets/game-covers/o-escolhido.png';
import './OEscolhido.css';
import AwaitingResults from './Awaiting';

interface playerProps {
  nickname: string;
  avatarSeed: string;
}

enum Game {
  Cover,
  Info,
  Game,
  AwaitingResults,
  Finish,
}

export default function OEscolhido() {
  const title = 'O Escolhido';
  const information = (
    <>
      Neste jogo, cada participante vai jogar com o seu aparelho.
      <br />
      <br />
      Aparecerá uma lista com todos os participantes da sala e cada um votará em
      uma pessoa da lista para virar uma dose.
      <br />
      <br />
      Boa sorte!
    </>
  );

  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const [currentGameState, setCurrentGameState] = useState<Game>(Game.Cover);
  const [votedPlayer, setVotedPlayer] = useState<playerProps[]>([
    {
      nickname: 'Dom Que Shot',
      avatarSeed: 'dqxt',
    },
  ]);

  const [playerList, updatePlayerList] = useState([
    {
      avatarSeed: userData ? userData.avatarSeed : 'Dom que shot',
      nickname: userData ? userData.nickname : 'Dom quixote',
    },
    {
      avatarSeed: 'sanchopança',
      nickname: 'Sancho Pança',
    },
    {
      avatarSeed: 'dcna',
      nickname: 'Dulcineia',
    },
  ]);

  useEffect(() => {
    if (currentGameState === Game.AwaitingResults) {
      const votedPlayer = window.localStorage.getItem('voted-player');
      const random = Math.round(Math.random()); //for simulating a tie; random can be 0 or 1
      let p2 = 0;
      if (random === 1) {
        console.log('houve um empate.'); //random = 1 means a tie
        while (playerList.at(p2).avatarSeed === votedPlayer) {
          p2 = Math.floor(Math.random() * playerList.length); //selects a player which is not the one voted by the user
        }
      } else {
        console.log('não houve empate.');
      }

      playerList.forEach((player) => {
        if (player.avatarSeed === votedPlayer) {
          setVotedPlayer(random === 0 ? [player] : [player, playerList.at(p2)]);
        }
      });
    }
  }, [currentGameState]);

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = socketConnection.getInstance();

  useEffect(() => {
    //socket.connect();                                     //somente enquanto a tela estiver isolada
    //socket.joinRoom(userData);                            //somente enquanto a tela estiver isolada
    //socket.setLobbyUpdateListener(updatePlayerList);
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  switch (currentGameState) {
    case Game.Cover:
      return (
        <CoverPage
          title={title}
          coverImg={coverImg}
          infoPage={() => setCurrentGameState(Game.Info)}
          gamePage={() => setCurrentGameState(Game.Game)}
        />
      );

    case Game.Info:
      return (
        <InfoPage
          info={information}
          coverImg={coverImg}
          coverPage={() => setCurrentGameState(Game.Cover)}
          gamePage={() => setCurrentGameState(Game.Game)}
        />
      );

    case Game.Game:
      return (
        <GamePage
          playerList={playerList}
          coverPage={() => setCurrentGameState(Game.Cover)}
          finishPage={() => setCurrentGameState(Game.AwaitingResults)}
        />
      );

    case Game.AwaitingResults:
      return (
        <AwaitingResults
          votedPlayer={votedPlayer}
          gamePage={() => setCurrentGameState(Game.Game)}
          finishPage={() => setCurrentGameState(Game.Finish)}
        />
      );

    case Game.Finish:
      return (
        <FinishPage
          votedPlayer={votedPlayer}
          coverPage={() => setCurrentGameState(Game.Cover)}
        />
      );

    default:
      return (
        <Background>
          <div>Erro!</div>
        </Background>
      );
  }
}
