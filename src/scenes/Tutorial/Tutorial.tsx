import { Link } from 'react-router-dom';
import Background from '../../components/Background';
import Header from '../../components/Header';
import './Tutorial.css';

function Tutorial() {
  return (
    <Background>
      <Header/>

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
