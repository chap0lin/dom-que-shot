import { ArrowLeft, Info, Settings } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import DomQueShotLogo from '../../assets/logo-darker.png';
import './Header.css';

interface HeaderProps {
  logo?: boolean | string;
  title?: string;
  goBackArrow?: boolean | any;
  timer?: number;
  settingsPage?: string | any;
  infoPage?: string | (() => void);
}

export default function Header({
  logo,
  title,
  goBackArrow,
  timer,
  settingsPage,
  infoPage,
}: HeaderProps) {
  const navigateTo = useNavigate();

  const seconds = timer / 1000;
  const timerColor = seconds < 3 ? 'red' : 'white';
  const formattedTimer = `${seconds.toFixed(1)}s`;

  const goToPreviousPage = () => {
    if (goBackArrow === true) {
      //goBackArrow pode ser boolean true OU pode ser uma arrow function
      navigateTo(-1);
      return;
    }
    goBackArrow();
  };

  const goToInfoPage = () => {
    if (typeof infoPage === 'string') {
      //infoPage pode ser string com o endereço da página OU pode ser uma arrow function
      navigateTo(infoPage);
      return;
    }
    infoPage();
  };

  const goToSettingPage = () => {
    if (typeof settingsPage === 'string') {
      //settingsPage pode ser string com o endereço da página OU pode ser uma arrow function
      navigateTo(settingsPage);
    }
    settingsPage();
  };

  return (
    <div className="HeaderDiv">
      <div className="HeaderArrowAndTitle">
        <div
          className="HeaderGoBackArrow"
          style={goBackArrow ? {} : { display: 'none' }}>
          <ArrowLeft width="30px" height="30px" onClick={goToPreviousPage} />
        </div>

        <div className="HeaderTitle" style={title ? {} : { display: 'none' }}>
          <p>{title}</p>
        </div>
      </div>

      <div
        className="HeaderTimer"
        style={timer ? { color: timerColor } : { display: 'none' }}>
        <p style={{ margin: '0' }}>{formattedTimer}</p>
      </div>

      <div className="HeaderInfoSettingsAndLogo">
        <div className="HeaderInfo" style={infoPage ? {} : { display: 'none' }}>
          <Info
            color="#FBBC05"
            width="22px"
            height="22px"
            onClick={goToInfoPage}
          />
        </div>
        <div
          className="HeaderSettings"
          style={settingsPage ? {} : { display: 'none' }}>
          <Settings width="22px" height="22px" onClick={goToSettingPage} />
        </div>
        <div
          className="HeaderLogoSpace"
          style={logo ? {} : { display: 'none' }}>
          <div className="HeaderLogo">
            <img
              className="HeaderLogoImage"
              src={typeof logo === 'string' ? logo : DomQueShotLogo}></img>
          </div>
        </div>
      </div>
    </div>
  );
}
