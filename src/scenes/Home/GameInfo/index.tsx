import './GameInfo.css';
import close from '../../../assets/wrong.png';

interface InfoProps {
  title: string;
  description: JSX.Element | string;
  exit: () => void;
}

export default function GameInfo({ title, description, exit }: InfoProps) {
  return (
    <div className="GameInfoDiv">
      <div className="GameInfoHeader">
        <p className="GameInfoTitle">{title}</p>
        <img src={close} className="GameInfoCloseIcon" onClick={exit} />
      </div>
      <p className="GameInfoDescription">{description}</p>
    </div>
  );
}
