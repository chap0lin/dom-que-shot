import { X } from 'react-feather';
import './GameInfo.css';

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
        <X color='#170C32' width='24px' strokeWidth='5px' onClick={exit}/>
      </div>
      <p className="GameInfoDescription">{description}</p>
    </div>
  );
}
