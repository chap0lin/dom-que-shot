import { X } from 'react-feather';
import gsap from 'gsap';
import './Popup.css';

interface InfoProps {
  height?: number;
  title: string;
  description: JSX.Element | string;
  show: boolean;
  exit: () => void;
}

export default function Popup({
  height,
  title,
  description,
  show,
  exit,
}: InfoProps) {
  const percent = -30000 / height;

  if (show === true) {
    gsap.to('.PopupContainer', {
      scale: 1,
      yPercent: percent,
      duration: 0.6,
      ease: 'power2',
    });
  } else {
    gsap.to('.PopupContainer', {
      scale: 0,
      yPercent: 0,
      duration: 0.6,
      ease: 'power2',
    });
  }

  return (
    <div className="PopupContainer">
      <div className="PopupDiv" style={height ? { height: `${height}px` } : {}}>
        <div className="PopupHeader">
          <p className="PopupTitle">{title}</p>
          <X color="#170C32" width="24px" strokeWidth="5px" onClick={exit} />
        </div>
        <p className="PopupDescription">{description}</p>
      </div>
    </div>
  );
}
