import React, { useState, useEffect, useRef } from 'react';
import { gameCards } from './GameCards';
import { ArrowRight, AlertTriangle } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
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
    console.log(roomCode);
    if (newRoom.length !== 0) {
      setRoomCode(newRoom);
      setInputErrorMsg({ msg: '', visibility: 'hidden' });
      return;
    }
  };

  const verifyRoom = () => {
    if (roomCode.length > 3) {
      console.log('Sala inserida: ' + roomCode);
      navigate('/ChooseAvatar', { state: { option: 'join' } });
      return;
    }
    if (roomCode.length > 0) {
      setInputErrorMsg({
        msg: 'Código inválido! Tente novamente!',
        visibility: 'visible',
      });
      return;
    }
    setInputErrorMsg({ msg: 'Nenhum código inserido.', visibility: 'visible' });
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
      <Header title="Vamos começar?" />

      <div className="JoinRoomDiv">
        <div className="JoinRoomWarningSpace" style={{visibility: (inputErrorMsg.visibility==='visible')? 'visible' : 'hidden'}}>
          <AlertTriangle
            width="20px"
            height="20px"
            color="red"
          />
          <p
            className="JoinRoomWarning">
            {inputErrorMsg.msg}
          </p>
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
