import { useEffect, useRef } from 'react';
import { gameCards } from './GameCards';
import { ArrowRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  ////Listener para remover foco do <input> quando o usuário aperta Enter/////////////////////////

  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown, true);
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
        <input
          ref={ref}
          className="JoinRoomEnterCode"
          placeholder="Digite o código da sala"
        />
        <button className="JoinRoomButton">
          <ArrowRight
            width="30px"
            height="30px"
            onClick={() =>
              navigate('/ChooseAvatar', { state: { option: 'join' } })
            }
          />
        </button>
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
