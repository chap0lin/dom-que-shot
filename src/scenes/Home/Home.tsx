import { useState, useEffect, useRef } from 'react';
import { gameCards } from './GameCards';
import { ArrowRight, AlertTriangle } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import GameInfo from './GameInfo';
import api from '../../services/api';
import gsap from 'gsap';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const [gameTitle, setGameTitle] = useState('');
  const [gameDescription, setGameDescription] = useState('');

  const [roomCode, setRoomCode] = useState('');
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
      .catch((e) => {
        alert(`Erro ao criar a sala: ${e}`);
      });
    return;
  };

  const updateRoomCode = (e) => {
    const newRoom = e.target.value.trim();
    if (newRoom.length !== 0) {
      setRoomCode(newRoom);
      setInputErrorMsg({ msg: '', visibility: 'hidden' });
      return;
    }
  };

  const verifyRoom = () => {
    if (roomCode.length == 6) {
      api
        .get(`/roomCode/${roomCode}`)
        .then((response) => {
          console.log(response.data);
          window.localStorage.setItem('userData', JSON.stringify({}));
          navigate('/ChooseAvatar', {
            state: { option: 'join', roomCode: roomCode },
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
  }, []);

  const detectKeyDown = (e) => {
    if (e.key === 'Enter') {
      ref.current.blur();
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

  const toggleGameInfo = (show) => {
    if (show === true) {
      return gsap.to('.GameInfoPopup', { yPercent: -105, duration: 0.5, ease: 'power2'});
    }
    return gsap.to('.GameInfoPopup', { yPercent: 0, duration: 0.5, ease: 'power2'});
  };

  return (
    <div className="ScreenDiv">
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
              <ArrowRight width="30px" height="30px" onClick={verifyRoom} />
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
          <Button onClick={newRoom} width="100%">
            Criar Sala
          </Button>
        </div>

        <div className="ChooseGameDiv">
          <p>Já conhece nossos jogos?</p>
          <ImageSlider
            content={gameCards}
            show={() => toggleGameInfo(true)}
            setGameTitle={setGameTitle}
            setGameDescription={setGameDescription}
          />
        </div>
      </Background>

      <div className="GameInfoPopup">
        <GameInfo
          title={gameTitle}
          description={gameDescription}
          exit={() => toggleGameInfo(false)}
        />
      </div>
    </div>
  );
}

export default Home;