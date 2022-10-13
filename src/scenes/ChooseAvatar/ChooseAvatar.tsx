import { useState } from 'react';
import { RotateCcw } from 'react-feather';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/adventurer';
import Background from '../../components/Background';
import Button from '../../components/Button';
import Header from '../../components/Header';
import './ChooseAvatar.css';

function ChooseAvatar() {
  const [source, changeSource] = useState(
    `data:image/svg+xml;utf8,${encodeURIComponent(createAvatar(style))}`
  );

  function changeIcon() {
    const randomString = Math.random().toString(36).substring(2, 6);
    console.log('seed geradas: ' + randomString);
    const src = `data:image/svg+xml;utf8,${encodeURIComponent(
      createAvatar(style, { seed: randomString })
    )}`;
    changeSource(src);
  }

  return (
    <Background>
      <div className="WholeScreen">
        <Header goBackArrow />

        <div className="ChooseAvatarSection">
          <div className="NicknameDiv">
            <p className="NicknameTitle">Apelido:</p>

            <input
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
            <Button>Entrar</Button>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default ChooseAvatar;
