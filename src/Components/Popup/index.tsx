import { X } from 'react-feather';
import gsap from 'gsap';
import './Popup.css';

interface InfoProps {
  height?: number;
  title: string;
  description: JSX.Element | string;
  show: boolean;
  comesFromTop?: boolean;
  exit: () => void;
}

export default function Popup({
  height,
  title,
  description,
  show,
  comesFromTop,
  exit,
}: InfoProps) {
  const releaseProps = comesFromTop
    ? {
        scale: 1,
        top: 75,
        duration: 0.6,
        ease: 'power2',
      }
    : {
        scale: 1,
        bottom: 20,
        duration: 0.6,
        ease: 'power2',
      };

  const hideProps = comesFromTop
    ? {
        scale: 0,
        top: -280,
        duration: 0.6,
        ease: 'power2',
      }
    : {
        scale: 0,
        bottom: -280,
        duration: 0.6,
        ease: 'power2',
      };

  const releasePopup = () => {
    gsap.to('.PopupContainer', releaseProps);
  };

  const hidePopup = () => {
    gsap.to('.PopupContainer', hideProps);
  };

  if (show === true) {
    releasePopup();
  } else {
    hidePopup();
  }

  return (
    <div className={`PopupContainer ${comesFromTop ? 'Top' : 'Bottom'}`}>
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

//   const releasePopup = () => {
//   if(comesFromTop){
//     return gsap.to('.PopupContainer', {
//       scale: 1,
//       yPercent: value,
//       duration: 0.6,
//       ease: 'power2',
//     });
//   }
//   gsap.to('.PopupContainer', {
//     scale: 1,
//     yPercent: value,
//     duration: 0.6,
//     ease: 'power2',
//   });
// }

// if (show === true) {
//   if(comesFromTop){
//     gsap.timeline()
//     .to('.PopupContainer', {
//       yPercent: -100,
//       duration: 0,
//     }).call(releasePopup)
//   } else {
//     releasePopup();
//   }
// } else {
//   if(comesFromTop){
//     gsap.timeline()
//     .to('.PopupContainer', {
//       scale: 0,
//       yPercent: -100,
//       duration: 1,
//       ease: 'power2',
//     });
//   } else {
//     gsap.to('.PopupContainer', {
//       scale: 0,
//       yPercent: 0,
//       duration: 0.6,
//       ease: 'power2',
//     });
//   }
// }
