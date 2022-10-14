import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { RotateCcw } from 'react-feather';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/adventurer';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header';
import './ChooseAvatar.css';

function ChooseAvatar() {
  let avatarSeed = 'dqxt';
  const buttonText =
    useLocation().state.option === 'join' ? 'Entrar' : 'Criar sala';
  const [source, changeSource] = useState(
    `data:image/svg+xml;utf8,${encodeURIComponent(
      createAvatar(style, { seed: avatarSeed })
    )}`
  );

  function changeIcon() {
    avatarSeed = Math.random().toString(36).substring(2, 6);
    console.log('seed gerada: ' + avatarSeed);
    const src = `data:image/svg+xml;utf8,${encodeURIComponent(
      createAvatar(style, { seed: avatarSeed })
    )}`;
    changeSource(src);
  }

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
      <div className="WholeScreen">
        <Header goBackArrow />

        <div className="ChooseAvatarSection">
          <div className="NicknameDiv">
            <p className="NicknameTitle">Apelido:</p>

            <input
              ref={ref}
              id="nickname"
              className="NicknameInput"
              placeholder="Digite seu apelido"
            />
          </div>

          <div className="AvatarDiv">
            <p className="AvatarTitle">Escolha o seu Avatar:</p>

            <div className="AvatarIconSection">
              <div className="SideIconSpace" />

              <div className="AvatarIcon">
                <img src={source} alt="" />
              </div>

              <div className="SideIconSpace">
                <RotateCcw onClick={changeIcon} width="100%" height="100%" />
              </div>
            </div>
          </div>

          <div className="ButtonDiv">
            <Button>{buttonText}</Button>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default ChooseAvatar;
