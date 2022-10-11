import { Link } from 'react-router-dom';
import Background from '../../components/Background';
import './Tutorial.css';

function Tutorial() {
  return (
    <Background>
      <div className="TutorialHeaderDiv">
        <div className="TutorialHeaderLogoSpace">
          <Link to="/">
            <div className="TutorialHeaderLogo" />
          </Link>
        </div>
      </div>

      <div className="TutorialSection">
        <p>
          Seja muito bem vindo(a) ao Dom Que Shot, o drinking game mais épico
          que você já viu.
          <br />
          <br />
          É novo(a) por aqui? Se sim, temos um tutorial para te ajudar a
          entender como tudo funciona.
          <br />
          <br />
          Bora lá?
        </p>
        <div className="TutorialButtons">
          <button className="TutorialButton">Sim, bora lá!</button>
          <Link to="/Home">
            <button className="TutorialButton">Não, Pular Tutorial</button>
            {/* pelo fluxograma na verdade este botão tem de levar a /Login.
            deixei assim por ora para que seja possível ver as telas já criadas
            todas interagindo entre elas, em sequência.*/}
          </Link>
        </div>
      </div>
    </Background>
  );
}

export default Tutorial;
