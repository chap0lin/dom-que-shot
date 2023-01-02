import { useState, useEffect, useRef, useCallback } from 'react';
import { gameCards } from './GameCards';
import { ArrowRight, AlertTriangle } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import PingTracker from '../../components/Debug/PingTracker';
import GameInfo from './GameInfo';
import api from '../../services/api';
import gsap from 'gsap';
import './Home.css';

type GameInformation = {
  title: string;
  description: string | JSX.Element;
}

function Home() {
  const navigate = useNavigate();

  const [gameInfo, setGameInfo] = useState<GameInformation>({title: '', description: ''});
  const [roomCode, setRoomCode] = useState<string>('');
  const [inputErrorMsg, setInputErrorMsg] = useState({
    msg: '',
    visibility: 'hidden',
  });

  const newRoom = () => {
    api
      .put(`/createRoom`)
      .then((response) => {
        console.log(response.data);
        window.localStorage.setItem('userData', JSON.stringify({}));
        navigate('/ChooseAvatar', {
          state: { option: 'create', roomCode: response.data },
        });
      })
      .catch(() => {
        alert(`Erro ao criar a sala. Tente novamente mais tarde.`);
      });
    return;
  };

  const updateRoomCode = (e) => {
    const newRoom:string = e.target.value.trim().toUpperCase();
    if (newRoom.length !== 0) {
      setRoomCode(newRoom);
      //room = newRoom;
      setInputErrorMsg({ msg: '', visibility: 'hidden' });
      return;
    }
  };

  const verifyRoom = (code) => {
    if (code.length === 4) {
      api
        .get(`/roomCode/${code}`)
        .then((response) => {
          console.log(response.data);
          window.localStorage.setItem('userData', JSON.stringify({}));
          navigate('/ChooseAvatar', {
            state: { option: 'join', roomCode: code },
          });
        })
        .catch(() => {
          setInputErrorMsg({
            msg: 'Sala inexistente! Tente novamente',
            visibility: 'visible',
          });
        });
    } else {
      setInputErrorMsg({
        msg: 'Código inválido! Tente novamente',
        visibility: 'visible',
      });
    }
  };

  ////Listener para remover foco do <input> quando o usuário aperta Enter/////////////////////////

  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown);
    return () => {
      document.removeEventListener('keydown', detectKeyDown);
    };
  }, [roomCode]);

  const detectKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log(roomCode);
      verifyRoom(roomCode);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

  const toggleGameInfo = (show) => {
    if (show === true) {
      return gsap.to('.GameInfoPopup', { scale: 1, yPercent: -105, duration: 0.6, ease: 'power2'});
    }
    return gsap.to('.GameInfoPopup', { scale: 0, yPercent: 0, duration: 0.6, ease: 'power2'});
  };

  return (
    <Background>
      <Header title="Vamos começar?" logo />

      <div className="JoinRoomDiv">
        <p className="HelpInfo">Já possui uma sala?</p>
        <div className="JoinRoomInputAndButton">
          <input
            ref={ref}
            onChange={updateRoomCode}
            className="JoinRoomEnterCode"
            placeholder="Digite o código da sala"
          />
          <button className="JoinRoomButton">
            <ArrowRight
              width="30px"
              height="30px"
              onClick={() => verifyRoom(roomCode)}
            />
          </button>
        </div>

        <div
          className="JoinRoomWarningSpace"
          style={{
            visibility:
              inputErrorMsg.visibility === 'visible' ? 'visible' : 'hidden',
          }}>
          <AlertTriangle width="20px" height="20px" color="red" />
          <p className="JoinRoomWarning">{inputErrorMsg.msg}</p>
        </div>
      </div>

      <div className="CreateRoomDiv">
        <p className="HelpInfo">Se ainda não possui:</p>
        <Button width="100%" onClick={newRoom}>
          Criar Sala
        </Button>
      </div>

      <div className="ChooseGameDiv">
        <p>Já conhece nossos jogos?</p>
        <ImageSlider
          content={gameCards}
          show={() => toggleGameInfo(true)}
          setGameInfo={setGameInfo}
        />
      </div>

      <div className="GameInfoPopup">
        <GameInfo
          title={gameInfo.title}
          description={gameInfo.description}
          exit={() => toggleGameInfo(false)}
        />
      </div>
      <PingTracker />
    </Background>
  );
}

export default Home;