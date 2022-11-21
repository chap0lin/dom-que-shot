import { useState, useEffect, useRef } from 'react';
import { gameCards } from './GameCards';
import { ArrowRight, AlertTriangle } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import api from '../../services/api';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = useState('');
  const [inputErrorMsg, setInputErrorMsg] = useState({
    msg: '',
    visibility: 'hidden',
  });

  const updateRoomCode = (e) => {
    const newRoom = e.target.value.trim();
    if (newRoom.length !== 0) {
      setRoomCode(newRoom);
      setInputErrorMsg({ msg: '', visibility: 'hidden' });
      return;
    }
  };

  const verifyRoom = () => {
    navigate('/ChooseAvatar', {
      state: { option: 'join', roomCode: roomCode },
    });

    if (roomCode.length == 6) {
      api
        .get(`/roomCode/${roomCode}`)
        .then((response) => {
          console.log(response.data);
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

  return (
    <Background>
      <Header title="Vamos começar?" logo />

      <div className="JoinRoomDiv">
        <div
          className="JoinRoomWarningSpace"
          style={{
            visibility:
              inputErrorMsg.visibility === 'visible' ? 'visible' : 'hidden',
          }}>
          <AlertTriangle width="20px" height="20px" color="red" />
          <p className="JoinRoomWarning">{inputErrorMsg.msg}</p>
        </div>
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
      </div>

      <div className="CreateRoomDiv">
        <Button width="100%">
          <div
            onClick={() =>
              navigate('/ChooseAvatar', { state: { option: 'create' } })
            }>
            Criar Sala
          </div>
        </Button>
      </div>

      <div className="ChooseGameDiv">
        <p>Já sabe o que quer?</p>
        <ImageSlider content={gameCards} />
      </div>
    </Background>
  );
}

export default Home;
