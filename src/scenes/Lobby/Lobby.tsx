import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SocketConnection from '../../lib/socket';
import games from '../../contexts/games';
import gsap from 'gsap';
import './Lobby.css';

import MainPage from './Main';
import SettingsPage from './Settings';

enum Visibility {
  Invisible,
  Visible,
}

enum LobbyStates {
  Main,
  Settings,
}

type Game = {
  id: number;
  text: string;
  src: string;
  backgroundColor: string;
};

type Player = {
  avatarSeed: string;
  nickname: string;
  beers: number;
  playerID: number;
};

export default function Lobby() {
  const navigate = useNavigate();
  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const [ownerVisibility, setOwnerVisibility] = useState<Visibility>(
    Visibility.Invisible
  );

  const [currentLobbyState, setCurrentLobbyState] = useState<LobbyStates>(
    LobbyStates.Main
  );

  const [gameList, updateGameList] = useState<Game[]>(games);
  const [playerList, updatePlayerList] = useState<Player[]>([
    {
      avatarSeed: userData.avatarSeed,
      nickname: userData.nickname,
      beers: 0,
      playerID: 5,
    },
  ]);

  //SOCKET///////////////////////////////////////////////////////////////////////////////////////

  const socket = SocketConnection.getInstance();

  useEffect(() => {
    socket.connect();
    socket.joinRoom(userData, () => navigate('/Home'));
    socket.setLobbyUpdateListener(updatePlayerList);

    socket.addEventListener('games-update', (newGames: string[]) => {
      const updatedGames = gameList.map((game) =>
        newGames.find((gameName) => gameName === game.text)
          ? game.id >= 1000
            ? { ...game, id: game.id - 1000 }
            : { ...game }
          : game.id < 1000
          ? { ...game, id: game.id + 1000 }
          : { ...game }
      );

      console.log('A lista de jogos foi atualizada.');
      console.log(newGames);
      updateGameList(updatedGames);
    });

    socket.addEventListener('room-owner-is', (ownerID) => {
      if (ownerID === socket.socket.id) {
        setOwnerVisibility(Visibility.Visible);
        socket.push('games-update', userData.roomCode);
        return;
      }
    });

    socket.addEventListener('room-is-moving-to', (destination) => {
      console.log(`Movendo a sala para ${destination}.`);
      navigate(destination);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////

  const popWarning = (warning) => {
    gsap.to(warning, { opacity: 1, duration: 0 });
    setTimeout(() => {
      gsap.to(warning, { opacity: 0, duration: 1 });
    }, 2000);
  };

  const finishSettings = () => {
    const selectedGames = gameList.filter((game) => game.id < 1000);
    if (selectedGames.length >= 3) {
      const selection = selectedGames.map((game) => game.text);
      socket.push('selected-games-are', {
        roomCode: userData.roomCode,
        selectedGames: JSON.stringify(selection),
      });
      return setCurrentLobbyState(LobbyStates.Main);
    }
    popWarning('.LobbySettingsWarning');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userData.roomCode);
    console.log('código da sala copiado para a área de transferência');
    popWarning('.CopyWarning');
  };

  const beginMatch = () => {
    if (playerList.length >= 2) {
      console.log('Iniciando a partida.');
      socket.push('set-turn', userData.roomCode);
      socket.push('move-room-to', {
        roomCode: userData.roomCode,
        destination: '/SelectNextGame',
      });
      return;
    }
    popWarning('.LobbyWarning');
  };

  switch (currentLobbyState) {
    case LobbyStates.Main:
      return (
        <MainPage
          ownerVisibility={ownerVisibility}
          roomCode={userData.roomCode}
          copyToClipboard={copyToClipboard}
          beginMatch={beginMatch}
          settingsPage={() => setCurrentLobbyState(LobbyStates.Settings)}
          playerList={playerList}
        />
      );

    case LobbyStates.Settings:
      return (
        <SettingsPage
          mainPage={finishSettings}
          gameList={gameList}
          updateGameList={updateGameList}
        />
      );
  }
}
